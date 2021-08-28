import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBnREZw8NbVALl7s8kAoIvhlvfUhgZdct0",
    authDomain: "subject-manager-aa0ba.firebaseapp.com",
    projectId: "subject-manager-aa0ba",
    storageBucket: "subject-manager-aa0ba.appspot.com",
    messagingSenderId: "421051326574",
    appId: "1:421051326574:web:b4d420146ff0836d2c467f"
  };

firebase.initializeApp(firebaseConfig);

export default firebase