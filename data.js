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
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';


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

//Create an employee counter
let employeeCounter = 0;

// Retrieve the employee counter from the database
get(ref(db, "employees/counter"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        employeeCounter = snapshot.val();
      }
    })
    .catch((error) => {
      console.error("Failed to retrieve employee counter: ", error);
    });

// making the button a listener
document.getElementById("Submit").addEventListener("click", function (event) {
  // Prevent the form from submitting normally
  event.preventDefault();



  // Function to add an employee to the Firebase Database
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


// function to create the unique ID using the name initials and the counter.
  function generateUniqueId(firstName, lastName) {
    const initials = firstName.charAt(0) + lastName.charAt(0);
    const employeeId = initials + ("000" + employeeCounter).slice(-3);
    return employeeId;
  }

// Then, generate a new ID
  const ID = generateUniqueId(firstName, lastName);
  console.log('New ID is', ID);

  // Prepare the data to send to Firebase
  var employeeData = {
    ID: ID,
    firstName: firstName,
    lastName: lastName,
    position: position,
    days: selectedDays,
  };
  // Increment the employee counter
  employeeCounter++;

  // Update the employee counter in the database
  set(ref(db, "employees/counter"), employeeCounter)
      .then(() => {
        console.log('Employee counter successfully updated');
      })
      .catch((error) => {
        console.error('Failed to update employee counter: ', error);
      });

  // Add the employee to Firebase and create an employee card
  submitData(employeeData);

  window.addEventListener("load", function () {
    displayEmployeeCards();
  });
});


// Add the employee to firebase as well as adding a card of the person just added.
function submitData(data) {
  const employeeId = data.ID; // Use the generated ID from the employeeData object
  const reference = ref(db, `employees/userInfo/${employeeId}`);
  set(reference, data)
      .then(() => {
        console.log('Data successfully written to database');
        // Now create an employee card for this new employee
        create_employee_card(data, "employee-card");
      })
      .catch((error) => {
        console.error('Failed to write data to database: ', error);
      });
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


// Function to delete the selected cards
function deleteSelectedCards() {
  // Get all the cards with the 'selected' class.
  const selectedCards = document.querySelectorAll(".card.selected");
  selectedCards.forEach((card) => {
    const cardId = card.getAttribute("data-employee-id");
    // Retrieve the data associated with the card
    const employeeRef = ref(db, 'employees/userInfo/' + cardId);
    console.log('Deleting employee:', cardId);  // New log card ID
    remove(employeeRef)
        .then(() => {
          console.log("Employee data deleted from the database successfully!");
          // Remove the 'selected' class and the card from the UI only if the deletion was successful
          card.classList.remove('selected');
          card.remove();
        })
        .catch((error) => {
          console.error("Error deleting employee data from the database: ", error);
        });
  });
}

// Add click event listener to the delete button
const deleteSelectedButton = document.getElementById('deleteButton');
deleteSelectedButton.addEventListener('click', deleteSelectedCards);

//create_person_schedule();
