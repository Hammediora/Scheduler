import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase,set,ref,push,get,child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVUHss8iY_f4eUexAEAiTNUybt9IzrECs",
    authDomain: "employee-s-info.firebaseapp.com",
    databaseURL: "https://employee-s-info-default-rtdb.firebaseio.com",
    projectId: "employee-s-info",
    storageBucket: "employee-s-info.appspot.com",
    messagingSenderId: "886483869909",
    appId: "1:886483869909:web:84026b2e082fb655de825c",
    measurementId: "G-L7J87RM159"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

    // making the button a listener
document.getElementById('Submit').addEventListener('click', function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();


// Function to add an employee to the Firebase Firestore
    // Get input values
    const firstName = document.getElementById("inputFirst").value;
    const lastName = document.getElementById("inputLast").value;
    const position = document.getElementById('position').value;

    // Get the selected days
    const checkboxes = document.querySelectorAll('input[name="days"]');
    const selectedDays = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedDays.push(checkboxes[i].value);
        }
    }

    // Prepare the data to send to Firebase
    var employeeData = {
        firstName: firstName,
        lastName: lastName,
        position: position,
        days: selectedDays
    };


    submitData(employeeData);
});


    // Add the employee to Firestore
    function submitData(data) {
        const newEmployeeRef = push(ref(db, 'employees/'));
        set(newEmployeeRef, data)
            .then(() => {
                console.log("Data saved successfully!");
            })
            .catch((error) => {
                console.error("Failed to save data: ", error);
            });
}
