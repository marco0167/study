import {openDB} from 'idb';

async function	useDB() {
	const dbPromise =  await openDB('test-db', 1)
}
console.log("CIOAOO")
function	indexedDBStuff() {
	if (!('indexedDB' in window)) {
		console.log('This browser doesn\'t support IndexedDB')
		return
	} else {
		console.log('This browser supports IndexedDB')

		useDB()


	}
}


indexedDBStuff()
