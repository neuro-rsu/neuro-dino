import {NeuralNetwork} from './neuro-net.js';

import {settings} from './settings.js';

var pdb = new PouchDB('dino');

export let bestDinoBrain; // = new NeuralNetwork(settings.currentTopology);

//await createBestDinoBrain();

export async function createBestDinoBrain() {
    bestDinoBrain = new NeuralNetwork(settings.topology);
    bestDinoBrain.cost = -Infinity;

    await pdb.get(settings.topology.join('-')).then(function (bestDinoBrainDB) {
        bestDinoBrain.sections.forEach((item, index) => item.weights = bestDinoBrainDB.sections[index].weights);
        bestDinoBrain.cost = bestDinoBrainDB.cost;
        // console.log(bestDinoBrainDB);
    }).catch(function (err) {
        // console.log(err);
        bestDinoBrain._id = settings.topology.join('-');
        return pdb.put(bestDinoBrain);
    }).catch( err => {
        console.log(`Can't add bestDinoBrain ${err}`);
    });
}

export async function clearBestDinoBrain() {
    bestDinoBrain = new NeuralNetwork(settings.topology);
    bestDinoBrain.cost = -Infinity;

    await pdb.get(settings.topology.join('-')).then(function (bestDinoBrainDB) {
        bestDinoBrain._id = bestDinoBrainDB._id;
        bestDinoBrain._rev = bestDinoBrainDB._rev;
        return pdb.put(bestDinoBrain);
        // console.log(bestDinoBrainDB);
    }).catch( err => {
        console.log(`Can't clear bestDinoBrain ${err}`);
    });
}

// export function addBestDinoBrain() {
//     pdb.put(bestDinoBrain, function callback(err, result) {
//         if (!err) {
//             console.log('Successfully posted a todo!');
//         }
//     });
// }

export async function addBestDinoBrain() {
    await pdb.put(bestDinoBrain).then( bestDinoBrainDB => {
        bestDinoBrain._rev = bestDinoBrainDB._rev;
        console.log('Successfully add bestDinoBrain!');
    }).catch( err => {
        console.log(`Can't add bestDinoBrain ${err}`);
    });
}
// bestDinoBrain.cost = -Infinity;

export async function changeBestDinoBrain(dinoBrain) {
    if (dinoBrain.cost > bestDinoBrain.cost) {
        bestDinoBrain = dinoBrain.clone(dinoBrain);
        bestDinoBrain.cost = dinoBrain.cost;
        await saveBestDinoBrain();
    }
}

async function saveBestDinoBrain() {
    await pdb.get(settings.topology.join('-')).then(function (bestDinoBrainDB) {
        bestDinoBrain._id = bestDinoBrainDB._id;
        bestDinoBrain._rev = bestDinoBrainDB._rev;
        return pdb.put(bestDinoBrain);
        //else if return pdb.put(cloud);
    }).catch( (err) => {
        console.log(`Can't save bestDinoBrain ${err}`);
    });
}

export async function compactDb() {
    pdb.compact();
}

export async function deleteDb() {
    pdb.destroy().then(function () {
        alert("???????? ???????????? ??????????????");
    }).catch(function (err) {
        alert(err);
    })
}

export async function clearDb() {
    pdb.destroy().then( () => "???????? ???????????? ??????????????")
    .catch(err => err)
}