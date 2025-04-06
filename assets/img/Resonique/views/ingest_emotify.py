import streamlit as st
import pandas as pd
import json
import os
import time
from supabase import Client
from utils.connect import get_supabase_audio_url

st.title(":material/storage: Emotify Data Management")

required_components = {
    "pinecone_index": "Pinecone index",
    "embedding_model": "Embedding model",
    "supabase_client": "Supabase client"
}

missing_components = [
    name for key, name in required_components.items()
    if key not in st.session_state
]

if missing_components:
    st.error(f"Missing required components: {', '.join(missing_components)}")
    st.stop()

DATA_CSV_PATH = os.path.join(".", "data", "Emotify_Dataset", "data.csv")
TEXT_EMBEDDINGS_PATH = os.path.join(".", "data", "Audio_and_Text_Embeddings", "track_text_embeddings.json")
PINECONE_BATCH_SIZE = 100
EMOTION_COLS = [
    'amazement', 'solemnity', 'tenderness', 'nostalgia',
    'calmness', 'power', 'joyful_activation', 'tension', 'sadness'
]

def create_emotion_text(profile, top_n=3):
    """Creates a text description using only the names of the top N emotions."""
    valid_profile = {emo: float(score) for emo, score in profile.items() if pd.notna(score)}
    if not valid_profile: return "Neutral or sparsely annotated"
    sorted_emotions = sorted(valid_profile.items(), key=lambda item: item[1], reverse=True)
    top_emotions = [emo for emo, score in sorted_emotions[:top_n] if score > 0.05]
    if not top_emotions:
        if sorted_emotions and sorted_emotions[0][1] > 0: top_emotions = [sorted_emotions[0][0]]
        else: return "Neutral or sparsely annotated"
    return ", ".join(em.replace('_', ' ').capitalize() for em in top_emotions)

def step1_load_aggregate():
    st.session_state.step1_status = "🔄 Running..."
    st.session_state.ingestion_error = None
    try:
        status_placeholder.info(f"💾 Loading data from '{DATA_CSV_PATH}'...")
        if not os.path.exists(DATA_CSV_PATH):
            raise FileNotFoundError(f"Data CSV file not found at '{DATA_CSV_PATH}'")

        emotion_data = pd.read_csv(DATA_CSV_PATH)
        emotion_data.columns = emotion_data.columns.str.strip()

        agg_df = emotion_data.groupby('track id')[EMOTION_COLS].mean().reset_index()
        genre_map = emotion_data.groupby('track id')['genre'].first()
        agg_df = agg_df.merge(genre_map, on='track id')

        st.session_state.aggregated_df = agg_df
        st.session_state.step_completed = 1
        st.session_state.step1_status = f"✅ Success! Aggregated data for {len(agg_df)} tracks."
        status_placeholder.success(st.session_state.step1_status)

    except Exception as e:
        st.session_state.ingestion_error = f"Step 1 Error: {e}"
        st.session_state.step1_status = f"❌ Error: {e}"
        status_placeholder.error(st.session_state.step1_status)

def step2_load_embeddings():
    st.session_state.step2_status = "🔄 Running..."
    st.session_state.ingestion_error = None
    try:
        status_placeholder.info(f"💾 Loading text embeddings from '{TEXT_EMBEDDINGS_PATH}'...")
        if not os.path.exists(TEXT_EMBEDDINGS_PATH):
            raise FileNotFoundError(f"Embeddings JSON file not found at '{TEXT_EMBEDDINGS_PATH}'")

        with open(TEXT_EMBEDDINGS_PATH, 'r') as f:
            embeddings_dict = json.load(f)
        embeddings_dict = {int(k): v for k, v in embeddings_dict.items()}

        st.session_state.track_embeddings_dict = embeddings_dict
        st.session_state.step_completed = 2
        st.session_state.step2_status = f"✅ Success! Loaded embeddings for {len(embeddings_dict)} tracks."
        status_placeholder.success(st.session_state.step2_status)

    except Exception as e:
        st.session_state.ingestion_error = f"Step 2 Error: {e}"
        st.session_state.step2_status = f"❌ Error: {e}"
        status_placeholder.error(st.session_state.step2_status)

def step3_prepare_vectors():
    st.session_state.step3_status = "🔄 Running..."
    st.session_state.ingestion_error = None
    progress_text = "Starting vector preparation..."
    progress_bar = progress_placeholder.progress(0, text=progress_text)
    prepared_vectors = []
    skipped_embed = 0
    skipped_url = 0

    try:
        status_placeholder.info(f"⚙️ Preparing vectors for Pinecone...")

        if 'aggregated_df' not in st.session_state or st.session_state.aggregated_df is None:
            raise ValueError("Aggregated data not loaded (Complete Step 1).")
        if 'track_embeddings_dict' not in st.session_state or st.session_state.track_embeddings_dict is None:
            raise ValueError("Embeddings not loaded (Complete Step 2).")
        if 'supabase_client' not in st.session_state or st.session_state.supabase_client is None:
             print("!!! ERROR: supabase_client MISSING or None at start of Step 3 try block.") # Log error specifically
             raise ValueError("Supabase client not found in session state. Initialization may have failed or state was lost.")


        agg_df = st.session_state.aggregated_df
        embeddings_dict = st.session_state.track_embeddings_dict
        supabase_client: Client = st.session_state.supabase_client 
        total_tracks = len(agg_df)

        for i, (_, row) in enumerate(agg_df.iterrows()):
            track_id = int(row['track id'])
            progress = (i + 1) / total_tracks
            progress_text = f"Processing track {track_id} ({i+1}/{total_tracks})"
            progress_bar.progress(progress, text=progress_text)

            if track_id not in embeddings_dict:
                skipped_embed += 1; continue

            embedding = embeddings_dict[track_id]
            if not isinstance(embedding, list) or not all(isinstance(x, (float, int)) for x in embedding):
                skipped_embed += 1; continue
            embedding = [float(x) for x in embedding]

            genre = row['genre']
            profile = row[EMOTION_COLS].to_dict()
            emotion_text = create_emotion_text(profile)
            audio_url = get_supabase_audio_url(track_id, genre) # Use function from connect
            if audio_url is None: skipped_url += 1; audio_url = ""

            vector_id = f"emotify-track-{track_id}"
            metadata = {
                "track_id": track_id, "genre": genre, "emotion_text": emotion_text, "audio_url": audio_url,
                **{f"emotion_{emo}": float(score) for emo, score in profile.items() if pd.notna(score)}
            }
            prepared_vectors.append({"id": vector_id, "values": embedding, "metadata": metadata})

        st.session_state.vectors_to_upsert = prepared_vectors
        st.session_state.step_completed = 3
        st.session_state.step3_status = f"✅ Success! Prepared {len(prepared_vectors)} vectors. Skipped: {skipped_embed} (embedding), Warned: {skipped_url} (URL)."
        status_placeholder.success(st.session_state.step3_status)
        progress_placeholder.empty() 

    except Exception as e:
        st.session_state.ingestion_error = f"Step 3 Error: {e}"
        st.session_state.step3_status = f"❌ Error: {e}"
        status_placeholder.error(st.session_state.step3_status)
        progress_placeholder.empty()
        print(f"!!! Exception during step3_prepare_vectors: {e}") 

def step4_upsert_pinecone():
    st.session_state.step4_status = "🔄 Running..."
    st.session_state.ingestion_error = None
    upserted_count = 0

    try:
        status_placeholder.info(f"☁️ Upserting vectors to Pinecone...")
        if 'vectors_to_upsert' not in st.session_state or not st.session_state.vectors_to_upsert:
            raise ValueError("No vectors prepared for upsert (Complete Step 3).")
        if 'pinecone_index' not in st.session_state:
            raise ValueError("Pinecone index not initialized.")

        vectors = st.session_state.vectors_to_upsert
        pinecone_index = st.session_state.pinecone_index
        namespace = st.secrets["PINECONE_AUDIO_NAMESPACE"]
        total_vectors = len(vectors)
        num_batches = (total_vectors + PINECONE_BATCH_SIZE - 1) // PINECONE_BATCH_SIZE

        with st.spinner(f"Upserting {total_vectors} vectors in {num_batches} batches..."):
            for i in range(0, total_vectors, PINECONE_BATCH_SIZE):
                batch = vectors[i : i + PINECONE_BATCH_SIZE]
                status_placeholder.info(f"Upserting batch {i//PINECONE_BATCH_SIZE + 1}/{num_batches} ({len(batch)} vectors) to namespace '{namespace}'...")
                try:
                    pinecone_index.upsert(vectors=batch, namespace=namespace)
                    upserted_count += len(batch)
                    time.sleep(0.2)
                except Exception as batch_e:
                    raise Exception(f"Error upserting batch {i//PINECONE_BATCH_SIZE + 1}: {batch_e}")

        st.session_state.step_completed = 4
        st.session_state.step4_status = f"✅ Success! Upserted {upserted_count} vectors to namespace '{namespace}'."
        status_placeholder.success(st.session_state.step4_status)

        try:
            stats = pinecone_index.describe_index_stats()
            st.session_state.index_stats = stats 
            st.session_state.step_completed = 5 
        except Exception as e:
             st.warning(f"Could not fetch index stats after upsert: {e}")

    except Exception as e:
        st.session_state.ingestion_error = f"Step 4 Error: {e}"
        st.session_state.step4_status = f"❌ Error: {e}"
        status_placeholder.error(st.session_state.step4_status)

if 'step_completed' not in st.session_state:
    st.session_state.step_completed = 0
    st.session_state.aggregated_df = None
    st.session_state.track_embeddings_dict = None
    st.session_state.vectors_to_upsert = None
    st.session_state.ingestion_error = None
    st.session_state.index_stats = None
    st.session_state.step1_status = "Pending"
    st.session_state.step2_status = "Pending"
    st.session_state.step3_status = "Pending"
    st.session_state.step4_status = "Pending"

st.markdown(
    """
        Manually trigger each step of the Emotify data ingestion process.  

        We use **400 audio clips** from the **Emotify Dataset on Kaggle**:  
        [Dataset Link](https://www.kaggle.com/datasets/yash9439/emotify-emotion-classificaiton-in-songs?select=data.csv)  

        Each **1-minute excerpt** belongs to one of four genres: **Rock, Classical, Pop, and Electronic** and has been **annotated by ~30 people** for emotional labels.  

        - Emotional Categories  

        | Emotion | Description |
        |---------|------------|
        | **Amazement** | Wonder, happiness |
        | **Solemnity** | Inspiration, transcendence |
        | **Tenderness** | Affection, love |
        | **Nostalgia** | Melancholic, sentimental |
        | **Calmness** | Relaxation, serenity |
        | **Power** | Strength, triumph |
        | **Joyful Activation** | Dance, animated, amused |
        | **Tension** | Nervous, impatient |
        | **Sadness** | Depressed, sorrowful |
    """
)

status_placeholder = st.empty()
progress_placeholder = st.empty()

if st.session_state.ingestion_error and st.session_state.step_completed < 4 : # Show persistent error until success
    st.error(f"An error occurred: {st.session_state.ingestion_error}")

st.subheader("Step 1: Load CSV & Aggregate Emotions")
st.markdown("For each **track ID**, calculate its **overall emotional profile** based on all user annotations.")
step1_col1, step1_col2 = st.columns([1, 3])
with step1_col1:
    st.button("Load & Aggregate",
              key="btn_step1",
              on_click=step1_load_aggregate,
              disabled=(st.session_state.step_completed >= 1))
with step1_col2:
    if st.session_state.step1_status.startswith("✅"): st.success(st.session_state.step1_status)
    elif st.session_state.step1_status.startswith("❌"): st.error(st.session_state.step1_status)
    elif st.session_state.step1_status.startswith("🔄"): st.info(st.session_state.step1_status)
    else: st.info("Click button to load and process `data.csv`.")

if st.session_state.aggregated_df is not None:
    with st.expander("Show Aggregated Data Sample"):
        st.dataframe(st.session_state.aggregated_df.head())

st.subheader("Step 2: Load Text Embeddings")
st.markdown("Convert the aggregated emotion profile into a **text description** summarizing the track's emotional consensus.")
step2_col1, step2_col2 = st.columns([1, 3])
with step2_col1:
    st.button("Load Embeddings",
              key="btn_step2",
              on_click=step2_load_embeddings,
              disabled=(st.session_state.step_completed < 1 or st.session_state.step_completed >= 2))
with step2_col2:
    if st.session_state.step2_status.startswith("✅"): st.success(st.session_state.step2_status)
    elif st.session_state.step2_status.startswith("❌"): st.error(st.session_state.step2_status)
    elif st.session_state.step2_status.startswith("🔄"): st.info(st.session_state.step2_status)
    else: st.info("Waiting for Step 1.")

if st.session_state.track_embeddings_dict is not None:
    with st.expander("Show Embeddings Info"):
        st.write(f"Loaded {len(st.session_state.track_embeddings_dict)} embeddings.")

st.subheader("Step 3: Prepare Vectors for Pinecone")
st.markdown(
    """
        Use the **MPNET model** to generate **vector embeddings** for:  
        - **Detect emotion descriptions**  
        - **User search queries** (e.g., "melancholic, sentimental feelings")  

        [MPNET Model](https://huggingface.co/sentence-transformers/multi-qa-mpnet-base-dot-v1)  
    """
)
step3_col1, step3_col2 = st.columns([1, 3])
with step3_col1:
    st.button("Prepare Vectors",
              key="btn_step3",
              on_click=step3_prepare_vectors,
              disabled=(st.session_state.step_completed < 2 or st.session_state.step_completed >= 3))
with step3_col2:
    if st.session_state.step3_status.startswith("✅"): st.success(st.session_state.step3_status)
    elif st.session_state.step3_status.startswith("❌"): st.error(st.session_state.step3_status)
    elif st.session_state.step3_status.startswith("🔄"): st.info(st.session_state.step3_status)
    else: st.info("Waiting for Step 2.")

if st.session_state.vectors_to_upsert is not None:
     with st.expander("Show Prepared Vector Sample"):
         st.write(f"Prepared {len(st.session_state.vectors_to_upsert)} vectors.")
         st.json(st.session_state.vectors_to_upsert[0] if st.session_state.vectors_to_upsert else "None")

st.subheader("Step 4: Upsert Vectors to Pinecone")
st.markdown(
    """
    Store embeddings in **Pinecone** to enable **efficient similarity search** for emotion-based audio retrieval.  
    
    With this approach, users can search for songs by emotion and get highly relevant matches.  
    """
)
step4_col1, step4_col2 = st.columns([1, 3])
with step4_col1:
    st.button("Upsert to Pinecone",
              key="btn_step4",
              on_click=step4_upsert_pinecone,
              disabled=(st.session_state.step_completed < 3 or st.session_state.step_completed >= 4))
with step4_col2:
    if st.session_state.step4_status.startswith("✅"): st.success(st.session_state.step4_status)
    elif st.session_state.step4_status.startswith("❌"): st.error(st.session_state.step4_status)
    elif st.session_state.step4_status.startswith("🔄"): st.info(st.session_state.step4_status)
    else: st.info("Waiting for Step 3.")

if st.session_state.step_completed >= 4:
    st.markdown("---")
    st.subheader("📊 Final Index Status")
    if st.session_state.index_stats:
        st.text("Pinecone Index Stats after upsert:")
        st.code(st.session_state.index_stats)
    else:
        st.info("Index stats were not fetched or failed.")
    st.success("Ingestion process completed.")

st.markdown("---")
if st.button("Reset Ingestion State", key="btn_reset"):
    st.session_state.step_completed = 0
    st.session_state.aggregated_df = None
    st.session_state.track_embeddings_dict = None
    st.session_state.vectors_to_upsert = None
    st.session_state.ingestion_error = None
    st.session_state.index_stats = None
    st.session_state.step1_status = "Pending"
    st.session_state.step2_status = "Pending"
    st.session_state.step3_status = "Pending"
    st.session_state.step4_status = "Pending"
    status_placeholder.empty() 
    progress_placeholder.empty()
    st.rerun() 