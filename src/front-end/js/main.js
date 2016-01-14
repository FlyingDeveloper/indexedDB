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
    var dataRequest = objectStore.get('Gates');
    dataRequest.onsuccess = function(event) {
        if (dataRequest.result !== undefined) {
            var person = dataRequest.result;
            populateForm(person);
        } else {
            $.ajax(
                'http://localhost:20380/',
                {
                    ifModified: true
                }
            ).then(function(data) {
                populateForm(data);
                var objectStore = db.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName);
                objectStore.add(data);
            });
        }
    };
};

function populateForm(person) {
    document.getElementById('output').innerText = person.firstName + ' ' + person.lastName;
}

openRequest.onupgradeneeded = function(event) {
    var db = event.target.result;
    if (!db.objectStoreNames.contains(objectStoreName)) {
        db.createObjectStore(objectStoreName, { keyPath: 'lastName' });
    }
};