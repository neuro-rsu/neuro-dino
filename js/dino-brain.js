import {NeuralNetwork} from './neuro-net.js';

import {settings} from './settings.js';

var pdb = new PouchDB('dino');

export let bestDinoBrain; // = new NeuralNetwork(settings.currentTopology);

await createBestDinoBrain();

export async function createBestDinoBrain() {
    bestDinoBrain = new NeuralNetwork(settings.currentTopology);
    bestDinoBrain.cost = -Infinity;

    await pdb.get(settings.currentTopology.join('-')).then(function (bestDinoBrainDB) {
        bestDinoBrain.sections.forEach((item, index) => item.weights = bestDinoBrainDB.sections[index].weights);
        bestDinoBrain.cost = bestDinoBrainDB.cost;
        bestDinoBrain._id = bestDinoBrainDB._id;
        bestDinoBrain._rev = bestDinoBrainDB._rev;
        console.log(bestDinoBrainDB);
    }).catch(function (err) {
        console.log(err);
        bestDinoBrain._id = settings.currentTopology.join('-');
        addBestDinoBrain();
    });
}

function clearBestDinoBrain() {
    alert('ddddd');
    bestDinoBrain = new NeuralNetwork(settings.currentTopology);
    bestDinoBrain.cost = -Infinity;
    bestDinoBrain._id = settings.currentTopology.join('-');
    pdb.put(bestDinoBrain, function callback(err, result) {
        if (!err) {
            console.log('Can\'t clear bestDinoBrain');
        }
    });
}

function clearBestDinoBrainDbClick() {
    clearBestDinoBrain(settings.currentTopology);
}

title.addEventListener('dblclick', clearBestDinoBrainDbClick);

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
        bestDinoBrain.cost = dinoBrain.cost;
        bestDinoBrain.clone(dinoBrain);
        await saveBestDinoBrain();
    }
}

async function saveBestDinoBrain() {
    await pdb.get(bestDinoBrain._id).then(function (dinoBrainDB) {
        //if (bestDinoBrain._rev == dinoBrainDB._rev)
        return pdb.put(bestDinoBrain);
        //else if return pdb.put(cloud);
    }).then(function (dinoBrainDB) {
        // fetch mittens again
        return pdb.get(dinoBrainDB.id);
    }).then(function (dinoBrainDB) {
        bestDinoBrain._rev = dinoBrainDB._rev;
    });
}