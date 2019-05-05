console.log("Hot Chicken");

const outputDiv = document.getElementById("output");

const addChickenBtn = document.getElementById("addChickenBtn");
const saveChickenBtn = document.getElementById("saveChickenBtn");
const saveEditedChickenBtn = document.getElementById("saveEditedChickenBtn");
const addChickenFormDiv = document.getElementById("addChickenForm");
const editChickenFormDiv = document.getElementById("editChickenForm");

// TOGGLE SHOW/HIDE ON ADD CHICKEN FORM
addChickenBtn.addEventListener("click", () => {
  if (addChickenFormDiv.className === "hidden") {
    addChickenFormDiv.classList.remove("hidden");
    editChickenFormDiv.classList.add("hidden");
  } else {
    addChickenFormDiv.classList.add("hidden");
  }
});

saveChickenBtn.addEventListener("click", () => {
  saveNewChickenObject();
});

function clearSaveChickenForm() {
  document.getElementById("chickenName").value = "";
  document.getElementById("chickenGender").value = "";
  document.getElementById("chickenColor").value = "";
  document.getElementById("chickenSpice").value = "";
}
function saveNewChickenObject() {
  const newChickenObject = {
    name: document.getElementById("chickenName").value,
    gender: document.getElementById("chickenGender").value,
    color: document.getElementById("chickenColor").value,
    spice_level: document.getElementById("chickenSpice").value
  };

  API.saveChicken(newChickenObject).then(loadChickenData);

  addChickenFormDiv.classList.add("hidden");
  clearSaveChickenForm();
}

function loadChickenData() {
  // get chicken data from API
  API.getChickens().then(parsedChickens => {
    // clear output div
    outputDiv.innerHTML = "";
    parsedChickens.forEach(parsedChicken => {
      // add chickens to DOM
      buildChickenDOM(parsedChicken);
    });
  });
}

loadChickenData();

function buildChickenDOM(chicken) {
  // build chicken card container
  let chickenCard = document.createElement("section");
  setAttributes(chickenCard, {
    id: `chick_section_${chicken.id}`,
    class: "chicken_card",
    style: `border: 8px solid ${chicken.color}`
  });

  // build header element
  let chickenName = document.createElement("h1");
  chickenName.textContent = chicken.name;

  // build chicken details
  let chickenDetails = document.createElement("div");
  chickenDetails.innerHTML = `
      <ul>
        <li>Gender: ${chicken.gender}</li>
        <li>Color: ${chicken.color}</li>
        <li>Spice-Level: ${chicken.spice_level}</li>
      </ul>
      `;

  // create edit & delete buttons
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit Chicken";
  editBtn.addEventListener("click", event => {
    if (editChickenFormDiv.className === "hidden") {
      editChickenFormDiv.classList.remove("hidden");
      addChickenFormDiv.classList.add("hidden");
    }
    // editChicken(event.target.name.slice(6));
    editChicken(chicken.id);
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Chicken";
  deleteBtn.addEventListener("click", () => {
    API.deleteChicken(chicken.id).then(loadChickenData);
    addChickenFormDiv.classList.add("hidden");
  });

  let jumpToEditAnchor = document.createElement("a");
  setAttributes(jumpToEditAnchor, { href: "#edit" });
  setAttributes(editBtn, {
    value: `edit--${chicken.id}`,
    name: `edit--${chicken.id}`
  });
  jumpToEditAnchor.appendChild(editBtn);

  setAttributes(deleteBtn, {
    value: `delete--${chicken.id}`,
    name: `delete--${chicken.id}`
  });

  chickenCard.appendChild(chickenName);
  chickenCard.appendChild(chickenDetails);
  chickenCard.appendChild(jumpToEditAnchor);
  chickenCard.appendChild(deleteBtn);

  outputDiv.appendChild(chickenCard);
}

// GET CHICKEN TO UPDATE/EDIT AND POPULATE FORM
function editChicken(chickenId) {
  saveEditedChickenBtn.addEventListener("click", () => {
    saveEditedChicken();
    editChickenFormDiv.classList.add("hidden");
    addChickenFormDiv.classList.add("hidden");
  });
  API.getOneChicken(chickenId).then(chickenData => {
    console.log(chickenData);

    let editId = document.getElementById("editChickenId");
    editId.value = `editId_${chickenData.id}`;
    let editName = document.getElementById("editChickenName");
    editName.value = chickenData.name;
    let editGender = document.getElementById("editChickenGender");
    editGender.value = chickenData.gender;
    let editColor = document.getElementById("editChickenColor");
    editColor.value = chickenData.color;
    let editSpice = document.getElementById("editChickenSpice");
    editSpice.value = chickenData.spice_level;
  });
}

// UPDATE/EDIT CHICKEN
function saveEditedChicken() {
  const editedChickenId = document
    .getElementById("editChickenId")
    .value.slice(7);
  const editedChickenObject = {
    name: document.getElementById("editChickenName").value,
    gender: document.getElementById("editChickenGender").value,
    color: document.getElementById("editChickenColor").value,
    spice_level: document.getElementById("editChickenSpice").value
  };
  API.editChicken(editedChickenId, editedChickenObject).then(loadChickenData);
}

// HELPER FUNCTIONS::
// sets attributes on created elements
function setAttributes(element, attributes) {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
