// Import the functions you need from the SDKs you need
import  express from "express";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { request } from "http";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB71cbgQruPuyJrHdQR6zi1Da8l5zmUB94",
  authDomain: "scheduler-d0eec.firebaseapp.com",
  databaseURL: "https://scheduler-d0eec-default-rtdb.firebaseio.com",
  projectId: "scheduler-d0eec",
  storageBucket: "scheduler-d0eec.appspot.com",
  messagingSenderId: "823710957958",
  appId: "1:823710957958:web:d5e5186ad943a336832c07",
  measurementId: "G-FLEFV87VYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const localServer = express();
const port = 3100;




  localServer.get('/', (req, res) => {
    res.send('Hello World!');
  });


//Writing data to the database 
function writeData(userId, name, email, imageUrl){
    const db = getDatabase();

    //Use pathnames to write where you want new data to start
    //EX: root/state/county/city/school this would add a new school depending on location 
    const reference = ref(db,'users/' + userId);
    set (reference, {
        username: name,
        email: email,
        profile_pic: imageUrl
    });
}

//Calling the function here
writeData("benhern","Ben", "something@ggg.com", "imageLink");

const db = getDatabase();
const distanceRef = ref(db, 'users/');
onValue(distanceRef, (snapshot) => {
    const data = snapshot.val();

    //res sends to the web
    //req gets the request from web 
    localServer.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
        console.log(data);
      })
});



