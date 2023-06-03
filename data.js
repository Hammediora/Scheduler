import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  push,
  remove,
  get,
  child,
  update,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVUHss8iY_f4eUexAEAiTNUybt9IzrECs",
  authDomain: "employee-s-info.firebaseapp.com",
  databaseURL: "https://employee-s-info-default-rtdb.firebaseio.com",
  projectId: "employee-s-info",
  storageBucket: "employee-s-info.appspot.com",
  messagingSenderId: "886483869909",
  appId: "1:886483869909:web:84026b2e082fb655de825c",
  measurementId: "G-L7J87RM159",

  // apiKey: "AIzaSyB71cbgQruPuyJrHdQR6zi1Da8l5zmUB94",
  // authDomain: "scheduler-d0eec.firebaseapp.com",
  // databaseURL: "https://scheduler-d0eec-default-rtdb.firebaseio.com",
  // projectId: "scheduler-d0eec",
  // storageBucket: "scheduler-d0eec.appspot.com",
  // messagingSenderId: "823710957958",
  // appId: "1:823710957958:web:d5e5186ad943a336832c07",
  // measurementId: "G-FLEFV87VYE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// making the button a listener
document.getElementById("Submit").addEventListener("click", function (event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Function to add an employee to the Firebase Firestore
  // Get input values
  const firstName = document.getElementById("inputFirst").value;
  const lastName = document.getElementById("inputLast").value;
  const position = document.getElementById("position").value;

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
    ID: "",
    firstName: firstName,
    lastName: lastName,
    position: position,
    days: selectedDays,
  };
  submitData(employeeData);


  window.addEventListener("load", function () {
    displayEmployeeCards();
  });
});

// Add the employee to firebase as well as adding a card of the person just added.
function submitData(data) {
  const reference = push(ref(db, "employees/userInfo"));
  const employeeID = reference.key;
  data.ID = employeeID.substring(16);

  set(reference, data);

  create_employee_card(data, "employee-card");
}


// Function to display employee cards
function displayEmployeeCards() {
  console.log("Displaying employee cards");

  // Reference to the "employees/userInfo" path in the database
  const employeesRef = ref(db, "employees/userInfo");
  // Get employees data from the database
    get(employeesRef)
        .then((snapshot) => {
          // Check if data exists
          if (snapshot.exists()) {
            const data = snapshot.val();
            // Iterate over each employee data
            Object.keys(data).forEach((employeeID) => {
              const employee = data[employeeID];
              // Create employee card for each employee
              create_employee_card(employee, "employee-card");
            });
          }
        })
        .catch((error) => {
          console.error("Failed to retrieve employee data: ", error);
        });
}

    // Listener that displays the employee cards when the window loads
    window.addEventListener("load", function () {
      displayEmployeeCards();
    });


// Add click event listener to the delete button
const deleteSelectedButton = document.getElementById('deleteButton');
deleteSelectedButton.addEventListener('click', deleteSelectedCards);

// Function to delete the selected cards
function deleteSelectedCards() {
  const selectedCards = document.querySelectorAll(".card.selected");
  selectedCards.forEach((card) => {
    // Retrieve the data associated with the card
    const employeeRef = ref(db, 'employees/userInfo/' );
    get(employeeRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Delete the data from the database
            remove(employeeRef)
                .then(() => {
                  console.log("Employee data deleted from the database successfully!");
                })
                .catch((error) => {
                  console.error("Error deleting employee data from the database: ", error);
                });
          }
        })
        .catch((error) => {
          console.error("Error retrieving employee data from the database: ", error);
        });

    // Remove the card from the UI
    card.remove();
  });
}



//create_person_schedule();
