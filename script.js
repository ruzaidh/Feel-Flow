const songs = [
    {
        title: "Fed Up",
        artist: "Bazanji",
        cover: "file:///C:/Users/R%20U%20Z%20Z%20Y%20!!!/.gemini/antigravity/brain/3b9d1ef9-b0bc-4c19-90e3-40a33ea9ed2c/album_cover_1_1778345223815.png",
        source: "English songs/Bazanji - Fed Up.mp3"
    },
    {
        title: "Alone",
        artist: "Alan Walker",
        cover: "file:///C:/Users/R%20U%20Z%20Z%20Y%20!!!/.gemini/antigravity/brain/3b9d1ef9-b0bc-4c19-90e3-40a33ea9ed2c/album_cover_2_1778345343474.png",
        source: "English songs/Alan_Walker_-_Alone_Olagist.co_.mp3"
    },
    {
        title: "Mockingbird",
        artist: "Eminem",
        cover: "file:///C:/Users/R%20U%20Z%20Z%20Y%20!!!/.gemini/antigravity/brain/3b9d1ef9-b0bc-4c19-90e3-40a33ea9ed2c/album_cover_3_1778345408322.png",
        source: "English songs/Eminem - Mockingbird [Official Music Video].mp3"
    },
    {
        title: "Enemy",
        artist: "Imagine Dragons",
        cover: "file:///C:/Users/R%20U%20Z%20Z%20Y%20!!!/.gemini/antigravity/brain/3b9d1ef9-b0bc-4c19-90e3-40a33ea9ed2c/album_cover_1_1778345223815.png",
        source: "English songs/Enemy ( Tommee Profitt Feat. Beacon Light & Sam Tinnesz ) - Lyrics (320 kbps).mp3"
    },
    {
        title: "Bring Me To Life",
        artist: "Evanescence",
        cover: "file:///C:/Users/R%20U%20Z%20Z%20Y%20!!!/.gemini/antigravity/brain/3b9d1ef9-b0bc-4c19-90e3-40a33ea9ed2c/album_cover_2_1778345343474.png",
        source: "English songs/Evanescence - Bring Me To Life.mp3"
    },
    {
        title: "Without Me",
        artist: "Halsey",
        cover: "file:///C:/Users/R%20U%20Z%20Z%20Y%20!!!/.gemini/antigravity/brain/3b9d1ef9-b0bc-4c19-90e3-40a33ea9ed2c/album_cover_3_1778345408322.png",
        source: "English songs/Halsey - Without Me (Lyrics).mp3"
    }
];

let currentSongIndex = 0;
let isPlaying = false;

// DOM Elements
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const currentCover = document.getElementById('current-cover');
const songGridContainer = document.getElementById('song-grid-container');
const quickPicksContainer = document.getElementById('quick-picks-container');

// Render Quick Picks
function renderQuickPicks() {
    quickPicksContainer.innerHTML = '';
    const quickPicks = songs.slice(0, 4); // First 4 songs
    quickPicks.forEach((song, index) => {
        const card = document.createElement('div');
        card.classList.add('quick-pick-card');
        card.innerHTML = `
            <img src="${song.cover}" alt="Cover">
            <h4>${song.title}</h4>
            <button class="play-button-small" onclick="loadAndPlay(${index}, event)">
                <i class="fa-solid fa-play"></i>
            </button>
        `;
        card.addEventListener('click', () => loadAndPlay(index));
        quickPicksContainer.appendChild(card);
    });
}

// Render Song Grid
function renderSongGrid() {
    songGridContainer.innerHTML = '';
    songs.forEach((song, index) => {
        const card = document.createElement('div');
        card.classList.add('song-card');
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${song.cover}" alt="Cover">
                <button class="play-button-small" onclick="loadAndPlay(${index}, event)">
                    <i class="fa-solid fa-play"></i>
                </button>
            </div>
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        `;
        card.addEventListener('click', () => loadAndPlay(index));
        songGridContainer.appendChild(card);
    });
}

// Format time in MM:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

// Load Song
function loadSong(song) {
    currentTitle.innerText = song.title;
    currentArtist.innerText = song.artist;
    currentCover.src = song.cover;
    currentCover.classList.remove('hidden');
    audio.src = song.source;
}

// Play Song
function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    playBtn.style.color = 'var(--accent-color)';
    audio.play();
}

// Pause Song
function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    playBtn.style.color = 'var(--text-primary)';
    audio.pause();
}

// Load and Play specific song
function loadAndPlay(index, event) {
    if (event) event.stopPropagation(); // Prevent card click if button clicked
    currentSongIndex = index;
    loadSong(songs[currentSongIndex]);
    playSong();
}

// Previous Song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

// Next Song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

// Update Progress Bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeEl.innerText = formatTime(currentTime);
    if (duration) {
        totalTimeEl.innerText = formatTime(duration);
    }
}

// Set Progress Bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (duration) {
        audio.currentTime = (clickX / width) * duration;
    }
}

// Event Listeners
playBtn.addEventListener('click', () => {
    const isAudioPlaying = playBtn.querySelector('.fa-circle-pause');
    if (isAudioPlaying) {
        pauseSong();
    } else {
        if (!audio.src) {
            loadSong(songs[currentSongIndex]);
        }
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.innerText = formatTime(audio.duration);
});
progressContainer.addEventListener('click', setProgress);

// Initialize
renderQuickPicks();
renderSongGrid();
loadSong(songs[currentSongIndex]);
