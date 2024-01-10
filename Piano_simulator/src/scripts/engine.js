const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

mapedKeys = {
    "a": "1",
    "1": "2",
    "q": "3",
    "2": "4",
    "w": "5",
    "e": "6",
    "4": "7",
    "r": "8",
    "5": "9",
    "t": "10",
    "6": "11",
    "y": "12",
    "u": "13",
    "8": "14",
    "i": "15",
    "9": "16",
    "o": "17",
    "p": "18",
    "-": "19",
    "[": "20",
    "=": "21",
    "]": "22",
    "Backspace": "23",
    "\\": "24",};

let audio = new Audio("src/tunes/1.wav");

const playTune = (key) => {
    audio.src = `src/tunes/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active")
    }, 150)
}

pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playTune(key.dataset.key));
});

document.addEventListener("keydown", (e) => {
    if (e.repeat) return

    const notePressed = mapedKeys[e.key.toLowerCase()];

    if(notePressed) {
        playTune(notePressed)
    } 
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const showHideKeys = () => {
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
}

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener("input", showHideKeys);