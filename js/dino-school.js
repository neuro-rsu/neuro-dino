import {randomInteger} from './utils.js';
import {settings} from './settings.js';
import {loadSettings} from "./settings.js";
import {isIntersect} from './utils.js';
import {createPolygon} from './utils.js';
import { DinoFactory } from "./neuro-dino.js";
import { regDino } from "./reg-dino.js";

import {changeBestDinoBrain, createBestDinoBrain} from './dino-brain.js'

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

async function initDinoSchool() {
    await loadSettings();
    await createBestDinoBrain();
    fetch("images/cactus.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        const newTemplate = document.createElement('template');
        newTemplate.setAttribute('id', 'big-cactus');
        newTemplate.innerHTML = svg;
        gameSpace.append(newTemplate);
        createPolygon(newTemplate.content.querySelector('svg'), 'path', '',
         'big-cactus');
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

        createPolygon(newTemplate.content.querySelector('svg'), '', 'pterodactyl', 'pterodactyl');
        createPolygon(newTemplate.content.querySelector('svg'), '', 'top-wing', 'pterodactyl-top-wing');
        createPolygon(newTemplate.content.querySelector('svg'), '', 'bottom-wing', 'pterodactyl-bottom-wing');
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

    fetch("images/dino.svg")
    .then(response => response.text())
    .then(svg => {
        const gameSpace = document.getElementById('game-space');
        const newTemplate = document.createElement('template');
        newTemplate.setAttribute('id', 'dino');
        newTemplate.innerHTML = `
        <style>
            .hidden {
                display: none;
            }
        </style>
        `;
        newTemplate.innerHTML += svg;
        gameSpace.append(newTemplate);
        createPolygon(newTemplate.content.querySelector('svg'), '', 'body', 'dino-body');
        createPolygon(newTemplate.content.querySelector('svg'), '', 'first-leg', 'dino-first-leg');
        createPolygon(newTemplate.content.querySelector('svg'), '', 'second-leg', 'dino-second-leg');
        createPolygon(newTemplate.content.querySelector('svg'), '', 'third-leg', 'dino-third-leg');
        createPolygon(newTemplate.content.querySelector('svg'), '', 'fourth-leg', 'dino-fourth-leg');
        regDino();
        createPopulation();
        scoreID = setInterval(() => {
            let score = document.getElementById('score').textContent;
            score =+score + 1;
            document.getElementById('score').textContent = score;
        }, 100);
        requestAnimationFrame(checkDinos);
    });
}

initDinoSchool();

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

        dino.getElementById('big-eye').setAttribute('visibility', 'hidden');
        dino.getElementById('small-eye').setAttribute('visibility', 'visible');
        dino.getElementById('month').setAttribute('visibility', 'hidden');
        dino.unpauseAnimations();
        dino.style.animationPlayState="running";

        let clouds = document.querySelectorAll('.clouds');
        clouds.forEach(cloud => cloud.style.animationPlayState="running");

        let cactusesAll = document.querySelectorAll('.cactuses');
        cactusesAll.forEach(cactus => cactus.remove());

        let grounds = document.querySelectorAll('.grounds');
        grounds.forEach(ground => ground.style.animationPlayState="running");

        let bumps = document.querySelectorAll('.bumps');
        bumps.forEach(bump => bump.style.animationPlayState="running");

        let pterodactyls = document.querySelectorAll('.pterodactyls');
        pterodactyls.forEach(pterodactyl => pterodactyl.remove());

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
        requestAnimationFrame(checkDino);
    }
    else {
        dino.classList.add("dino-jump");
        dino.pauseAnimations();
        dino.getAnimations().forEach((anim, i, arr) => {
            anim.onfinish = () => {
                dino.classList.remove("dino-jump");
                dino.unpauseAnimations();
            }
        });
    }
}

function checkDinos(){
    cloudDistance++;
    settings.cloud.distance.min = 1;

    if (cloudDistance > nextCloudDistance) {
        cloudDistance = 0;
        createCloud();
        nextCloudDistance = randomInteger(settings.cloud.distance.min,
            settings.cloud.distance.max);
    }

    cactusDistance++;
    if (cactusDistance > nextCactusDistance) {
        cactusDistance = 0;
        createCactus();
        nextCactusDistance = randomInteger(settings.cactus.distance.min,
            settings.cactus.distance.max);
    }

    pterodactylDistance++;
    if (pterodactylDistance > nextPterodactylDistance) {
        pterodactylDistance = 0;
        createPterodactyl();
        nextPterodactylDistance = randomInteger(settings.pterodactyl.distance.min, settings.pterodactyl.distance.max);
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

    // nightDistance++;
    // if (nightDistance > nextNightDistance) {
    //     nightDistance = -settings.night.length.min;
    //     nightBegin();
    //     nextNightDistance = randomInteger(settings.night.distance.min, settings.night.distance.max);
    // }

    // if (nightDistance === 0)
    // {
    //     nightEnd();
    // }



    let dinos = document.querySelectorAll('neuro-dino');
    if ( dinos.length === 0 ) {
        requestAnimationFrame(checkDinos);
        return;
    }
    let dinoCoords = dinos[0].getBoundingClientRect();

    let cactuses = document.querySelectorAll('.cactuses');
    if ( cactuses.length == 0 ) {
        requestAnimationFrame(checkDinos);
        return;
    }

    let cactusCoords;
    let cactus;
    for (var i = 0; i < cactuses.length; ++i) {
        const Coords = cactuses[i].getBoundingClientRect();
        if (Coords.x + Coords.width >= dinoCoords.x  &&
           (!cactus || Coords.x < cactusCoords.x)) {
                cactus = cactuses[i];
                cactusCoords = Coords;
        }
    }

    if ( !cactus) {
        requestAnimationFrame(checkDinos);
        return;
    }

    dinos.forEach( dino => {
        if ( dino.check(cactus, cactusCoords) ) {
            dino.dinoBrain.cost = +document.getElementById('score').textContent;
            changeBestDinoBrain(dino.dinoBrain);
            dino.remove();
        }
        else {
            dino.jump(cactus, cactusCoords);
        }
    })

    dinos = document.querySelectorAll('neuro-dino');

    if ( dinos.length === 0 ) {
        cactus.remove();
    }

    if ( dinos.length === 0 )
    {
        createPopulation();
    }

    requestAnimationFrame(checkDinos);
 }

// function checkDinos(){
//     cloudDistance++;

//     if (cloudDistance > nextCloudDistance) {
//         cloudDistance = 0;
//         createCloud();
//         nextCloudDistance = randomInteger(settings.cloud.distance.min, settings.cloud.distance.max);
//     }


//     cactusDistance++;
//     if (cactusDistance > nextCactusDistance) {
//         cactusDistance = 0;
//         createCactus();
//         nextCactusDistance = randomInteger(settings.cactus.distance.min, settings.cactus.distance.max);
//     }

//     let cactuses = document.querySelectorAll('.cactuses');
//     if ( cactuses.length !== 0 ) {
//         let dinos = document.querySelectorAll('neuro-dino');
//         let cactus;
//         let index = 0;
//         if (dinos.length !== 0) {
//             let dinoCoords = dinos[0].getBoundingClientRect();
//             index = 0;
//             let cactusCoords;
//             do {
//                 cactus = cactuses[index];
//                 cactusCoords = cactus.getBoundingClientRect();
//                 index++;
//             } while ( cactusCoords.x + cactusCoords.width < dinoCoords.x )
//             dinos.forEach( dino => {
//                 if ( dino.check(cactus, cactusCoords) ) {
//                     dino.dinoBrain.cost = +document.getElementById('score').textContent;
//                     changeBestDinoBrain(dino.dinoBrain);
//                     dino.remove();
//                 }
//                 else {
//                     dino.jump(cactus, cactusCoords);
//                 }
//             })
//             dinos = document.querySelectorAll('neuro-dino');
//             if ( dinos.length === 0 ) {
//                 cactus.remove();
//             }
//         }
//         if ( dinos.length === 0 )
//         {
//             createPopulation();
//         }
//     }

//     //         cactusesAll.forEach(cactus => {
//     //             cactus.style.animationPlayState="paused";

//     //         });
//     requestAnimationFrame(checkDinos);
// }

function createCloud(){
    if (settings.cloud.hidden) {
        return;
    }
    let cloudTemp = document.querySelector('#cloud');
    let newCloud = cloudTemp.content.cloneNode(true);
    const gameSpace = document.getElementById('game-space');
    gameSpace.append(newCloud);
    newCloud = gameSpace.lastChild;
    newCloud.style.top = randomInteger(settings.cloud.distance.min,
        settings.cloud.distance.max) + 'px';
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

function createGround(){
    if (settings.ground.hidden) {
        return;
    }
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

function createBumps(){
    if (settings.bumps.hidden) {
        return;
    }
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

function createPterodactyl(){
    if (settings.pterodactyl.hidden) {
        return;
    }
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
    if (settings.moon.hidden) {
        return;
    }
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
    if (settings.star.hidden) {
        return;
    }
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

// let request;

// let stepX = 10;
// let stepY = 10;

// const performAnimation = () => {
//     const dinos = document.querySelectorAll('neuro-dino');

//     dinos.forEach( (bird) =>
//         dinos.move()
//     )

//     if ( dinos.length === 0 )
//     {
//         createPopulation();
//     }

//     request = requestAnimationFrame(performAnimation);
// };

// request = requestAnimationFrame(performAnimation);

function createPopulation() {
    document.getElementById('score').textContent = '0';
    for (let i = 0; i < settings.dinoPopulationCount; i++) {
        const newDino = document.createElement('neuro-dino');
        window['game-space'].append(newDino);
    }
    scoreID = 0;
}

// createPopulation();
