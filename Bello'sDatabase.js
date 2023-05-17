import express from 'express'
import { initializeApp } from "firebase/app";
import{ set, getDatabase,onValue, ref } from "firebase/database"
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDm0d0lHZCqvBm0qutWbpJjPKZzhtr4Z8s",
    authDomain: "scheduleapp-12e02.firebaseapp.com",
    databaseURL: "https://scheduleapp-12e02-default-rtdb.firebaseio.com",
    projectId: "scheduleapp-12e02",
    storageBucket: "scheduleapp-12e02.appspot.com",
    messagingSenderId: "124864009420",
    appId: "1:124864009420:web:93e48411660ff199d71e69",
    measurementId: "G-GGNFNSJB02"
};

const app = initializeApp(firebaseConfig);

function writeUserData(userId, name, email, imageUrl){
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId)

    set(
        reference, {
            username: name,
            email: email,
            profile_picture: imageUrl
        });
}

writeUserData("Hammed", "Bello", "Habello@gmail.com", "MyImageUrl" )
writeUserData("Ben", "Hammed", "manbello@gmail.com", "MyImageUrl2" )

function writeUserData2(userId, name, email, imageUrl){
    const db = getDatabase();
    const reference = ref(db, 'School/' + userId)

    set(reference, {
            username: name,
            email: email,
            profile_picture: imageUrl
        });
}
writeUserData2("Hammed", "Bello", "Habello@gmail.com", "MyImageUrl" )


const db = getDatabase();
const distanceRef = ref(db, 'users/');
onValue(distanceRef,(snapshot) => {
    const data =snapshot.val();
    console.log(data)
});










const localServer = express()
const port = 3000

localServer.get('/', (req, res) => {
    res.send('Hello World!')
});

localServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});