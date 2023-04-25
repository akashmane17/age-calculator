//array of months to get the days of each months
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// accessing the button element and adding eventListner to it
let button = document.getElementById("calculate");
button.addEventListener('click', ageCalculate);

// fucntion resposible calculating age
function ageCalculate() {

  // variable with the current date
  let today = new Date();

  // variable with the date given as a input
  let inputDate = new Date(document.getElementById("date-input").value);
  let birthMonth, birthDate, birthYear;

  //created object and stored details recieved from inputDate
  let birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear()
  }

  // three variable consisting current year, month and date
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;
  let currentDate = today.getDate();

  //this will check if the current year is leap year or not
  leapChecker(currentYear);


  // validate to make sure user does not input date from the future (if date is invalid then shows alert)
  if (
    birthDetails.year > currentYear ||
    (birthDetails.month > currentMonth && birthDetails.year == currentYear) || (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear)
  ) {
    alert("Not Born Yet");
    displayResult("-", "-", "-");
    return;
  }

  //calculating year ex: 2023 - 2001
  birthYear = currentYear - birthDetails.year;

  //calculating months
  if (currentMonth >= birthDetails.month) {
    birthMonth = currentMonth - birthDetails.month;
  }
  else {
    birthYear--;
    birthMonth = 12 + currentMonth - birthDetails.month;
  }

  //calculating date
  if (currentDate >= birthDetails.date) {
    birthDate = currentDate - birthDetails.date;
  }
  else {
    birthMonth--;
    let days = months[currentMonth - 2];
    birthDate = days + currentDate - birthDetails.date;
    if (birthMonth < 0) {
      birthMonth = 11;
      birthYear--;
    }
  }

  // displaying output
  displayResult(birthDate, birthMonth, birthYear);
  console.log(birthYear, birthMonth, birthDate);
}

// Function that display output
function displayResult(bDate, bMonth, bYear) {
  document.getElementById('years').textContent = bYear;
  document.getElementById('months').textContent = bMonth;
  document.getElementById('days').textContent = bDate;
}

function leapChecker(year) {
  //if leap year change month[1] feb days to 29 else 28
  if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
    months[1] = 29;
  } else {
    months[1] = 28;
  }
}