var pdb = new PouchDB('dino');

var remoteCouch = false;

function createPouch() {
    var cloud = {
        // _id: new Date().toISOString(),
        _id: "1-2",
        minDistance: 1,
        maxDistance: 2,
        minTop: 3,
        maxTop: 4,
    };
    pdb.put(cloud, function callback(err, result) {
        alert('111');
        if (!err) {
            console.log('Successfully posted a todo!');
        }
    });
}

function add() {
    var cloud = {
        // _id: new Date().toISOString(),
        _id: "1-2",
        minDistance: mindis.value,
        maxDistance: maxdis.value,
        minTop: mintop.value,
        maxTop: maxtop.value,
    };
    editid.value = cloud._id;
    pdb.put(cloud, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a todo!');
        }
    });
}

function get() {
    pdb.get(editid.value).then(function (cloud) {
        console.log(cloud);
    }).catch(function (err) {
        console.log(err);
    });
}

function iddelete() {
    pdb.get(editid.value).then(function (cloud) {
        return pdb.remove(cloud);
    });
}

function getAll() {
    pdb.allDocs({
            include_docs: true
        })
        .then(function (response) {
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
}

// function getLast() {
//     pdb.allDocs({
//             include_docs: true
//         })
//         .then(function (response) {
//             mindis.value = response.rows[response.rows.length - 1].doc.minDistance;
//             maxdis.value = response.rows[response.rows.length - 1].doc.maxDistance;
//             mintop.value = response.rows[response.rows.length - 1].doc.minTop;
//             maxtop.value = response.rows[response.rows.length - 1].doc.maxTop;
//             editid.value = response.rows[response.rows.length - 1].key;
//             // lastname.value = response[0].
//             // FirstName: firstname.value,
//             // MiddleName: middlename.value,
//             console.log(response);
//         }).catch(function (err) {
//             console.log(err);
//         });
// }

function update() {
    pdb.get(editid.value).then(function (cloud) {
        // update their age
        cloud.minDistance = mindis.value;
        cloud.maxDistance = maxdis.value;
        cloud.minTop = mintop.value;
        cloud.maxTop = maxtop.value;
        // put them back
        return pdb.put(cloud);
    }).then(function () {
        // fetch mittens again
        return pdb.get(editid.value);
    }).then(function (cloud) {
        mindis.value = cloud.minDistance;
        maxdis.value = cloud.maxDistance;
        mintop.value = cloud.minTop;
        maxtop.value = cloud.maxTop;
        editid.value = cloud._id;
        console.log(cloud);
    });
}