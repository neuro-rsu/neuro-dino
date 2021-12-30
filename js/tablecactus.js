// let db;

// let openRequest = indexedDB.open("test", 1);

// openRequest.onsuccess = function(event) {
//     console.log("open db --- onsuccess");
//     db = event.target.result;
// }

// openRequest.onerror = function(event) {
//     console.log("open db --- onerror");
//     console.log("Ошибка открытия БД");
//     db = event.target.result;
// }

// openRequest.onupgradeneeded = function (event)
// {
//  db = event.target.result;
//  if (!db.objectStoreNames.contains("cactus")) {
//     db.createObjectStore("cactus", {
//         keyPath: "id",
//         autoIncrement: true
//     })
//  }
// }

// function save(){
//     let transaction = db.transaction("cactus","readwrite");
//     let cactusTable = transaction.objectStore("cactus");

//     let cactus = {
//         distanceMin: min.value,
//         distanceMax: max.value,

//     };

//     let request = cactusTable.add(cactus);
//     console.dir(request);

//     request.onsuccess = function() {
//         console.log("Запись сохранилась успешно");
//     };

//     request.onerror = function(event) {
//         console.log("Ошибка записи", event.target.error);
//     };


// }