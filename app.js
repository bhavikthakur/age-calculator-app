const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const dayLabel = document.querySelector(".container__day-label");
const monthLabel = document.querySelector(".container__month-label");
const yearLabel = document.querySelector(".container__year-label");
const yearOutput = document.querySelector(".hero__output--years");
const monthOutput = document.querySelector(".hero__output--months");
const dayOutput = document.querySelector(".hero__output--days");
const form = document.querySelector(".form");
const allErrors = document.querySelectorAll(".container__error");
const allInputs = document.querySelectorAll("input");
const allLabels = document.querySelectorAll("label");
const invalidDayError = document.querySelector(".container__error-day");
const invalidMonthError = document.querySelector(".container__error-month");
const invalidYearError = document.querySelector(".container__error-year");

// Blocking users from certain keys to avoid characters and symbols
[dayInput, monthInput, yearInput].forEach((input) =>
  input.addEventListener("keydown", (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  })
);

const dateObject = new Date();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userDate = Number(dayInput.value);
  const userMonth = Number(monthInput.value);
  const userYear = Number(yearInput.value);
  const currentDate = dateObject.getDate();
  const currentMonth = dateObject.getMonth() + 1;
  const currentYear = dateObject.getFullYear();
  let isValid = true;

  let calculatedYear = 0;
  let calculatedMonth = 0;
  let calculatedDate = 0;

  function calculateAge() {
    calculatedYear = currentYear - userYear; // get birth year
    calculatedMonth = currentMonth - userMonth; // get months if not negative value
    calculatedDate = currentDate - userDate; // get days if not negative value

    // Handle months less than 0
    if (calculatedMonth < 0) {
      calculatedYear--;
      calculatedMonth += 12;
    }

    // Handle days less than 0
    if (calculatedDate < 0) {
      // Get last day of the previous month (JavaScript handles 0 = last day of previous month automatically)

      const lastMonth = new Date(currentYear, currentMonth - 1, 0);
      calculatedDate += lastMonth.getDate(); // Add number of days in the previous month
      calculatedMonth--; // Decrease month
      if (calculatedMonth < 0) {
        // If month goes below 0
        calculatedMonth = 11;
        calculatedYear--; // Decrease year
      }
    }

    return [calculatedYear, calculatedMonth, calculatedDate];
  }

  calculateAge();

  function resetAllErrors() {
    allErrors.forEach((error) => error.classList.remove("active"));
    allInputs.forEach((input) => input.classList.remove("outline__error"));
    allLabels.forEach((label) => label.classList.remove("color__error"));
  }
  resetAllErrors();

  function showInvalidError() {
    if (
      dayInput.value.trim() !== "" &&
      (isNaN(userDate) || userDate < 1 || userDate > 31)
    ) {
      invalidDayError.classList.add("active");
      dayLabel.classList.add("color__error");
      dayInput.classList.add("outline__error");
      isValid = false;
    }

    if (
      monthInput.value.trim() !== "" &&
      (isNaN(userMonth) || userMonth < 1 || userMonth > 12)
    ) {
      invalidMonthError.classList.add("active");
      monthLabel.classList.add("color__error");
      monthInput.classList.add("outline__error");
      isValid = false;
    }

    if (
      yearInput.value.trim() !== "" &&
      (isNaN(userYear) || userYear > currentYear)
    ) {
      invalidYearError.classList.add("active");
      yearLabel.classList.add("color__error");
      yearInput.classList.add("outline__error");
      isValid = false;
    }

    if (userDate > 29 && userMonth === 2) {
      invalidMonthError.classList.add("active");
      monthLabel.classList.add("color__error");
      monthInput.classList.add("outline__error");
      isValid = false;
    }
  }

  showInvalidError();

  function showEmptyError() {
    if (!dayInput.value.trim()) {
      invalidDayError.innerText = "This field is required";
      invalidDayError.classList.add("active");
      dayLabel.classList.add("color__error");
      dayInput.classList.add("outline__error");
      isValid = false;
    }
    if (!monthInput.value.trim()) {
      invalidMonthError.innerText = "This field is required";
      invalidMonthError.classList.add("active");
      monthLabel.classList.add("color__error");
      monthInput.classList.add("outline__error");
      isValid = false;
    }
    if (!yearInput.value.trim()) {
      invalidYearError.innerText = "This field is required";
      invalidYearError.classList.add("active");
      yearLabel.classList.add("color__error");
      yearInput.classList.add("outline__error");
      isValid = false;
    }
  }
  showEmptyError();

  function validDateCheck() {
    if (
      (userMonth === 4 && userDate > 30) ||
      (userMonth === 6 && userDate > 30) ||
      (userMonth === 9 && userDate > 30) ||
      (userMonth === 11 && userDate > 30)
    ) {
      dayLabel.classList.add("color__error");
      invalidDayError.classList.add("active");
      dayInput.classList.add("outline__error");
      monthLabel.classList.add("color__error");
      invalidMonthError.classList.add("active");
      monthInput.classList.add("outline__error");
      isValid = false;
    }
  }
  validDateCheck();

  function validAgeInput() {
    if (isValid) {
      displayAge();
    }
  }

  validAgeInput();

  function displayAge() {
    const [years, months, days] = calculateAge();
    yearOutput.innerText = years;
    monthOutput.innerText = months;
    dayOutput.innerText = days;
  }
});

dayInput.addEventListener("input", () => {
  if (dayInput.value <= 0 || dayInput.value > 31) {
    dayLabel.classList.add("color__error");
    invalidDayError.classList.add("active");
    dayInput.classList.add("outline__error");
  } else {
    dayLabel.classList.remove("color__error");
    invalidDayError.classList.remove("active");
    dayInput.classList.remove("outline__error");
  }

  if (!dayInput.value.trim()) {
    invalidDayError.innerText = "This field is required";
  }
});
monthInput.addEventListener("input", () => {
  if (monthInput.value <= 0 || monthInput.value > 12) {
    monthLabel.classList.add("color__error");
    invalidMonthError.classList.add("active");
    monthInput.classList.add("outline__error");
  } else {
    monthLabel.classList.remove("color__error");
    invalidMonthError.classList.remove("active");
    monthInput.classList.remove("outline__error");
  }

  if (!monthInput.value.trim()) {
    invalidMonthError.innerText = "This field is required";
  }
});
yearInput.addEventListener("input", () => {
  let currentYearCopy = dateObject.getFullYear();
  if (yearInput.value > currentYearCopy) {
    yearLabel.classList.add("color__error");
    invalidYearError.classList.add("active");
    yearInput.classList.add("outline__error");
  } else {
    yearLabel.classList.remove("color__error");
    invalidYearError.classList.remove("active");
    yearInput.classList.remove("outline__error");
  }

  if (!yearInput.value.trim()) {
    invalidYearError.innerText = "This field is required";
  }
});
