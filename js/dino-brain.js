import {NeuralNetwork} from './neuro-net.js';

import {settings} from './settings.js';

var pdb = new PouchDB('dino');

export let bestDinoBrain; // = new NeuralNetwork(settings.currentTopology);


getBestDinoBrain(settings.currentTopology);

export function getBestDinoBrain(currentTopology) {
    bestDinoBrain = new NeuralNetwork(currentTopology);
    bestDinoBrain.cost = -Infinity;

    pdb.get(currentTopology.join('-')).then(function (bestDinoBrainDB) {
        bestDinoBrain.sections.forEach((item, index) => item.weights = bestDinoBrainDB.sections[index].weights);
        //bestDinoBrain.sections.weights = bestDinoBrainDB.sections.weights;
        bestDinoBrain.cost = bestDinoBrainDB.cost;
        bestDinoBrain._id = bestDinoBrainDB._id;
        console.log(bestDinoBrainDB);
    }).catch(function (err) {
        console.log(err);
        bestDinoBrain._id = currentTopology.join('-');
        saveBestDinoBrain(settings.currentTopology);
    });
}

export function clearBestDinoBrain(currentTopology) {
    bestDinoBrain = {...new NeuralNetwork(currentTopology), _id: bestDinoBrain._id};
    bestDinoBrain.cost = -Infinity;
    pdb.put(bestDinoBrain, function callback(err, result) {
        if (!err) {
            console.log('Can\'t clear bestDinoBrain');
        }
    });
}

export function saveBestDinoBrain(currentTopology) {
    pdb.put(bestDinoBrain, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a todo!');
        }
    });
}
// bestDinoBrain.cost = -Infinity;

export function changeBestDinoBrain(dinoBrain) {
    if (dinoBrain.cost > bestDinoBrain.cost) {
        bestDinoBrain.cost = dinoBrain.cost;
        bestDinoBrain.clone(dinoBrain);
        saveBestDinoBrain(settings.currentTopology);
    }
}
