const { initializeApp } = require('firebase/app')
const { getFirestore, collection, getDocs, getDoc, doc, updateDoc, addDoc } = require('firebase/firestore/lite')

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    // databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
};

const firebase = initializeApp(firebaseConfig);

const initiateDB = () => {

    const firestore = getFirestore(firebase);
    return firestore
}

const getCollection = async (collectionName, filters = {}) => {
    try {
        const filterKeys = Object.keys(filters)
        const firestore = initiateDB()
        const col = collection(firestore, collectionName);
        const collectionSnapshot = await getDocs(col);
        const list = collectionSnapshot.docs.map(doc => doc.data());
        return list.filter(doc => filterKeys.map(filter => doc[filter] == filters[filter]).every(e => e));
    } catch (err) {
        console.log(err)
        return err
    }
}

const getItemFromCollection = async (collectionName, bbid) => {
    try {
        const firestore = initiateDB()
        const document = doc(firestore, collectionName, bbid);
        const documentSnapshot = await getDoc(document);
        const item = documentSnapshot.data();
        return item;
    } catch (err) {
        console.log(err)
        return err
    }
}

const createItemFromCollection = async (collectionName, requestBody, id) => {
    const { doc, setDoc, getFirestore } = require("firebase/firestore");
    try {
        const firebaseApp = initializeApp(firebaseConfig)
        const db = getFirestore(firebaseApp)
        await setDoc(doc(db, collectionName, id), requestBody);
    } catch (err) {
        console.log(err)
        return err
    }
}

const updateItemFromCollection = async (collectionName, id, updatedFields) => {
    try {
        const firestore = initiateDB()
        const document = doc(firestore, collectionName, id);
        const updatedDocument = await updateDoc(document, updatedFields);
        return updatedDocument
    } catch (err) {
        console.log(err)
        return err
    }
}


module.exports = {
    initiateDB,
    getCollection,
    getItemFromCollection,
    updateItemFromCollection,
    createItemFromCollection
}
