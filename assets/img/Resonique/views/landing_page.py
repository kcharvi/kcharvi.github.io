import streamlit as st

st.markdown("""
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
    .main {
        padding: 2rem;
    }
    ul, ol {
        list-style-type: none;
    }
    .stButton>button {
        width: 100%;
        margin-top: 1rem;
        background-color: #FF4B4B;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: bold;
    }
    .stButton>button:hover {
        background-color: #FF6B6B;
    }
    .feature-card {
        background-color: #f0f2f6;
        padding: 1rem;
        border-radius: 1rem;
        margin: 1rem 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .feature-card:hover {
        transform: translateY(-5px);
        transition: transform 0.3s ease;
    }
    .material-icons {
        font-size: 24px;
        vertical-align: middle;
        margin-right: 1px;
    }
    .feature-icon {
        font-size: 32px;
        color: #FF4B4B;
    }
    .feature-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 1rem;
    }
    .feature-header h3 {
        margin: 0;
    }
    </style>
""", unsafe_allow_html=True)

st.title("🎵 Welcome to Resonique")
st.markdown("""
    <div style='text-align: center;'>
        <h2 style='color: #FF4B4B;'>Let Your Surroundings Pick the Beat!</h2>
        <p style='font-size: 1.2rem; color: #666;'>
            Struggling to find the perfect music or background score for the moment? Say goodbye to 
            <br>
            endless scrolling and let Resonique do the magic <span class="material-icons">auto_awesome</span> <br>
            <span class="material-icons">search</span> Search audio clips that match your exact emotion in seconds!
            <br>
            <span class="material-icons">camera_alt</span> Snap your surroundings & let AI curate the perfect vibe!
        </p>
    </div>
""", unsafe_allow_html=True)

st.markdown("### Features")

col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("""
        <div class='feature-card'>
            <div class='feature-header'>
                <span class="material-icons feature-icon">music_note</span>
                <h3 style='color: #FF4B4B;'>Pick from Spotify</h3>
            </div>
            <p>Connect your Spotify playlists and transform them into emotion-aware collections.</p>
            <ul>
                <li><span class="material-icons">playlist_add</span> Import your favorite playlists</li>
                <li><span class="material-icons">bolt</span> Instant results for every mood</li>
                <li><span class="material-icons">mood</span> Search by mood, setting, or vibe</li>
            </ul>
        </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
        <div class='feature-card'>
            <div class='feature-header'>
                <span class="material-icons feature-icon">add_photo_alternate</span>
                <h3 style='color: #FF4B4B;'>Snap and Match</h3>
            </div>
            <p>Find the perfect music for any moment using AI-powered vibe check from just a snap.</p>
            <ul>
                <li><span class="material-icons">sentiment_satisfied</span> Search by mood or emotion</li>
                <li><span class="material-icons">psychology</span> Check the vibe from a snap</li>
                <li><span class="material-icons">recommend</span> Context-aware recommendations</li>
            </ul>
        </div>
    """, unsafe_allow_html=True)

with col3:
    st.markdown("""
        <div class='feature-card'>
            <div class='feature-header'>
                <span class="material-icons feature-icon">headphones</span>
                <h3 style='color: #FF4B4B;'>Search Audio Clips</h3>
            </div>
            <p>Discover audio clips that match your emotional state or desired mood.</p>
            <ul>
                <li><span class="material-icons">search</span> Search by emotional description</li>
                <li><span class="material-icons">play_circle</span> Listen to matching audio clips</li>
                <li><span class="material-icons">analytics</span> Pick from top choices</li>
            </ul>
        </div>
    """, unsafe_allow_html=True)

st.markdown("### Perfect For Everyone")

use_cases = [
    {
        "title": "Content Creators",
        "icon": "video_library",
        "description": "Find the perfect background music for your videos based on the emotional tone you want to convey."
    },
    {
        "title": "Game Developers",
        "icon": "sports_esports",
        "description": "Match game scenes with emotionally appropriate music to enhance player experience."
    },
    {
        "title": "Filmmakers",
        "icon": "movie",
        "description": "Discover music that perfectly matches your scene's emotional atmosphere."
    },
    {
        "title": "Music Enthusiasts",
        "icon": "music_note",
        "description": "Explore new music based on emotional connections rather than just genres."
    }
]

for case in use_cases:
    st.markdown(f"""
        <div class='feature-card'>
            <div class='feature-header'>
                <span class="material-icons feature-icon">{case['icon']}</span>
                <h3 style='color: #FF4B4B;'>{case['title']}</h3>
            </div>
            <p>{case['description']}</p>
        </div>
    """, unsafe_allow_html=True)

st.markdown("### Getting Started")

st.markdown("""
    <div style='background-color: #f0f2f6; padding: 2rem; border-radius: 1rem;'>
        <h3 style='color: #FF4B4B;'>Quick Start Guide</h3>
        <ol>
            <li><span class="material-icons">link</span> <strong>Connect to Spotify Playlist:</strong> Get your public Spotify playlist and link to Resonique</li>
            <li><span class="material-icons">mood</span> <strong>Song Search with Gemini:</strong> Use the emotion search or upload a snap/photo to find the perfect mood</li>
            <li><span class="material-icons">headphones</span> <strong>Search Audio by Emotion:</strong> Discover audio clips that match your emotional state.</li>
            <li><span class="material-icons">data_object</span> <strong>Emotify Data Management:</strong> Use the Emotify Data Ingest to manage audio collection</li>
        </ol>
    </div>
""", unsafe_allow_html=True)

st.markdown("---")
st.markdown("""
    <div style='text-align: center;'>
        <p style='color: #FF4B4B;'>Ready to explore the emotional side of music?</p>
        <p style='color: #666; font-weight: bold;'>Made by Charvi | Last Updated: April, 2025</p>
    </div>
""", unsafe_allow_html=True) 