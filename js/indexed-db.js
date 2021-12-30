let db;

let openRequest = indexedDB.open("test", 1);

openRequest.onsuccess = function(event) {
    console.log("open db --- onsuccess");
    db = event.target.result;
}

openRequest.onerror = function(event) {
    console.log("open db --- onerror");
    console.log("Ошибка открытия БД");
    db = event.target.result;
}

openRequest.onupgradeneeded = function (event)
{
 db = event.target.result;
 if (!db.objectStoreNames.contains("cloud")) {
    db.createObjectStore("cloud", {
        keyPath: "id",
        autoIncrement: true
    })
 }
}

function save(){
    let transaction = db.transaction("cloud","readwrite");
    let cloudTable = transaction.objectStore("cloud");

    let cloud = {
        distanceMin: min.value,
        distanceMax: max.value,
        topMin: min.value,
        topMax: max.value,

    };

    let request = cloudTable.add(cloud);
    console.dir(request);

    request.onsuccess = function() {
        console.log("Запись сохранилась успешно");
    };

    request.onerror = function(event) {
        console.log("Ошибка записи", event.target.error);
    };

}

    function IDdelete(){
        let transaction = db.transaction("cloud", "readwrite");
        let cloudTable = transaction.objectStore("cloud");
        let key = +editid.value;
        cloudTable.delete(key);
        transaction.oncomplete = function() {
                alert(111);
            };
            console.log('Item deleted')
    }

    function update(){
        let transaction = db.transaction("cloud", "readwrite");
        let cloudTable = transaction.objectStore("cloud");
        let cloud = {
            distanceMin: min.value,
            distanceMax: max.value,
            topMin: min.value,
            topMax: max.value,
            id: +editid.value,
        };
        cloudTable.put(cloud);
        console.log('Item updated')
    }

    function allCLOUD(){
        let transaction = db.transaction("cloud", "readwrite");
        let cloudTable = transaction.objectStore("cloud");
        cloudTable.getAll().onsuccess = function(event) {
            const allRecords = event.target.result;
            allRecords.forEach(record => {
                console.log('distanceMin' + record.min);
                console.log('distanceMax' + record.max);
                console.log('topMin' + record.min);
                console.log('topMax' + record.max);
            })
            console.log(JSON.stringify(event.target.result));
        };
    }

    function get(){
        let transaction = db.transaction("cloud", "readwrite");
        let cloudTable = transaction.objectStore("cloud");
        let key = +editid.value;
        var objectStoreRequest = cloudTable.get(key);
        objectStoreRequest.onsuccess = function(event) {
            let result = event.target.result;
            min.value = result.distanceMin;
            max.value = result.distanceMax;
            min.value = result.topMin;
            max.value = result.topMax;
            alert(JSON.stringify(event.target.result))
        };
    }
//////////////////////////////////////////////////////////////////////////////////////
openRequest.onupgradeneeded = function (event){
 db = event.target.result;
 if (!db.objectStoreNames.contains("cactus")) {
    db.createObjectStore("cactus", {
        keyPath: "id",
        autoIncrement: true
    })
 }
}

function save(){
    let transaction = db.transaction("cactus","readwrite");
    let cactusTable = transaction.objectStore("cactus");

    let cactus = {
        distanceMin: min.value,
        distanceMax: max.value,

    };

    let request = cactusTable.add(cactus);
    console.dir(request);

    request.onsuccess = function() {
        console.log("Запись сохранилась успешно");
    };

    request.onerror = function(event) {
        console.log("Ошибка записи", event.target.error);
    };

}

function IDdelete(){
    let transaction = db.transaction("cactus", "readwrite");
    let cactusTable = transaction.objectStore("cactus");
    let key = +editid.value;
    cactusTable.delete(key);
    transaction.oncomplete = function() {
            alert(111);
        };
        console.log('Item deleted')
}

function update(){
    let transaction = db.transaction("cactus", "readwrite");
    let cactusTable = transaction.objectStore("cactus");
    let cactus = {
        distanceMin: min.value,
        distanceMax: max.value,
        id: +editid.value,
    };
    cactusTable.put(cactus);
    console.log('Item updated')
}

function allCactus(){
    let transaction = db.transaction("cactus", "readwrite");
    let cactusTable = transaction.objectStore("cactus");
    cactusTable.getAll().onsuccess = function(event) {
        const allRecords = event.target.result;
        allRecords.forEach(record => {
            console.log('distanceMin' + record.min);
            console.log('distanceMax' + record.max);
        })
        console.log(JSON.stringify(event.target.result));
    };
}

function get(){
    let transaction = db.transaction("cactus", "readwrite");
    let cactusTable = transaction.objectStore("cactus");
    let key = +editid.value;
    var objectStoreRequest = cactusTable.get(key);
    objectStoreRequest.onsuccess = function(event) {
        let result = event.target.result;
        min.value = result.distanceMin;
        max.value = result.distanceMax;
        alert(JSON.stringify(event.target.result))
    };
}
// ///////////////////////////////////////////////////////////////////
openRequest.onupgradeneeded = function (event)
{
 db = event.target.result;
 if (!db.objectStoreNames.contains("ground")) {
    db.createObjectStore("ground", {
        keyPath: "id",
        autoIncrement: true
    })
 }
}

function save(){
    let transaction = db.transaction("ground","readwrite");
    let groundTable = transaction.objectStore("ground");

    let ground = {
        distanceMin: min.value,
        distanceMax: max.value,
        topMin: min.value,
        topMax: max.value,

    };

    let request = groundTable.add(ground);
    console.dir(request);

    request.onsuccess = function() {
        console.log("Запись сохранилась успешно");
    };

    request.onerror = function(event) {
        console.log("Ошибка записи", event.target.error);
    };

}

    function IDdelete(){
        let transaction = db.transaction("ground", "readwrite");
        let groundTable = transaction.objectStore("ground");
        let key = +editid.value;
        groundTable.delete(key);
        transaction.oncomplete = function() {
                alert(111);
            };
            console.log('Item deleted')
    }

    function update(){
        let transaction = db.transaction("ground", "readwrite");
        let groundTable = transaction.objectStore("ground");
        let ground = {
            distanceMin: min.value,
            distanceMax: max.value,
            topMin: min.value,
            topMax: max.value,
            id: +editid.value,
        };
        groundTable.put(ground);
        console.log('Item updated')
    }

    function allGround(){
        let transaction = db.transaction("ground", "readwrite");
        let groundTable = transaction.objectStore("ground");
        groundTable.getAll().onsuccess = function(event) {
            const allRecords = event.target.result;
            allRecords.forEach(record => {
                console.log('distanceMin' + record.min);
                console.log('distanceMax' + record.max);
                console.log('topMin' + record.min);
                console.log('topMax' + record.max);
            })
            console.log(JSON.stringify(event.target.result));
        };
    }

    function get(){
        let transaction = db.transaction("ground", "readwrite");
        let groundTable = transaction.objectStore("ground");
        let key = +editid.value;
        var objectStoreRequest = groundTable.get(key);
        objectStoreRequest.onsuccess = function(event) {
            let result = event.target.result;
            min.value = result.distanceMin;
            max.value = result.distanceMax;
            min.value = result.topMin;
            max.value = result.topMax;
            alert(JSON.stringify(event.target.result))
        };
    }
//////////////////////////////////////////////////////////////////////////////

    openRequest.onupgradeneeded = function (event)
{
 db = event.target.result;
 if (!db.objectStoreNames.contains("bumps")) {
    db.createObjectStore("bumps", {
        keyPath: "id",
        autoIncrement: true
    })
 }
}

function save(){
    let transaction = db.transaction("bumps","readwrite");
    let bumpsTable = transaction.objectStore("bumps");

    let bumps = {
        distanceMin: min.value,
        distanceMax: max.value,
    };

    let request = bumpsTable.add(bumps);
    console.dir(request);

    request.onsuccess = function() {
        console.log("Запись сохранилась успешно");
    };

    request.onerror = function(event) {
        console.log("Ошибка записи", event.target.error);
    };

}

    function IDdelete(){
        let transaction = db.transaction("bumps", "readwrite");
        let bumpsTable = transaction.objectStore("bumps");
        let key = +editid.value;
        bumpsTable.delete(key);
        transaction.oncomplete = function() {
                alert(111);
            };
            console.log('Item deleted')
    }

    function update(){
        let transaction = db.transaction("bumps", "readwrite");
        let bumpsTable = transaction.objectStore("bumps");
        let bumps = {
            distanceMin: min.value,
            distanceMax: max.value,
            id: +editid.value,
        };
        bumpsTable.put(bumps);
        console.log('Item updated')
    }

    function allBumps(){
        let transaction = db.transaction("bumps", "readwrite");
        let bumpsTable = transaction.objectStore("bumps");
        bumpsTable.getAll().onsuccess = function(event) {
            const allRecords = event.target.result;
            allRecords.forEach(record => {
                console.log('distanceMin' + record.min);
                console.log('distanceMax' + record.max);
            })
            console.log(JSON.stringify(event.target.result));
        };
    }

    function get(){
        let transaction = db.transaction("bumps", "readwrite");
        let bumpsTable = transaction.objectStore("bumps");
        let key = +editid.value;
        var objectStoreRequest = bumpsTable.get(key);
        objectStoreRequest.onsuccess = function(event) {
            let result = event.target.result;
            min.value = result.distanceMin;
            max.value = result.distanceMax;
            alert(JSON.stringify(event.target.result))
        };
    }
/////////////////////////////////////////////////////////////////////////

openRequest.onupgradeneeded = function (event)
{
 db = event.target.result;
 if (!db.objectStoreNames.contains("moon")) {
    db.createObjectStore("moon", {
        keyPath: "id",
        autoIncrement: true
    })
 }
}

function save(){
    let transaction = db.transaction("moon","readwrite");
    let moonTable = transaction.objectStore("moon");

    let moon = {
        distanceMin: min.value,
        distanceMax: max.value,
        topMin: min.value,
        topMax: max.value,

    };

    let request = moonTable.add(moon);
    console.dir(request);

    request.onsuccess = function() {
        console.log("Запись сохранилась успешно");
    };

    request.onerror = function(event) {
        console.log("Ошибка записи", event.target.error);
    };

}
function IDdelete(){
    let transaction = db.transaction("moon", "readwrite");
    let moonTable = transaction.objectStore("moon");
    let key = +editid.value;
    moonTable.delete(key);
    transaction.oncomplete = function() {
            alert(111);
        };
    console.log('Item deleted')
    }

    function update(){
        let transaction = db.transaction("moon", "readwrite");
        let moonTable = transaction.objectStore("moon");
        let moon = {
            distanceMin: min.value,
            distanceMax: max.value,
            topMin: min.value,
            topMax: max.value,
            id: +editid.value,
        };
        moonTable.put(moon);
        console.log('Item updated')
    }

    function allMoon(){
        let transaction = db.transaction("moon", "readwrite");
        let moonTable = transaction.objectStore("moon");
        moonTable.getAll().onsuccess = function(event) {
            const allRecords = event.target.result;
            allRecords.forEach(record => {
                console.log('distanceMin' + record.min);
                console.log('distanceMax' + record.max);
                console.log('topMin' + record.min);
                console.log('topMax' + record.max);
            })
            console.log(JSON.stringify(event.target.result));
        };
    }

    function get(){
        let transaction = db.transaction("moon", "readwrite");
        let moonTable = transaction.objectStore("moon");
        let key = +editid.value;
        var objectStoreRequest = moonTable.get(key);
        objectStoreRequest.onsuccess = function(event) {
            let result = event.target.result;
            min.value = result.distanceMin;
            max.value = result.distanceMax;
            min.value = result.topMin;
            max.value = result.topMax;
            alert(JSON.stringify(event.target.result))
        };
    }
////////////////////////////////////////////////////////////////////////////////////////////
    openRequest.onupgradeneeded = function (event)
    {
     db = event.target.result;
     if (!db.objectStoreNames.contains("pterodactyl")) {
        db.createObjectStore("pterodactyl", {
            keyPath: "id",
            autoIncrement: true
        })
     }
    }

    function save(){
        let transaction = db.transaction("pterodactyl","readwrite");
        let pterodactylTable = transaction.objectStore("pterodactyl");

        let pterodactyl = {
            distanceMin: min.value,
            distanceMax: max.value,
            topMin: min.value,
            topMax: max.value,

        };

        let request = pterodactylTable.add(pterodactyl);
        console.dir(request);

        request.onsuccess = function() {
            console.log("Запись сохранилась успешно");
        };

        request.onerror = function(event) {
            console.log("Ошибка записи", event.target.error);
        };

    }

        function IDdelete(){
            let transaction = db.transaction("pterodactyl", "readwrite");
            let pterodactylTable = transaction.objectStore("pterodactyl");
            let key = +editid.value;
            pterodactylTable.delete(key);
            transaction.oncomplete = function() {
                    alert(111);
                };
                console.log('Item deleted')
        }

        function update(){
            let transaction = db.transaction("pterodactyl", "readwrite");
            let pterodactylTable = transaction.objectStore("pterodactyl");
            let pterodactyl = {
                distanceMin: min.value,
                distanceMax: max.value,
                topMin: min.value,
                topMax: max.value,
                id: +editid.value,
            };
            pterodactylTable.put(pterodactyl);
            console.log('Item updated')
        }

        function allPterodactyl(){
            let transaction = db.transaction("pterodactyl", "readwrite");
            let pterodactylTable = transaction.objectStore("pterodactyl");
            pterodactylTable.getAll().onsuccess = function(event) {
                const allRecords = event.target.result;
                allRecords.forEach(record => {
                    console.log('distanceMin' + record.min);
                    console.log('distanceMax' + record.max);
                    console.log('topMin' + record.min);
                    console.log('topMax' + record.max);
                })
                console.log(JSON.stringify(event.target.result));
            };
        }

        function get(){
            let transaction = db.transaction("pterodactyl", "readwrite");
            let pterodactylTable = transaction.objectStore("pterodactyl");
            let key = +editid.value;
            var objectStoreRequest = pterodactylTable.get(key);
            objectStoreRequest.onsuccess = function(event) {
                let result = event.target.result;
                min.value = result.distanceMin;
                max.value = result.distanceMax;
                min.value = result.topMin;
                max.value = result.topMax;
                alert(JSON.stringify(event.target.result))
            };
        }

//////////////////////////////////////////////////////////////////
openRequest.onupgradeneeded = function (event)
{
    db = event.target.result;
    if (!db.objectStoreNames.contains("star")) {
    db.createObjectStore("star", {
        keyPath: "id",
        autoIncrement: true
         })
    }
}

function save(){
    let transaction = db.transaction("star","readwrite");
    let starTable = transaction.objectStore("star");

    let star = {
        distanceMin: min.value,
        distanceMax: max.value,
        topMin: min.value,
        topMax: max.value,

    };

    let request = starTable.add(star);
    console.dir(request);

    request.onsuccess = function() {
        console.log("Запись сохранилась успешно");
    };

    request.onerror = function(event) {
        console.log("Ошибка записи", event.target.error);
    };

}

function IDdelete(){
    let transaction = db.transaction("star", "readwrite");
    let starTable = transaction.objectStore("star");
    let key = +editid.value;
    starTable.delete(key);
    transaction.oncomplete = function() {
        alert(111);
         };
    console.log('Item deleted')
}

function update(){
    let transaction = db.transaction("star", "readwrite");
    let starTable = transaction.objectStore("star");
    let star = {
        distanceMin: min.value,
        distanceMax: max.value,
        topMin: min.value,
        topMax: max.value,
        id: +editid.value,
        };
    starTable.put(star);
    console.log('Item updated')
}

function allStar(){
    let transaction = db.transaction("star", "readwrite");
    let starTable = transaction.objectStore("star");
    starTable.getAll().onsuccess = function(event) {
        const allRecords = event.target.result;
        allRecords.forEach(record => {
            console.log('distanceMin' + record.min);
            console.log('distanceMax' + record.max);
            console.log('topMin' + record.min);
            console.log('topMax' + record.max);
            })
        console.log(JSON.stringify(event.target.result));
        };
}

function get(){
    let transaction = db.transaction("star", "readwrite");
    let starTable = transaction.objectStore("star");
    let key = +editid.value;
    var objectStoreRequest = starTable.get(key);
    objectStoreRequest.onsuccess = function(event) {
        let result = event.target.result;
        min.value = result.distanceMin;
        max.value = result.distanceMax;
        min.value = result.topMin;
        max.value = result.topMax;
        alert(JSON.stringify(event.target.result))
        };
}




