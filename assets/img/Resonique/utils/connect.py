import streamlit as st
import pinecone
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
from supabase import create_client, Client

def initialize_connections():
    print("\n=== Starting Connection Initialization ===")
    success = True
    
    try:
        # Pinecone
        if "pinecone_index" not in st.session_state:
            print("Initializing Pinecone...")
            pc = pinecone.Pinecone(st.secrets["PINECONE_API_KEY"])
            index_name = st.secrets["PINECONE_INDEX_NAME"]
            st.session_state.pinecone_index = pc.Index(index_name)
            print(f"Pinecone Index connected.")

        # Gemini
        if "gemini_client" not in st.session_state:
            print("Initializing Gemini...")
            st.session_state["gemini_client"] = load_gemini_client()
            print("Gemini client loaded.")

        # Embedding Model
        if "embedding_model" not in st.session_state:
            print("Loading embedding model...")
            st.session_state["embedding_model"] = load_embedding_model()
            print("Embedding model loaded.")

        # Supabase Client
        if "supabase_client" not in st.session_state:
            print("Initializing Supabase...")
            url: str = st.secrets["SUPABASE_URL"]
            key: str = st.secrets["SUPABASE_KEY"]
            st.session_state["supabase_client"] = create_client(url, key)
            print("Supabase client initialized.")

        required_components = ["pinecone_index", "gemini_client", "embedding_model", "supabase_client"]
        missing = [comp for comp in required_components if comp not in st.session_state]
        
        if missing:
            print(f"Missing components after initialization: {missing}")
            success = False
        else:
            print("All components successfully initialized")
            success = True
            
        print(f"Initialization status: {success}")
        return success
        
    except Exception as e:
        print(f"Error during initialization: {e}")
        return False

@st.cache_resource
def load_gemini_client():
    """Load and cache the Gemini client."""
    genai.configure(api_key=st.secrets["GEMINI_API_KEY"])
    gemini_model = genai.GenerativeModel(model_name='gemini-1.5-flash-latest')
    return gemini_model

@st.cache_resource
def load_embedding_model():
    """Load and cache the embedding model."""
    print("Loading embedding model...")
    return SentenceTransformer('multi-qa-mpnet-base-dot-v1')

@st.cache_resource
def get_supabase_audio_url(track_id: int, genre: str) -> str | None:
    """Get the Supabase audio URL for a track."""
    if "supabase_client" not in st.session_state:
        print("Supabase client not initialized.")
        return None
    try:
        supabase: Client = st.session_state.supabase_client
        bucket_name: str = st.secrets["SUPABASE_BUCKET_NAME"]
        file_path = f"{track_id}.mp3"
        
        try:
            public_url = supabase.storage.from_(bucket_name).get_public_url(file_path)
            return public_url
                
        except Exception as e:
            print(f"Error creating public URL: {e}")
            return None
            
    except Exception as e:
        st.warning(f"Could not retrieve audio URL for track {track_id}. File might be missing or path incorrect.")
        return None