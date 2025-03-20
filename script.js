const email = document.querySelector("#email");
const emailError = document.querySelector("#email + .error");
const country = document.querySelector("#countryOptions");
const countryError = document.querySelector("#countryOptions + .error");
const postcode = document.querySelector("#postcode");
const postcodeError = document.querySelector("#postcode + .error");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#password + .error");
const passwordConfirm = document.querySelector("#passwordConfirm");
const passwordConfirmError = document.querySelector(
  "#passwordConfirm + .error"
);

email.addEventListener("input", (e) => {
  if (email.validity.valid) {
    if (!email.value.endsWith("@example.com")) {
      emailError.textContent = "Please enter an email address of @example.com";
      emailError.className = "error active";
      return;
    }
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showEmailError();
  }
});

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be atleast ${email.minLength} characters; you entered ${email.value.length}`;
  }
  emailError.className = "error active";
}

country.addEventListener("change", () => {
  checkPostalCode();
});
postcode.addEventListener("input", () => {
  checkPostalCode();
});

function checkPostalCode() {
  const constraints = {
    gr: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    in: [
      "^\\d{6}$",
      "Indian postal codes must have exactly 6 digits: e.g. 110001",
    ],
    ru: [
      "^(RUS-)?\\d{6}$",
      "Russian postal codes must have exactly 6 digits: e.g. RUS-123456 or 123456",
    ],
  };

  const countryValue = country.value;
  const constraint = new RegExp(constraints[countryValue][0], "");
  console.log(constraint);

  if (constraint.test(postcode.value)) {
    postcodeError.textContent = "";
    postcodeError.className = "error";
  } else {
    postcodeError.textContent = constraints[countryValue][1];
    postcodeError.className = "error active";
  }
}

password.addEventListener("input", () => {
  checkPassword();
});

function checkPassword() {
  //atleast 8 digits long
  //atleast one lowercase, uppercase letter, number, special alphabet

  const acceptablePasswordPattern =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  const constraint = new RegExp(acceptablePasswordPattern, "");

  console.log(password.value, constraint.test(password.value));
  if (constraint.test(password.value)) {
    passwordError.textContent = "";
    passwordError.className = "error";
  } else {
    passwordError.textContent =
      "Please enter a password that contains atleast 8 characters, a lowercase letter, an uppercase letter, a number and a special alphabet.";
    passwordError.className = "error active";
  }
}

passwordConfirm.addEventListener("input", () => {
    checkPasswordConfirm();
});

function checkPasswordConfirm() {
    const passwordInput = password.value;

    console.log(passwordConfirm.value, passwordInput);
    if (passwordConfirm.value === passwordInput) {
        passwordConfirmError.textContent = "";
        passwordConfirmError.className = "error";
    } else {
        passwordConfirmError.textContent = "Please enter the exact password that you entered.";
        passwordConfirmError.className = "error active";
    }
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    const requiredElements = document.querySelectorAll('[required]');
    requiredElements.forEach(element => {
        if (element.value === "") {
            e.preventDefault();
            console.log(element);
        }
    });

    const allErrorActives = document.querySelectorAll(".error.active");
    if (allErrorActives.length != 0) {
        e.preventDefault();
    }
});