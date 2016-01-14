var databaseVersion = 6;
var databaseName = 'myTestDatabase';
var openRequest = window.indexedDB.open(databaseName, databaseVersion);
var objectStoreName = 'person-store';

openRequest.onerror = function(event) {
    console.log('Erorr when requesting database');
};

openRequest.onsuccess = function(event) {
    var db = event.target.result;
    var objectStore = db.transaction([objectStoreName]).objectStore(objectStoreName);
    var dataRequest = objectStore.get('Redmond');
    dataRequest.onsuccess = function(event) {
        var person = dataRequest.result;
        document.getElementById('output').innerText = person.firstName + ' ' + person.lastName;
    };
};

openRequest.onupgradeneeded = function(event) {
    var db = event.target.result;
    if (!db.objectStoreNames.contains(objectStoreName)) {
        var objectStore = db.createObjectStore(objectStoreName, { keyPath: 'address.city' });
        objectStore.transaction.oncomplete = function(event) {
            var myObjectStore = db.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName);
            var person = {
                firstName: 'Bill',
                lastName: 'Gates',
                address: {
                    city: 'Redmond',
                    state: 'WA'
                }
            }
            myObjectStore.add(person);
        };
    }
};