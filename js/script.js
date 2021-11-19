const studentList = document.querySelector(".student-list");

/**
 * Creates children of studentList containing student information and displays 9 per page
 *
 * @param {array} list The array containing student objects.
 * @param {number} page Page number
 * @return {element}    Children of studentList
 */
function showPage(list, page) {
  const startIndex = page * 9 - 9;
  const endIndex = page * 9;

  // Removes any students that might have previously been displayed
  studentList.innerHTML = "";

  let studentItem = "";

    for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      studentItem += `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src= "${list[i].picture.thumbnail}" alt="Profile Picture">
           <h3>${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i].registered.date}</span>
         </div>
       </li>`;
    }
  }
  return studentList.insertAdjacentHTML("beforeend", studentItem);
}

showPage(data, 1);

/**
 * Creates pagination buttons and gives them a class of active if they are clicked
 *
 * @param {array} list The array containing student objects.
 */

function addPagination(list) {
  const numOfPages = Math.ceil(list.length / 9);
  const linkList = document.querySelector(".link-list");
  // Removes pagination buttons previously displayed
  linkList.innerHTML = "";
  let buttonHTML = "";

  for (let i = 1; i <= numOfPages; i++) {
    buttonHTML += `
      <li>
      <button type="button">${i}</button>
      </li>
      `;
  }

  linkList.insertAdjacentHTML("beforeend", buttonHTML);

  const firstButton = document.querySelector(".link-list button");
  // If at least one pagination button exists, give it a class of "active"
  if (firstButton) {
    firstButton.classList.add("active");
  }

  // Removes the active class from previous button, gives the clicked button a class of "active" and displays the students on that page.
  linkList.addEventListener("click", (e) => {
    const buttonTarget = e.target;
    if ((buttonTarget.tagName === "BUTTON")) {
      const previousButton = document.querySelector(".active");
      previousButton.classList = "";
      buttonTarget.classList.add("active");
      showPage(list, buttonTarget.textContent);
    }
  });
}

addPagination(data);

// Dynamically creates and adds a search bar.

const header = document.querySelector(".header");
const searchLabel = `
<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`;
header.insertAdjacentHTML("beforeend", searchLabel);

const search = document.querySelector("#search");
const submit = document.querySelector("button[type=button]");

let studentMatch = [];

/**
 * Compares user's search input with students on the page and returns an array of matching results
 *
 * @param {element} searchInput User's search input
 * @param {array} list The array containing student objects.
 */

function searchStudent(searchInput, list) {
  for (let i = 0; i < list.length; i++) {
    const fullName = `${data[i].name.first} ${data[i].name.last}`;
    if (
      searchInput.value.length !== 0 &&
      fullName.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      studentMatch.push(list[i]);
    }
  }
}

//
submit.addEventListener("click", (e) => {
  e.preventDefault();
  searchStudent(search, data);
  // Changes pagination according to the number of matches to the search
  showPage(studentMatch, 1);
  addPagination(studentMatch);
  // 
  studentMatch = [];
  // When the search input is deleted, the page goes back to its initial state
  if (search.value.length === 0) {
    showPage(data, 1);
    addPagination(data);
  }
  // If no matches are found for a search, display a “No results found” type message on the page.
  if (studentList.children.length === 0) {
    studentList.innerHTML = "No results found.";
  }
});

search.addEventListener("keyup", () => {
  searchStudent(search, data);
  // Changes pagination according to the number of matches to the search
  showPage(studentMatch, 1);
  addPagination(studentMatch);
  // 
   studentMatch = [];
  // When the search input is deleted, the page goes back to its initial state
  if (search.value.length === 0) {
    showPage(data, 1);
    addPagination(data);
  }
  // If no matches are found for a search, display a “No results found” type message on the page.
  if (studentList.children.length === 0) {
    studentList.innerHTML = "No results found.";
  }
});


