/* This file will contain all the custom widgets that we need
 *for this project.
 *
 */

function create_employee_card(name, id) {
  //Html elements needed to make the card
  let card = document.createElement("div");
  let row = document.createElement("div");
  let col1 = document.createElement("div");
  let profilePic = document.createElement("img");
  let col2 = document.createElement("div");
  let cardBody = document.createElement("div");
  let cardtitle = document.createElement("h5");

  //Title in card
  cardtitle.className = "card-title";
  cardtitle.innerText = name;

  //Body of card
  cardBody.appendChild(cardtitle);
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
  card.className = "card mb-3";
  card.style = "max-width: 540px; height: 120px; cursor: pointer";
  //card.onclick = show-info;
  card.append(row);

  //Card widget added into the html to be seen.
  document.getElementById(id).append(card);
}
