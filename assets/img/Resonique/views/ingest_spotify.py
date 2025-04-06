import streamlit as st
import pinecone
import requests
import time

st.title(":material/add_circle: Connect to Spotify Playlist")

required_components = {
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

@st.cache_data
def get_spotify_auth_token():
    auth_url = 'https://accounts.spotify.com/api/token'
    auth_response = requests.post(auth_url, {
        'grant_type': 'client_credentials',
        'client_id': st.secrets["SPOTIFY_CLIENT_ID"],
        'client_secret': st.secrets["SPOTIFY_CLIENT_SECRET"],
    })
    auth_response_data = auth_response.json()
    return auth_response_data['access_token']

@st.cache_data
def get_tracks_from_spotify(playlist_id):
    access_token = get_spotify_auth_token()
    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    playlist_url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
    try:
        response = requests.get(playlist_url, headers=headers)
        response.raise_for_status()
        return response.json().get('items', [])
    except requests.exceptions.RequestException:
        return None

@st.cache_data
def get_song_description(song_name, artist_name):
    prompt = f"""
    You are an AI that helps users find the best setting to listen to a song.
    Based on the song '{song_name}' by '{artist_name}', provide a creative and engaging 
    description of the ideal listening environment for this track.
    """
    response = st.session_state.gemini_client.generate_content(prompt)
    return response.text.strip()

def load_tracks_to_pinecone(new_playlist_id):
    playlist_tracks = get_tracks_from_spotify(new_playlist_id)
    print('playlist_tracks', playlist_tracks)

    if playlist_tracks:
        if new_playlist_id == st.session_state.get("current_pid"):
            st.toast("Reloading songs from current playlist - checking for new songs.")
        else:
            clear_playlist()

        progress_bar = st.progress(0, "Loading tracks to Pinecone...")
        num_tracks = len(playlist_tracks)

        for i, item in enumerate(playlist_tracks):
            percentage_complete = i / float(num_tracks)
            track = item['track']
            song = track["name"]
            artist = track['artists'][0]['name']
            song_url = track['external_urls']['spotify']
            print(f"Song: {song} | Artist: {artist} | URL: {song_url}")

            existing_vectors = st.session_state.pinecone_index.query(
                namespace="default",
                top_k=1,
                include_metadata=True,
                filter={"Song_URL": song_url}
            )
            if existing_vectors.get("matches"):
                progress_bar.progress(percentage_complete, f"Skipping song {i+1}/{num_tracks}, already loaded: {song} - {artist}")
                time.sleep(0.1)
                continue

            description = get_song_description(song, artist)
            print(description)

            embedding = st.session_state["embedding_model"].encode(description)             
            
            print(f"Embedding for {song}: {embedding}")
            vector_data = {
                "id": song_url, 
                "values": embedding,
                "metadata": {
                    "Song_Name": song,
                    "Artist": artist,
                    "Song_URL": song_url,
                    "Description": description
                }
            }
            st.session_state.pinecone_index.upsert(vectors=[vector_data], namespace="songs")

            progress_bar.progress(percentage_complete, f"Loading song {i+1}/{num_tracks}: {song} - {artist}")
        progress_bar.progress(1.0, f"Finished loading {num_tracks} songs to Pinecone.")
        time.sleep(2)
        progress_bar.empty()
        st.session_state.current_pid = new_playlist_id
    else:
        st.toast("Please submit a valid public Spotify playlist ID.")

def clear_playlist():
    print("Clearing playlist...")
    if "pinecone_index" in st.session_state:
        try:
            response = st.session_state.pinecone_index.query(
                namespace="default",
                top_k=1,
                include_metadata=True
            )
            st.session_state.pinecone_index.delete(delete_all=True, namespace="songs")
            print("Playlist cleared.")
        except pinecone.core.openapi.shared.exceptions.NotFoundException:
            print("Namespace 'songs' not found. Skipping delete operation.")
    else:
        print("Pinecone index not initialized!")
    
    st.session_state.current_pid = None


def load_playlist():
    new_playlist_id = st.session_state["pid_input"]
    load_tracks_to_pinecone(new_playlist_id)

with st.container(border=True):
    st.write("**Current Playlist ID:**", st.session_state.get("current_pid", "None"))
    disable_button = not bool(st.session_state.get("current_pid"))

    st.link_button(
        "Open playlist in Spotify",
        f"https://open.spotify.com/playlist/{st.session_state.get('current_pid', '')}",
        disabled=disable_button
    )
    st.button("Clear full playlist", on_click=clear_playlist, disabled=disable_button)

with st.form(key="new_playlist_form"):
    st.markdown(
        """
            Copy/paste a Spotify playlist ID into the box below and click "Load to Pinecone". 
            This application will:
            1. Retrieve the songs from that playlist using the Spotify API
            2. Generate descriptions of those songs using Gemini
            3. Upload the song information and descriptions to the Pinecone vector store
        """
    )
    new_pid = st.text_input(
        "Sample Playlist ID: 3C5CqRlEoisNEusrgg7kEX",
        placeholder="3C5CqRlEoisNEusrgg7kEX",
        key="pid_input"
    )
    st.form_submit_button("Load full playlist to Pinecone", on_click=load_playlist)