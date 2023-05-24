import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  push,
  get,
  child,
  update,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyBVUHss8iY_f4eUexAEAiTNUybt9IzrECs",
  // authDomain: "employee-s-info.firebaseapp.com",
  // databaseURL: "https://employee-s-info-default-rtdb.firebaseio.com",
  // projectId: "employee-s-info",
  // storageBucket: "employee-s-info.appspot.com",
  // messagingSenderId: "886483869909",
  // appId: "1:886483869909:web:84026b2e082fb655de825c",
  // measurementId: "G-L7J87RM159"

  apiKey: "AIzaSyB71cbgQruPuyJrHdQR6zi1Da8l5zmUB94",
  authDomain: "scheduler-d0eec.firebaseapp.com",
  databaseURL: "https://scheduler-d0eec-default-rtdb.firebaseio.com",
  projectId: "scheduler-d0eec",
  storageBucket: "scheduler-d0eec.appspot.com",
  messagingSenderId: "823710957958",
  appId: "1:823710957958:web:d5e5186ad943a336832c07",
  measurementId: "G-FLEFV87VYE",
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

  console.log(checkboxes);

  submitData(employeeData);
});

// Add the employee to Firestore
function submitData(data) {
  const reference = push(ref(db, "employees/userInfo"));

  const employeeID = reference.key;
  data.ID = employeeID.substring(16);

  set(reference, data);

  let card = document.createElement("div");
  let row = document.createElement("div");
  let col1 = document.createElement("div");
  let profilePic = document.createElement("img");
  let col2 = document.createElement("div");
  let cardBody = document.createElement("div");
  let cardtitle = document.createElement("h5");

  cardtitle.className = "card-title";
  cardtitle.innerText = "NAME";
  cardBody.appendChild(cardtitle);

  col2.className = "col-md-8";

  profilePic.className = "img-fluid rounded-start";
  profilePic.src =
    "https://www.free-images.com/lg/33df/patko_italian_coast.jpg";
  profilePic.height = 100;
  profilePic.width = 100;

  col1.className = "col-md-4";
  col1.appendChild(profilePic);

  row.className = "row g-0";
  row.appendChild(cardBody);
  row.appendChild(col1);
  row.appendChild(col2);

  card.className = "card mb-3";
  card.style = "max-width: 540px; height: 150px; cursor: pointer";
  //card.onclick = show-info;

  card.append(row);

  document.getElementById("employee-card").append(card);
}
