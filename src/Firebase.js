
import firebase from 'firebase';

const config = {
    apiKey: "unreadablestuff",
    authDomain: "your-project-name.firebaseapp.com",
    databaseURL: "https://your-project-name.firebaseio.com",
    projectId: "your-project-name",
    storageBucket: "your-project-name.appspot.com",
    messagingSenderId: "0112358132134"
};

const firebaseConf = firebase.initializeApp(config);

export default firebaseConf;