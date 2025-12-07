// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

// To localize the provider's OAuth flow to the user's preferred language
import { 
    getAuth, 
    getRedirectResult, 
    signInWithRedirect, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth";

// redirect to sign in
signInWithRedirect(auth, provider);
getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

// Firestore
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrP1NAirXdNYT0poIlt_PahvSgG7WYWQw",
    authDomain: "coffpact.firebaseapp.com",
    projectId: "coffpact",
    storageBucket: "coffpact.firebasestorage.app",
    messagingSenderId: "188078060494",
    appId: "1:188078060494:web:0a575dbc0fb628cf03f19f",
    measurementId: "G-JP6NKDV9DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
        messageDiv.style.opacity = 0;
    }, 5000)
}

const analytics = getAnalytics(app);

const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    const auth = getAuth();
    auth.useDeviceLanguage();

    const db = getFirestore(app);

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            email: email,
            firstNAame: firstName,
            lastName: lastName
        };
        showMessage('Your email has been submitted, thank you for joining!');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((err) => {
            console.err("error writing doc", err);
        });
    })
    .catch((err) => {
        const errCode = err.code;
        if (errCode == 'auth/email-already-in-use') {
            showMessage('Email Address Already Exists', 'signUpMessage');
        }
        else {
            showMessage("Unable to correct user", "signUpMessage");
        }
    })

})