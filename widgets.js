/* This file will contain all the custom widgets that we need
 *for this project.
 *
 */

//Widget to make the employee card
function create_employee_card(data, Id) {
  //Html elements needed to make the card
  let card = document.createElement("div");
  let row = document.createElement("div");
  let col1 = document.createElement("div");
  let profilePic = document.createElement("img");
  let col2 = document.createElement("div");
  let cardBody = document.createElement("div");
  let cardtitle = document.createElement("h5");
  let cardText = document.createElement("p");

  //Title in card
  cardtitle.className = "card-title";
  cardtitle.innerText = data.firstName + " " + data.lastName;
  cardBody.appendChild(cardtitle);

  cardText.className = "card-text";
  cardText.innerText = "ID: " + data.ID;
  cardBody.appendChild(cardText);

  //Body of card
  cardBody.className = "card-body";
  col2.appendChild(cardBody);
  col2.className = "col-md-8";

  //Profile pic w/ styles
  col1.className = "col-md-4";
  profilePic.className = "img-fluid rounded-start mt-2";
  profilePic.src =
    "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg";
  profilePic.height = 100;
  profilePic.width = 100;
  col1.appendChild(profilePic);

  //Adding in the rest of div into the main div "employee-card"
  row.className = "row g-0";
  row.appendChild(col1);
  row.appendChild(col2);
  card.className = "card mb-3 mx-4";
  card.style = "max-width: 390px; height: 120px; cursor: pointer";
  card.onclick = create_person_schedule("yoooo");
  card.append(row);

  // Set an attribute for the card
  card.setAttribute("data-employee-id", data.ID);

  //Card widget added into the html to be seen.
  document.getElementById("employee-card").appendChild(card);

  // Add click event listener to the card
  card.addEventListener('click', toggleCardSelection);
}

  // Toggle selected class on the card when clicked
  function toggleCardSelection(event) {
    const card = event.currentTarget;
    if(card.style.border == "2px solid red"){
      card.style.border = ""; // Reset to the default style if the card is selected again
    } else {
      card.style.border = "2px solid red"; // Add a red border to the card when it is selected
    }
    card.classList.toggle('selected');
}

function create_person_schedule(text) {
  let schedule = document.getElementById("person-schedule");
  schedule.innerText = text;
}
