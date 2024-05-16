import "./style.css";

const form = document.querySelector(".form");
const email = document.getElementById("email");
const country = document.getElementById("country");
const zipCode = document.getElementById("zipCode");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

password.type = "password";
password2.type = "password";
const inputFields = [
  {
    name: "email",
    fieldElement: email,
    pattern:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    min: 5,
    max: 20,
  },
  {
    name: "country",
    fieldElement: country,
    pattern: /([A-Za-z]){3,}\s?[A-Za-z]{3,}\w+/,
    min: 4,
    max: 20,
  },
  {
    name: "zipCode",
    fieldElement: zipCode,
    pattern: /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/,
    min: 3,
    max: 8,
  },
  {
    name: "password",
    fieldElement: password,
    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    min: 8,
    max: 20,
  },
  {
    name: "password",
    fieldElement: password2,
    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    min: 8,
    max: 20,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  inputFields.forEach((field) => {
    field.fieldElement.addEventListener("input", () => {
      const value = field.fieldElement.value.trim();
      const errorWindow = document.querySelector(`#${field.name} + .error`);

      showError(field, value, errorWindow);
    });
  });
  const showError = function (field, value, window) {
    const len = value.length;

    if (len < field.min) {
      window.textContent = `${field.name} too short, should be at least ${field.min} characters, you typed ${len} characters`;
      styleInvalidField(field.fieldElement);
    } else if (len > field.max) {
      window.textContent = `${field.name} too long, should be at least ${field.max} characters, you typed ${len} characters`;
      styleInvalidField(field.fieldElement);
    } else if (!validateField(value, field.pattern)) {
      window.textContent = `Please enter correct ${field.name}`;
      styleInvalidField(field.fieldElement);
    } else if (field.name === "password" || field.name === "password2") {
      validatePasswords();
    } else {
      window.textContent = "";
      styleValidField(field.fieldElement);
    }
  };
});

const validateField = function (value, pattern) {
  return pattern.test(value);
};

const validatePasswords = function () {
  const password = inputFields[3].fieldElement;
  const password2 = inputFields[4].fieldElement;
  const window1 = document.querySelector(`#${password.name} + .error`);
  const window2 = document.querySelector(`#${password2.name} + .error`);
  if (password.value === password2.value) {
    styleValidField(password);
    styleValidField(password2);
    window1.textContent = "";
    window2.textContent = "";
    return true;
  } else {
    styleInvalidField(password);
    styleInvalidField(password2);
    window1.textContent = "passwords don't match";
    window2.textContent = "passwords don't match";
  }
};

function styleValidField(elem) {
  if (elem.classList.contains("invalid")) {
    elem.classList.remove("invalid");
  }
  elem.classList.add("valid");
}

function styleInvalidField(elem) {
  if (elem.classList.contains("valid")) {
    elem.classList.remove("valid");
  }
  elem.classList.add("invalid");
}
