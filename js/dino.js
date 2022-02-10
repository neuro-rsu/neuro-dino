import {randomInteger} from './utils.js';
import {settings} from './settings.js';
import {isIntersect} from './utils.js';
import {createPolygon} from './utils.js';

let gameOver=false;
let gameStart=false;

let cloudDistance = 0;
let nextCloudDistance = 0;

let cactusDistance = 0;
let nextCactusDistance = 0;

let groundDistance = 0;
let nextGroundDistance = 0;

let pterodactylDistance = 0;
let nextPterodactylDistance = 0;

let bumpsDistance = 0;
let nextBumpsDistance = 0;

let nightDistance = 0;
let nextNightDistance = 150;

function initGame() {
    fetch("images/cactus.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        const newTemplate = document.createElement('template');
        newTemplate.setAttribute('id', 'big-cactus');
        newTemplate.innerHTML = svg;
        gameSpace.append(newTemplate);
        createPolygon(newTemplate.content.querySelector('svg'), 'path', '', 'big-cactus');
    });

    fetch("images/cloud.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        const newTemplate = document.createElement('template');
        newTemplate.setAttribute('id', 'cloud');
        newTemplate.innerHTML = svg;
        gameSpace.append(newTemplate);
    });

    fetch("images/ground.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        const newTemplate = document.createElement('template');
        newTemplate.setAttribute('id', 'ground');
        newTemplate.innerHTML = svg;
        gameSpace.append(newTemplate);

    });

    fetch("images/pterodactyl.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        const newTemplate = document.createElement('template');
        newTemplate.setAttribute('id', 'pterodactyl');
        newTemplate.innerHTML = svg;
        gameSpace.append(newTemplate);
         //

        createPolygon(newTemplate.content.querySelector('svg'), '', 'pterodactyl', 'pterodactyl');
        createPolygon(newTemplate.content.querySelector('svg'), '', 'top-wing', 'pterodactyl-top-wing');
        createPolygon(newTemplate.content.querySelector('svg'), '', 'bottom-wing', 'pterodactyl-bottom-wing');
    });

    fetch("images/dino.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        gameSpace.insertAdjacentHTML('beforeend', svg);
        createPolygon(dino, '', 'body', 'dino-body');
        createPolygon(dino, '', 'first-leg', 'dino-first-leg');
        createPolygon(dino, '', 'second-leg', 'dino-second-leg');
        createPolygon(dino, '', 'third-leg', 'dino-third-leg');
        createPolygon(dino, '', 'fourth-leg', 'dino-fourth-leg');

        createPolygon(dino, '', 'body-bow', 'dino-body-bow');
        createPolygon(dino, '', 'first-leg-bow', 'dino-first-leg-bow');
        createPolygon(dino, '', 'second-leg-bow', 'dino-second-leg-bow');
        createPolygon(dino, '', 'third-leg-bow', 'dino-third-leg-bow');
        createPolygon(dino, '', 'fourth-leg-bow', 'dino-fourth-leg-bow');
    });

    fetch("images/horizon.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        gameSpace.insertAdjacentHTML('beforeend', svg);
    });

    fetch("images/bumps.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        const newTemplate = document.createElement('template');
        newTemplate.setAttribute('id', 'bumps');
        newTemplate.innerHTML = svg;
        gameSpace.append(newTemplate);
    });

    fetch("images/moon.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        const newTemplate = document.createElement('template');
        newTemplate.setAttribute('id', 'moon');
        newTemplate.innerHTML = svg;
        gameSpace.append(newTemplate);
    });


    fetch("images/star1.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        const newTemplate = document.createElement('template');
        newTemplate.setAttribute('id', 'star1');
        newTemplate.innerHTML = svg;
        gameSpace.append(newTemplate);
    });

    fetch("images/star2.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        const newTemplate = document.createElement('template');
        newTemplate.setAttribute('id', 'star2');
        newTemplate.innerHTML = svg;
        gameSpace.append(newTemplate);
    });
}

initGame();

let scoreID;

function dinoJump() {
    if (!gameStart) {
        gameStart = true;

        scoreID = setInterval(() => {
            let score = document.getElementById('score').textContent;
            score =+score + 1;
            document.getElementById('score').textContent = score;
        }, 100);
        requestAnimationFrame(checkDino);
    }
    else if (gameOver) {
        gameOver = false;

        const bow = dino.getElementById('body').classList.contains("hidden") ? '-bow' : '';

        dino.getElementById('big-eye' + bow).setAttribute('visibility', 'hidden');
        dino.getElementById('small-eye' + bow ).setAttribute('visibility', 'visible');
        dino.getElementById('month' + bow).setAttribute('visibility', 'hidden');

        if (bow && !isDown) {
            let itemNames = ['body', 'first-leg', 'second-leg', 'third-leg', 'fourth-leg', 'small-eye'];
            itemNames.forEach(itemName => {
                dino.getElementById(itemName).classList.remove("hidden");
                dino.getElementById(itemName + '-bow').classList.add("hidden");
            });
        }

        dino.unpauseAnimations();
        dino.style.animationPlayState="running";

        let clouds = document.querySelectorAll('.clouds');
        clouds.forEach(cloud => cloud.style.animationPlayState="running");

        let grounds = document.querySelectorAll('.grounds');
        grounds.forEach(ground => ground.style.animationPlayState="running");

        let bumps = document.querySelectorAll('.bumps');
        bumps.forEach(bump => bump.style.animationPlayState="running");

        let pterodactyls = document.querySelectorAll('.pterodactyls');
        pterodactyls.forEach(pterodactyl => pterodactyl.remove());

        let cactusesAll = document.querySelectorAll('.cactuses');
        cactusesAll.forEach(cactus => cactus.remove());

        let moon = document.querySelectorAll('.moon');
        moon.forEach(moon => moon.remove());

        let star = document.querySelectorAll('.star1');
        star.forEach(star => star.remove());

        star = document.querySelectorAll('.star2');
        star.forEach(star => star.remove());

        document.getElementById('score').textContent = '0';
        scoreID = setInterval(() => {
            let score = document.getElementById('score').textContent;
            score =+score + 1;
            document.getElementById('score').textContent = score;
        }, 100);
        gameOver = false;
        requestAnimationFrame(checkDino);
    }
    else {
        dino.classList.add("dino-jump");
        dino.pauseAnimations();
        dino.getAnimations().forEach((anim, i, arr) => {
            anim.onfinish = () => {
                dino.classList.remove("dino-jump");
                dino.offsetHeight;
                dino.unpauseAnimations();
                if (isDown) dinoBow();
            }
        });
    }
}

function dinoKeyDown(e){
    if (e.code === 'Space' && (!dino.getElementById('body').classList.contains("hidden") || gameOver)) {
    // if (e.code === 'Space') {
        dinoJump();
    }
}

function dinoBow() {
    let itemNames = ['body', 'first-leg', 'second-leg', 'third-leg', 'fourth-leg', 'small-eye'];
    itemNames.forEach(itemName => {
        dino.getElementById(itemName).classList.add("hidden");
        dino.getElementById(itemName + '-bow').classList.remove("hidden");
    });
}

function dinoCancelBow() {
    let itemNames = ['body', 'first-leg', 'second-leg', 'third-leg', 'fourth-leg', 'small-eye'];
    itemNames.forEach(itemName => {
        dino.getElementById(itemName).classList.remove("hidden");
        dino.getElementById(itemName + '-bow').classList.add("hidden");
    });
}

let isDown = false;

function dinoArrowDown(e){
    if (e.code === 'ArrowDown')
    {
        isDown = true;
        if (!gameOver && !dino.classList.contains("dino-jump"))
            dinoBow();
    }
}

function dinoArrowUp(e){
    if (e.code === 'ArrowDown') {
        isDown = false;
        if (!gameOver)
            dinoCancelBow();
    }
}

function dinoMouseJump(){
    dinoJump();
}

document.addEventListener('keydown', dinoKeyDown);
document.addEventListener('keydown', dinoArrowDown);
document.addEventListener('keyup', dinoArrowUp);

document.querySelector('#game-space').addEventListener('click', dinoJump);


function checkDino(){
    if(gameOver) return;
    cloudDistance++;
    if (cloudDistance > nextCloudDistance)
    {
        cloudDistance = 0;
        createCloud();
        nextCloudDistance = randomInteger(settings.cloud.distance.min, settings.cloud.distance.max);
    }

    groundDistance++;
    if (groundDistance > nextGroundDistance) {
        groundDistance = 0;
        createGround();
        nextGroundDistance = randomInteger(settings.ground.distance.min, settings.ground.distance.max);
    }

    bumpsDistance++;
    if (bumpsDistance > nextBumpsDistance) {
        bumpsDistance = 0;
        createBumps();
        nextBumpsDistance = randomInteger(settings.bumps.distance.min, settings.bumps.distance.max);
    }

    pterodactylDistance++;
    // if (pterodactylDistance > nextPterodactylDistance) {
    //     pterodactylDistance = 0;
    //     createPterodactyl();
    //     nextPterodactylDistance = randomInteger(settings.pterodactyl.distance.min, settings.pterodactyl.distance.max);
    // }

    nightDistance++;
    if (nightDistance > nextNightDistance) {
        nightDistance = -settings.night.length.min;
        nightBegin();
        nextNightDistance = randomInteger(settings.night.distance.min, settings.night.distance.max);
    }

    if (nightDistance === 0)
    {
        nightEnd();
    }

    if(!gameStart) return;

    cactusDistance++;
    // if (cactusDistance > nextCactusDistance) {
    //     cactusDistance = 0;
    //     createCactus();
    //     nextCactusDistance = randomInteger(settings.cactus.distance.min, settings.cactus.distance.max);
    // }

    if (pterodactylDistance > nextPterodactylDistance || cactusDistance > nextCactusDistance ) {
        pterodactylDistance = 0;
        cactusDistance = 0;
        if (Math.random() < 0.3) {
            createPterodactyl();
        }
        else {
            createCactus();
        }
        nextPterodactylDistance = randomInteger(settings.pterodactyl.distance.min, settings.pterodactyl.distance.max);
        nextCactusDistance = randomInteger(settings.cactus.distance.min, settings.cactus.distance.max);
    }


    let cactuses = document.querySelectorAll('.cactuses');
    cactuses.forEach(cactus => {
        let cactusCoords = cactus.getBoundingClientRect();
        if (isIntersect(dino, cactus, 'big-cactus'))
        {
            gameOver = true;
            clearInterval(scoreID);

            const clouds = document.querySelectorAll('.clouds');
            clouds.forEach(cloud => {
                cloud.style.animationPlayState="paused";
            });

            const cactusesAll = document.querySelectorAll('.cactuses');
            cactusesAll.forEach(cactus => {
                cactus.style.animationPlayState="paused";
            });

            const grounds = document.querySelectorAll('.grounds');
            grounds.forEach(ground => {
                ground.style.animationPlayState="paused";
            });

            const bumps = document.querySelectorAll('.bumps');
            bumps.forEach(bump => {
                bump.style.animationPlayState="paused";
            });

            const pterodactyls = document.querySelectorAll('.pterodactyls');
            pterodactyls.forEach(pterodactyl => {
                pterodactyl.style.animationPlayState="paused";
                pterodactyl.pauseAnimations();
            });

            const moon = document.querySelectorAll('.moon');
            moon.forEach(moon => {
                moon.style.animationPlayState="paused";
            });

            let star = document.querySelectorAll('.star1');
            star.forEach(star => {
                star.style.animationPlayState="paused";
            });

            star = document.querySelectorAll('.star2');
            star.forEach(star => {
                star.style.animationPlayState="paused";
            });

            dino.style.animationPlayState="paused";
            dino.pauseAnimations();
            const bow = dino.getElementById('body').classList.contains("hidden") ? "-bow" : "";
            dino.getElementById('big-eye' + bow).setAttribute('visibility', 'visible');
            dino.getElementById('small-eye' + bow ).setAttribute('visibility', 'hidden');
            dino.getElementById('month' + bow).setAttribute('visibility', 'visible');
        }
    })

    let pterodactyls = document.querySelectorAll('.pterodactyls');
    pterodactyls.forEach(pterodactyl => {
        if ((isIntersect(dino, pterodactyl, 'pterodactyl') || (
            getComputedStyle(pterodactyl.getElementById('top-wing')).visibility === 'visible' ?
            isIntersect(dino, pterodactyl, 'pterodactyl-top-wing') :
            isIntersect(dino, pterodactyl, 'pterodactyl-bottom-wing'))))
        {
            gameOver = true;
            clearInterval(scoreID);

            const clouds = document.querySelectorAll('.clouds');
            clouds.forEach(cloud => {
                cloud.style.animationPlayState="paused";
            });

            const cactusesAll = document.querySelectorAll('.cactuses');
            cactusesAll.forEach(cactus => {
                cactus.style.animationPlayState="paused";
            });

            const grounds = document.querySelectorAll('.grounds');
            grounds.forEach(ground => {
                ground.style.animationPlayState="paused";
            });

            const bumps = document.querySelectorAll('.bumps');
            bumps.forEach(bump => {
                bump.style.animationPlayState="paused";
            });

            const pterodactyls = document.querySelectorAll('.pterodactyls');
            pterodactyls.forEach(pterodactyl => {
                pterodactyl.style.animationPlayState="paused";
                pterodactyl.pauseAnimations();
            });

            const moon = document.querySelectorAll('.moon');
            moon.forEach(moon => {
                moon.style.animationPlayState="paused";
            });

            let star = document.querySelectorAll('.star1');
            star.forEach(star => {
                star.style.animationPlayState="paused";
            });

            star = document.querySelectorAll('.star2');
            star.forEach(star => {
                star.style.animationPlayState="paused";
            });

            dino.style.animationPlayState="paused";
            dino.pauseAnimations();
            const bow = dino.getElementById('body').classList.contains("hidden") ? "-bow" : "";
            dino.getElementById('big-eye' + bow).setAttribute('visibility', 'visible');
            dino.getElementById('small-eye' + bow ).setAttribute('visibility', 'hidden');
            dino.getElementById('month' + bow).setAttribute('visibility', 'visible');
        }
    })
    requestAnimationFrame(checkDino);
}

function createCloud(){
    let cloudTemp = document.querySelector('#cloud');
    let newCloud = cloudTemp.content.cloneNode(true);
    const gameSpace = document.getElementById('game-space');
    gameSpace.append(newCloud);
    newCloud = gameSpace.lastChild;
    newCloud.style.top = randomInteger(settings.cloud.distance.min, settings.cloud.distance.max) + 'px';
    newCloud.getAnimations().forEach((anim, i, arr) => {
        anim.onfinish = () => {
            newCloud.remove();
        };
    });
}

function createCactus(){
    let dist = randomInteger(settings.cactus.distance.min, settings.cactus.distance.max);
    const gameSpace = document.getElementById('game-space');
    let topSet = document.querySelector('#big-cactus');
    let newCactus = topSet.content.cloneNode(true);
    //newCactus.querySelector('svg').style.top = '200px';

    gameSpace.append(newCactus);

    newCactus = gameSpace.lastChild;
    newCactus.getAnimations().forEach((anim, i, arr) => {
        anim.onfinish = () => {
            newCactus.remove();
        };
    });
}

export function createGround(){
    let groundTemp = document.querySelector('#ground');
    let newGround = groundTemp.content.cloneNode(true);
    const gameSpace = document.getElementById('game-space');
    const groundPaths = newGround.querySelectorAll('path');
    groundPaths[randomInteger(0, groundPaths.length - 1)].setAttribute('visibility', 'visible');
    gameSpace.append(newGround);
    newGround = gameSpace.lastChild;
    newGround.style.top = randomInteger(settings.ground.top.min, settings.ground.top.max) + 'px';
    newGround.getAnimations().forEach((anim, i, arr) => {
        anim.onfinish = () => {
            newGround.remove();
        };
    });
}

export function createBumps(){
    let bumpsTemp = document.querySelector('#bumps');
    let newBumps = bumpsTemp.content.cloneNode(true);
    const gameSpace = document.getElementById('game-space');
    const bumpsPaths = newBumps.querySelectorAll('path');
    if (randomInteger(2, bumpsPaths.length - 1) === 2) {
        bumpsPaths[0].setAttribute('visibility', 'visible');
        bumpsPaths[2].setAttribute('visibility', 'visible');
    }
    else {
        bumpsPaths[1].setAttribute('visibility', 'visible');
        bumpsPaths[3].setAttribute('visibility', 'visible');
    };
    gameSpace.append(newBumps);
    newBumps = gameSpace.lastChild;
    newBumps.getAnimations().forEach((anim, i, arr) => {
        anim.onfinish = () => {
            newBumps.remove();
        };
    });
}

export function createPterodactyl(){

    let pterodactylTemp = document.querySelector('#pterodactyl');
    let newPterodactyl = pterodactylTemp.content.cloneNode(true);
    const gameSpace = document.getElementById('game-space');

    gameSpace.append(newPterodactyl);
    newPterodactyl = gameSpace.lastChild;
    newPterodactyl.style.top = randomInteger(settings.pterodactyl.top.min, settings.pterodactyl.top.max) + 'px';
    newPterodactyl.getAnimations().forEach((anim, i, arr) => {
        anim.onfinish = () => {
            newPterodactyl.remove();
        };
    });
}

function createMoon(){
    let moonTemp = document.querySelector('#moon');
    let newMoon = moonTemp.content.cloneNode(true);
    const gameSpace = document.getElementById('game-space');
    gameSpace.append(newMoon);
    newMoon = gameSpace.lastChild;
    newMoon.style.top = randomInteger(settings.moon.top.min, settings.moon.top.max) + 'px';
    newMoon.getAnimations().forEach((anim, i, arr) => {
        anim.onfinish = () => {
            newMoon.remove();
            nightEnd();
        };
    });
}


function createStar(name, className){
    let nodeTemp = document.querySelector('#'+name);
    let newNode = nodeTemp.content.cloneNode(true);
    const gameSpace = document.getElementById('game-space');
    gameSpace.append(newNode);
    newNode = gameSpace.lastChild;
    newNode.classList.add(className);
    newNode.offsetHeight;

    newNode.style.top = randomInteger(settings.star.top.min, settings.star.top.max) + 'px';
    newNode.getAnimations().forEach((anim, i, arr) => {
        anim.onfinish = () => {
            newNode.remove();
            setTimeout( () => {
                createStar(name, 'star3');
            }, 0);
        };
    });
    return newNode;
}

function nightBegin() {
    createMoon();
    createStar('star1', 'star1');
    createStar('star2', 'star2');

    let clouds = document.querySelectorAll('.clouds');
    clouds.forEach(cloud => cloud.classList.add('night'));

    let cactuses = document.querySelectorAll('.cactuses');
    cactuses.forEach(cactus => cactus.classList.add('night'));

    let pterodactyls = document.querySelectorAll('.pterodactyls');
    pterodactyls.forEach(pterodactyl => pterodactyl.classList.add('night'));

    let grounds = document.querySelectorAll('.grounds');
    grounds.forEach(ground => ground.classList.add('night'));

    let bumps = document.querySelectorAll('.bumps');
    bumps.forEach(bump => bump.classList.add('night'));

    let horizon = document.querySelectorAll('.horizon');
    horizon.forEach(horizon => horizon.classList.add('night'));

    let dinos = document.querySelectorAll('.dinos');
    dinos.forEach(dino => dino.classList.add('night'));

    document.getElementById('game-space').classList.add('night');
}

function nightEnd() {
    let moon = document.querySelectorAll('.moon');
    moon.forEach(moon => moon.remove());

    let star = document.querySelectorAll('.star1');
    star.forEach(star => star.remove());

    star = document.querySelectorAll('.star2');
    star.forEach(star => star.remove());

    let clouds = document.querySelectorAll('.clouds');
    clouds.forEach(cloud => cloud.classList.remove('night'));

    let cactuses = document.querySelectorAll('.cactuses');
    cactuses.forEach(cactus => cactus.classList.remove('night'));

    let pterodactyls = document.querySelectorAll('.pterodactyls');
    pterodactyls.forEach(pterodactyl => pterodactyl.classList.remove('night'));

    let grounds = document.querySelectorAll('.grounds');
    grounds.forEach(ground => ground.classList.remove('night'));

    let bumps = document.querySelectorAll('.bumps');
    bumps.forEach(bump => bump.classList.remove('night'));

    let horizon = document.querySelectorAll('.horizon');
    horizon.forEach(horizon => horizon.classList.remove('night'));

    let dinos = document.querySelectorAll('.dinos');
    dinos.forEach(dino => dino.classList.remove('night'));

    document.getElementById('game-space').classList.remove('night');
}
