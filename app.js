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
const invalidDayError = document.querySelector(".container__error-day");
const invalidMonthError = document.querySelector(".container__error-month");
const invalidYearError = document.querySelector(".container__error-year");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userDate = Number(dayInput.value);
  const userMonth = Number(monthInput.value);
  const userYear = Number(yearInput.value);

  const dateObject = new Date();
  const currentDate = dateObject.getDate();
  const currentMonth = dateObject.getMonth() + 1;
  const currentYear = dateObject.getFullYear();

  let calculatedYear = 0;
  let calculatedMonth = 0;
  let calculatedDate = 0;
  let isValid = true;

  function calculateAge() {
    calculatedYear = currentYear - userYear;
    calculatedMonth = currentMonth - userMonth;
    calculatedDate = currentDate - userDate;

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
  }
  resetAllErrors();

  function showInvalidError() {
    if (
      dayInput.value.trim() !== "" &&
      (isNaN(userDate) || userDate < 1 || userDate > 31)
    ) {
      invalidDayError.innerText = "Must be a valid day";
      invalidDayError.classList.add("active");
      dayLabel.classList.add("color__error");
      dayInput.classList.add("outline__error");
      isValid = false;
    }

    if (
      monthInput.value.trim() !== "" &&
      (isNaN(userMonth) || userMonth < 1 || userMonth > 12)
    ) {
      invalidMonthError.innerText = "Must be a valid month";
      invalidMonthError.classList.add("active");
      monthLabel.classList.add("color__error");
      monthInput.classList.add("outline__error");
      isValid = false;
    }

    if (
      yearInput.value.trim() !== "" &&
      (isNaN(userYear) || userYear > currentYear)
    ) {
      invalidYearError.innerText = "Must be in the past";
      invalidYearError.classList.add("active");
      yearLabel.classList.add("color__error");
      yearInput.classList.add("outline__error");
      isValid = false;
    }
  }

  showInvalidError();

  function showEmptyError() {
    if (!dayInput.value.trim()) {
      invalidDayError.innerText = "This field is required";
      invalidDayError.classList.add("active");
      isValid = false;
    }
    if (!monthInput.value.trim()) {
      invalidMonthError.innerText = "This field is required";
      invalidMonthError.classList.add("active");
      isValid = false;
    }
    if (!yearInput.value.trim()) {
      invalidYearError.innerText = "This field is required";
      invalidYearError.classList.add("active");
      isValid = false;
    }
  }
  showEmptyError();

  function validAgeInput() {
    if (isValid) {
      displayAge();
      const timeOutId = setTimeout(() => {
        form.reset();
        yearOutput.innerText = "- -";
        monthOutput.innerText = "- -";
        dayOutput.innerText = "- -";
      }, 5000);
      return timeOutId;
    }
  }

  validAgeInput();

  function displayAge() {
    yearOutput.innerText = calculateAge()[0];
    monthOutput.innerText = calculateAge()[1];
    dayOutput.innerText = calculateAge()[2];
  }
});

dayInput.addEventListener("input", () => {
  if (dayInput.value) {
    invalidDayError.classList.remove("active");
  }
});
monthInput.addEventListener("input", () => {
  if (monthInput.value) {
    invalidMonthError.classList.remove("active");
  }
});
yearInput.addEventListener("input", () => {
  if (yearInput.value) {
    invalidYearError.classList.remove("active");
  }
});

[dayInput, monthInput, yearInput].forEach((input) =>
  input.addEventListener("keydown", (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  })
);
