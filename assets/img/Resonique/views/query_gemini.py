import streamlit as st
from PIL import Image 
import io
import numpy as np

st.title(":material/image_search: Song Search with Gemini")

required_components = {
    "gemini_client": "Gemini client",
    "pinecone_index": "Pinecone index",
    "embedding_model": "Embedding model"
}

missing_components = [
    name for key, name in required_components.items()
    if key not in st.session_state
]

if missing_components:
    st.error(f"Missing required components: {', '.join(missing_components)}")
    st.stop()

PROMPT = """
    You are an AI agent that helps users find music that matches their current setting.
    Please describe the ambiance and vibe of the included image. 
    What types of music would be fitting for this setting? 
    What kind of mood is conveyed in the image?
    Understand the user input and try to give out emotions that would be fitting the setting asked for.
"""

if "user_feedback" not in st.session_state:
    st.session_state.user_feedback = None
if "top_songs" not in st.session_state:
    st.session_state.top_songs = []
if "photo_input" not in st.session_state:
    st.session_state.photo_input = None 
if "text_input" not in st.session_state:
     st.session_state.text_input = ""

@st.cache_data 
def get_setting_description_from_image(_image_bytes):
    setting_description = "No description available."

    try:
        img = Image.open(io.BytesIO(_image_bytes))
        prompt = "Describe the setting, ambiance, and vibe shown in this image in detail."
        response = st.session_state.gemini_client.generate_content(
            [prompt, img], 
        )
        setting_description = response.text.strip() if response.text else "No description available."

    except Exception as e:
        st.error(f"Error processing image with Gemini: {e}")
        print(f"Error processing image: {e}")
    return setting_description

def get_embedding_for_query(text_description):
    if not text_description:
        print("Skipping embedding: No text description provided.")
        return None

    try:
        model = st.session_state['embedding_model']
        embedding = model.encode(text_description)
        return embedding.tolist() if isinstance(embedding, np.ndarray) else embedding
    except Exception as e:
        st.error(f"Error generating embedding: {e}")
        print(f"Error generating embedding: {e}")
        return None

def find_songs(full_search_query):
    st.session_state.top_songs = [] 
    query_vector = get_embedding_for_query(full_search_query)
    if query_vector is None:
        st.warning("Could not generate embedding for the query. Cannot search.")
        return 
    try:
        index = st.session_state.pinecone_index
        results = index.query(
            vector=query_vector,
            top_k=5,
            include_metadata=True,
            namespace="songs" 
        )
        matches = results.get("matches", [])
        if not matches:
             st.info("No matching songs found in the current playlist for this query.")
        st.session_state.top_songs = [
            {
                "Song_Name": match["metadata"].get("Song_Name", "Unknown"),
                "Artist": match["metadata"].get("Artist", "Unknown"),    
                "Song_URL": match["metadata"].get("Song_URL", "#"),      
                "Score": match.get("score", 0.0) 
            }
            for match in matches
        ]
    except Exception as e:
        st.error(f"Error querying Pinecone: {e}")
        print(f"Error querying Pinecone: {e}")
        st.session_state.top_songs = []

def handle_submit():
    st.session_state.user_feedback = None 
    st.session_state.top_songs = []

    photo_desc = "No description available."
    text_desc = st.session_state.get("text_input", "").strip()

    uploaded_photo_widget = st.session_state.get("photo_input_widget", None)
    if uploaded_photo_widget and uploaded_photo_widget.size > 0:
        uploaded_photo_widget.seek(0)
        image_bytes = uploaded_photo_widget.getvalue()
        st.session_state.photo_input = uploaded_photo_widget
        photo_desc = get_setting_description_from_image(image_bytes)
    else:
        st.session_state.photo_input = None
        print("No valid photo uploaded or selected.")

    effective_photo_desc = photo_desc if photo_desc != "No description available." else ""
    full_search_query = " ".join(filter(None, [effective_photo_desc, text_desc])).strip()

    if full_search_query:
         st.session_state.user_feedback = full_search_query
         find_songs(full_search_query) 
    else:
         st.warning("Please provide either an image or a text description to search.")
         st.session_state.photo_input = None 

st.write("##### Resonique Multimodal Query")
photo_method = st.radio(
    "Select an image upload method:", ["Upload", "Camera"],
    key="photo_method_radio",
    horizontal=True
)

with st.form(key="query_form"):
    st.write("#### Describe Your Setting")

    if photo_method == "Upload":
        st.file_uploader(
            "Upload a photo:", type=["jpg", "jpeg", "png", "heic"],
            key="photo_input_widget"
        )
    elif photo_method == "Camera":
        st.camera_input("Take a picture:", key="photo_input_widget")

    st.text_input(
        "Or add/refine with a text description (optional):",
        key="text_input",
        placeholder="e.g., cozy cafe, rainy day, energetic workout"
        )

    st.form_submit_button("Find Matching Songs", on_click=handle_submit)


if st.session_state.get("photo_input"):
    if st.session_state.photo_input.size > 0:
        with st.container(border=True):
            st.header("Uploaded Image")
            st.session_state.photo_input.seek(0)
            try:
                st.image(st.session_state.photo_input.getvalue(), width=300)
            except Exception as img_display_e:
                st.error(f"Could not display image: {img_display_e}")


with st.container(border=True):
    st.write("#### Recommendations")
    if st.session_state.get("user_feedback"):
        with st.expander("Show Details (Query & Raw Results)"):
            st.subheader("Effective Query Used for Search")
            st.write(st.session_state.user_feedback)
            if st.session_state.get("top_songs"):
                st.subheader("Raw Data from Pinecone")
                st.dataframe(
                    st.session_state.top_songs,
                    column_config={
                        "Song_URL": st.column_config.LinkColumn("Spotify Link", display_text="Listen on Spotify"),
                        "Score": st.column_config.NumberColumn("Relevance Score", format="%.4f")
                         },
                     hide_index=True
                )
            else:
                 st.info("No raw data to display (no matches found).")

    st.write("#### Top Recommended Songs")
    if st.session_state.get("top_songs"):
        for song in st.session_state.top_songs:
            name = song.get("Song_Name", "N/A")
            artist = song.get("Artist", "N/A")
            url = song.get("Song_URL", "")
            score = song.get("Score", 0.0)
            if url and url != "#":
                st.write(f"- [{name} - {artist}]({url}) (Score: {score:.3f})")
            else:
                st.write(f"- {name} - {artist} (Score: {score:.3f}) - *URL missing*")
    elif st.session_state.get("user_feedback"):
         st.write("No song recommendations found matching your query in the loaded playlist.")
    else:
        st.info("Submit an image or text description above to get recommendations.")