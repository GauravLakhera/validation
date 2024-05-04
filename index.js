const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);

  const validationOption = [
    {
      attribute: "minlength",
      isValid: (input) =>
        input.value && input.value.length >= parseInt(input.minLength, 10),
      errorMessage: (input) =>
        `${input.placeholder} needs to be at least ${input.minLength} character`,
    },
    {
      attribute: "match",
      isValid: (input) => {
        const element = formElement.querySelector("#password");
        return element && element.value.trim() === input.value.trim();
      },
      errorMessage: (input) =>
        `${input.placeholder} should match with Password`,
    },
    {
      attribute: "pattern",
      isValid: (input) => {
        const patternregex = new RegExp(input.pattern);
        return patternregex.test(input.value);
      },
      errorMessage: (input) => `Not a valid ${input.placeholder} address`,
    },
    {
      attribute: "required",
      isValid: (input) => input.value.trim() !== "",
      errorMessage: (input) => `${input.placeholder} is require `,
    },
  ];
  const validateSingleFormGroup = (formGroup) => {
    const error = formGroup.querySelector("h1");
    const input = formGroup.querySelector("input");
    let hasError = false;
    for (const option of validationOption) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        error.textContent = option.errorMessage(input);
        input.classList.remove("border-green-700");
        input.classList.add("border-red-700");

        hasError = true;
      }
    }
    if (!hasError) {
      error.textContent = "";
      input.classList.remove("border-red-700");
      input.classList.add("border-green-700");
    }
  };

  formElement.setAttribute("novalidate", "");
  const inputs = Array.from(formElement.elements);
  inputs.forEach((element) => {
    element.addEventListener("blur", (event) => {
      validateSingleFormGroup(event.srcElement.parentElement);
    });
  });

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    validateAllForm(formElement);
  });
  const validateAllForm = (formTovalidate) => {
    const formGroups = Array.from(formTovalidate.querySelectorAll(".group"));
    let hasErrors = false;

    formGroups.forEach((formGroup) => {
      validateSingleFormGroup(formGroup);
      const error = formGroup.querySelector("h1");
      if (error.textContent) {
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      // No errors found, submit the form
      // Display success image
      const successText = document.createElement("h1");
      successText.textContent = "Sign up Successfully";
      successText.classList.add("success");

      document.body.appendChild(successText); // Append the image to the body or any other container

      setTimeout(() => {
        document.body.removeChild(successText);
        formTovalidate.submit();
      }, 3000); // Remove the image after 3 seconds

      // Submit the form
      
    } else {
      // Errors found, prevent form submission
      console.log("Form has errors. Please correct them before submitting.");
    }
  };
};

validateForm("#form");

const signUpContainer = document.querySelector(".signUp");

const loginContainer = document.querySelector(".Login");

let signUp = true;
const toggelBtn = document.querySelector(".signUpToggel");
const textSignup = document.querySelector(".text_log_sign");

toggelBtn.addEventListener("click", () => {
  signUp = !signUp;
  if (signUp) {
    loginContainer.style.display = "none";
    signUpContainer.style.display = "flex";
    textSignup.textContent = "Alredy have Account ?";
    toggelBtn.textContent = "Log In";
  } else {
    loginContainer.style.display = "flex";
    signUpContainer.style.display = "none";
    textSignup.textContent = "Didn't have Account ? ";
    toggelBtn.textContent = "Sign up";
  }
});
