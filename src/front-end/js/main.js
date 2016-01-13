var databaseVersion = 4;
var databaseName = 'myTestDatabase';
var openRequest = window.indexedDB.open(databaseName, databaseVersion);
var objectStoreName = 'my-object-store';

openRequest.onerror = function(event) {
    console.log('Erorr when requesting database');
};

openRequest.onsuccess = function(event) {
    var db = event.target.result;
    var objectStore = db.transaction([objectStoreName]).objectStore(objectStoreName);
    var dataRequest = objectStore.get(1);
    dataRequest.onsuccess = function(event) {
        document.getElementById('output').innerText = dataRequest.result;
    };
};

openRequest.onupgradeneeded = function(event) {
    var db = event.target.result;
    if (!db.objectStoreNames.contains(objectStoreName)) {
        var objectStore = db.createObjectStore(objectStoreName);
        objectStore.transaction.oncomplete = function(event) {
            var myObjectStore = db.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName);
            myObjectStore.add('Hello, here is some text stored in IndexedDB!', 1);
        };
    }
};