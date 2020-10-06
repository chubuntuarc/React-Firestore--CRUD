import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCFKbHn1s0cPtqvapQidDaRV6upF6FWyNc",
    authDomain: "simple-crud-320ca.firebaseapp.com",
    databaseURL: "https://simple-crud-320ca.firebaseio.com",
    projectId: "simple-crud-320ca",
    storageBucket: "simple-crud-320ca.appspot.com",
    messagingSenderId: "286992055113",
    appId: "1:286992055113:web:efc9f36db536239a273898"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig); 

//Export the db object from firestore.
export const db = fb.firestore();

