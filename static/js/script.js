const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const studyTimeInput = document.getElementById('study-time');
const restTimeInput = document.getElementById('rest-time');

let interval;
let isStudyTime = true;
let timeLeft = studyTimeInput.value * 60;

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft === 0) {
            clearInterval(interval);
            isStudyTime = !isStudyTime;
            timeLeft = (isStudyTime ? studyTimeInput.value : restTimeInput.value) * 60;
            updateTimer();
            alert(isStudyTime ? "Time for a break!" : "Time to study!");
            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(interval);
}

function resetTimer() {
    clearInterval(interval);
    isStudyTime = true;
    timeLeft = studyTimeInput.value * 60;
    updateTimer();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

studyTimeInput.addEventListener('change', () => {
    resetTimer();
});

restTimeInput.addEventListener('change', () => {
    resetTimer();
});

const bgBtns = document.querySelectorAll('.bg-btn');

bgBtns.forEach(btn => {
    btn.style.backgroundImage = `url(/static/images/${btn.dataset.bg})`;
    btn.addEventListener('click', () => {
        document.body.style.backgroundImage = `url(/static/images/${btn.dataset.bg})`;
        document.body.style.backgroundSize = 'cover';
    });
});

const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');

const songs = [
    { title: 'Song 1', artist: 'Artist 1', src: '/static/music/song1.mp3' },
    { title: 'Song 2', artist: 'Artist 2', src: '/static/music/song2.mp3' },
    { title: 'Song 3', artist: 'Artist 3', src: '/static/music/song3.mp3' },
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(song) {
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audioPlayer.src = song.src;
}

function playSong() {
    isPlaying = true;
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
}

function pauseSong() {
    isPlaying = false;
    audioPlayer.pause();
    playPauseBtn.textContent = 'Play';
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

loadSong(songs[currentSongIndex]);
