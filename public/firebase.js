// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
    getFirestore, 
    addDoc, 
    collection, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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
const db = getFirestore(app);

const signUpBtn = document.getElementById('signUpForm')

signUpBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    if (!email.includes("@")) {
        return showMessage("Please enter a valid email", "signUpMessage");
    } try {
        await addDoc(collection(db, "signups"), {
            email,
            firstName,
            lastName,
            createdAt: serverTimestamp()
        });
        showMessage('Thank you for joining!', 'signUpMessage');
        document.getElementById("signUpForm").reset();
    } catch (err) {
        console.error("Error saving signup", err);
        showMessage("Something went wrong :/", "signUpMessage");
    }
});

function showMessage(message) {
    const div = document.getElementById(id);
    div.style.display = "block";
    div.textContent = message;
    setTimeout(() => div.style.display = "none", 3000);
}
