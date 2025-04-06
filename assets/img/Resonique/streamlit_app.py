import streamlit as st
from utils.connect import initialize_connections 

st.set_page_config(page_title="Resonique", page_icon=":musical_note:", layout="wide")

if "initialized" not in st.session_state:
    st.session_state.initialized = False

print("\n=== Checking Application State ===")
print("Current session state keys:", list(st.session_state.keys()))

required_components = ["pinecone_index", "embedding_model", "supabase_client", "gemini_client"]
missing_components = [comp for comp in required_components if comp not in st.session_state]

if missing_components or not st.session_state.initialized:
    print(f"Missing components or not initialized: {missing_components}")
    with st.spinner("Initializing connections..."):
        for comp in required_components:
            if comp in st.session_state:
                del st.session_state[comp]
        
        success = initialize_connections()
        if not success:
            st.error("Failed to initialize connections. Please check your internet connection and try again.")
            st.stop()
        else:
            st.session_state.initialized = True
            print("Successfully initialized all components")
else:
    print("All components already initialized")

missing_after_init = [comp for comp in required_components if comp not in st.session_state]
if missing_after_init:
    st.error(f"Critical components missing after initialization: {', '.join(missing_after_init)}")
    st.stop()

landing_page = st.Page("./views/landing_page.py", title="Home", icon=":material/home:")
ingest_page = st.Page("./views/ingest_spotify.py", title="Connect to Spotify Playlist", icon=":material/add_circle:")
query_page = st.Page("./views/query_gemini.py", title="Song Search with Gemini", icon=":material/image_search:")
audio_search_page = st.Page("./views/search_audio.py", title="Search Audio by Emotion", icon=":material/mood:") 
ingest_emotify_page = st.Page("./views/ingest_emotify.py", title="Emotify Data Management", icon=":material/storage:")

if st.session_state.initialized:
    pg = st.navigation([landing_page, ingest_page, query_page, audio_search_page, ingest_emotify_page])
    pg.run()
else:
    st.error("Application not properly initialized. Please refresh the page.")