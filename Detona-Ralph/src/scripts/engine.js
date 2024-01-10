const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        Over: document.querySelector("#gameOver"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }

}

function novoJogo() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
  
    state.values.hitPosition = 0;
    state.values.result = 0;
    state.values.currentTime = 60;
    state.values.lives = 3
  
    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.lives.textContent = "x" + state.values.lives;
  
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);

    state.view.Over.classList.remove("over") 
}

function loseLife(){
    state.values.lives--;
    state.view.lives.textContent = "x" + state.values.lives;

    if(state.values.lives <= 0){
        gameOver();
    }
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        gameOver();
    }
}

function gameOver(){
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    // alert("Game over! O seu resultado foi: " + state.values.result)
    state.view.Over.classList.add("over") 
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });
    
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                loseLife();
            }
        })
    })

}

function initialize (){
    addListenerHitBox()

}

initialize()