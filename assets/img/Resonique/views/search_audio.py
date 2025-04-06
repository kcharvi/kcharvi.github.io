import streamlit as st
from utils.connect import get_supabase_audio_url

def check_pinecone_index():
    if "pinecone_index" not in st.session_state:
        print("Pinecone index not initialized")
        return
        
    try:
        stats = st.session_state.pinecone_index.describe_index_stats()
        for ns, details in stats.get('namespaces', {}).items():
            print(f"\nNamespace: {ns}")
            print(f"Vector count: {details.get('vector_count', 0)}")
    except Exception as e:
        print(f"Error checking Pinecone index: {e}")

st.title(":material/mood: Search Audio by Emotion")
st.markdown("Enter a description of the mood or emotion you're looking for, and find matching audio tracks.")

st.markdown(
    """
        Semantic Search for Emotion-Based Music Search

        1. Similarity Calculation  
        To find the best-matching tracks, we perform **semantic search** by calculating the **similarity score** (e.g., **cosine similarity**) between:  
        - The **user's query embedding**  
        - The **track emotion text embeddings**  

        The text embedding model used for this process is **MPNET**:  
        [MPNET Model - Hugging Face](https://huggingface.co/sentence-transformers/multi-qa-mpnet-base-dot-v1)  

        2. Example Query & Search Results  
        For a query like:  
        *"Show me loops that feel like heartbreak in spring."*  

        The system retrieves and ranks tracks based on their **emotional similarity**, returning results that best align with the sentiment of the request.  

        This approach enables **context-aware music discovery**, allowing users to find tracks based on abstract emotional descriptions.
    """
)

if "audio_search_query" not in st.session_state:
    st.session_state.audio_search_query = ""
if "audio_search_results" not in st.session_state:
    st.session_state.audio_search_results = None

check_pinecone_index()

def handle_audio_search():
    query = st.session_state.audio_search_query.strip()
    if not query:
        return
        
    try:
        query_embedding = st.session_state.embedding_model.encode(query).tolist()
        results = st.session_state.pinecone_index.query(
            vector=query_embedding,
            top_k=5,
            include_metadata=True,
            namespace=st.secrets.get("PINECONE_AUDIO_NAMESPACE", "audio_emotions")
        )
        
        st.session_state.audio_search_results = []
        
        for match in results['matches']:
            metadata = match['metadata']
            
            emotion_scores = {}
            for key, value in metadata.items():
                if key.startswith('emotion_') and key != 'emotion_text':
                    emotion_name = key.replace('emotion_', '').title()
                    emotion_scores[emotion_name] = float(value)
            
            sorted_emotions = sorted(
                emotion_scores.items(), 
                key=lambda x: x[1], 
                reverse=True
            )
            
            top_emotions = [
                f"{emotion} ({score:.2f})"
                for emotion, score in sorted_emotions[:3]
                if score > 0.1 
            ]
            
            track_id = int(metadata.get('track_id', 0))
            genre = metadata.get('genre', '')
            emotion_text = metadata.get('emotion_text', '')
            
            audio_url = get_supabase_audio_url(track_id, genre)
            
            if audio_url:
                result = {
                    'track_id': track_id,
                    'genre': genre,
                    'score': match['score'],
                    'audio_url': audio_url,
                    'emotion_scores': sorted_emotions,
                    'top_emotions': top_emotions,
                    'emotion_text': emotion_text
                }
                st.session_state.audio_search_results.append(result)
        
    except Exception as e:
        print(f"Error during search: {e}")
        st.error(f"An error occurred during search: {str(e)}")
        return None

def display_results():
    """Display the search results."""
    if not st.session_state.audio_search_results:
        return
        
    for i, res in enumerate(st.session_state.audio_search_results):
        with st.container(border=True):
            col1, col2 = st.columns([1, 2])
            
            with col1:
                st.write(f"Rank {i+1}")
                st.write(f"(Score: {res['score']:.3f})")
                st.write("")
                st.write("Track ID:")
                st.write(f"{res['track_id']}")
                st.write("")
                st.write(f"Genre: {res['genre']}")
                
                st.write("")
                st.write("Detected Emotions:")
                
                for emotion in res['top_emotions']:
                    st.write(f"• {emotion}")
                
                if res['emotion_text']:
                    st.write("")
                    st.write("Emotion Labels:")
                    st.write(res['emotion_text'])
                
                with st.expander("See all emotion scores"):
                    for emotion, score in res['emotion_scores']:
                        if score > 0:  # Only show non-zero scores
                            st.write(f"{emotion}: {score:.2f}")
            
            with col2:
                if res['audio_url']:
                    try:
                        st.audio(res['audio_url'], format="audio/mp3")
                    except Exception as audio_e:
                        st.error(f"Could not load audio player. Error: {str(audio_e)}")
                        st.markdown(f"[Click to play audio]({res['audio_url']})")
                else:
                    st.info(f"Audio preview unavailable for track {res['track_id']}.")

query = st.text_input(
    "Describe the audio emotion:",
    placeholder="e.g., dreamy and melancholic, heroic and triumphant, feeling of love",
    key="audio_search_query" 
)

search_button = st.button("Search Tracks", on_click=handle_audio_search)

st.divider()

if st.session_state.audio_search_results is not None:
    display_results()

elif st.session_state.audio_search_query and not search_button:
    st.info("Click the 'Search Tracks' button to find matching audio.")
