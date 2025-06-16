let hitSound = new Audio('assets/sounds/hit.mp3');
let musicLevel1 = new Audio('assets/sounds/bg-music.mp3');
let musicLevel2 = new Audio('assets/sounds/bg-music-2.mp3');
let decideSound = new Audio('assets/sounds/decide.mp3');
let isMuted = false; // Estado del volumen

// Asegurar que los audios se carguen correctamente
[hitSound, musicLevel1, musicLevel2, decideSound].forEach(audio => {
    audio.load();
});

export function toggleVolume() {
    isMuted = !isMuted;
    [hitSound, musicLevel1, musicLevel2, decideSound].forEach(audio => {
        audio.muted = isMuted;
    });
}

export function playHit() {
    if (!isMuted) {
        hitSound.currentTime = 0;
        hitSound.play();
    }
}

export function playMusicLevel1() {
    if (!isMuted) {
        musicLevel2.pause();
        musicLevel1.loop = true;
        musicLevel1.play();
    }
}

export function playMusicLevel2() {
    if (!isMuted) {
        musicLevel1.pause();
        musicLevel2.loop = true;
        musicLevel2.play();
    }
}

export function playDecideSound() {
    if (!isMuted) {
        decideSound.currentTime = 0;
        decideSound.play();
    }
}

export function pauseMusic() {
    musicLevel1.pause();
    musicLevel2.pause();
}
