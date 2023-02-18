// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { Notify } from 'notiflix';

const signIn = document.querySelector('.sign-in');
const signUp = document.querySelector('.sign-up');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const login = document.querySelector('.log-in');
const logOut = document.querySelector('.log-out');
let user;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC82DHO76H02snHe2pA_BAkInW7ri5E5yg',
  authDomain: 'filmoteka-gr3.firebaseapp.com',
  projectId: 'filmoteka-gr3',
  storageBucket: 'filmoteka-gr3.appspot.com',
  messagingSenderId: '600702873000',
  appId: '1:600702873000:web:426877d5669c5a1671819d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Authentication
const auth = getAuth(app);

// SIGN UP USERS

signUp.addEventListener('click', e => {
  e.preventDefault(),
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(userCredential => {
        // Signed in
          const user = userCredential.user;
           Notify.success(`Registration success :)`);
      })
      .catch(error => {
        
        const errorMessage = error.message;
         Notify.failure(`Email is already in use! Try use different email.`);
        // ..
      });
});

//LOGIN USERS

signIn.addEventListener('click', e => {
  e.preventDefault(),
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(userCredential => {
        // Signed in
        (user = userCredential.user),
          document.querySelector('[login-modal]').classList.toggle('is-hidden');
        Notify.success(`Hi, ${user.email.split('@')[0]}, you are sign in!`);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Notify.failure(`Wrong email or password!`);
      });
});

//LOG OUT
logOut.addEventListener('click', e => {
  e.preventDefault(),
    signOut(auth)
      .then(() => {
        return (
          login.classList.toggle('is-hidden'),
          logOut.classList.toggle('is-hidden'),
          Notify.info(`Goodbye, you are logged out!`)
        );
      })
      .catch(error => {
        Notify.info(`Goodbye, you are logged out!`);
      });
});

onAuthStateChanged(auth, user => {
  if (user) {
    login.classList.toggle('is-hidden'), logOut.classList.toggle('is-hidden');
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
