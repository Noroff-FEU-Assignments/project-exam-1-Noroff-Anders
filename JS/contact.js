const form = document.querySelector("#formContact")
const yourName = document.querySelector("#name");
const nameError = document.querySelector("#name-error");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");

const formSuccess = document.querySelector(".div-form-success")

function formVal(event){
    event.preventDefault();

    const inputErrors = [];

    if (yourName.value.length < 5){
        inputErrors.push("1");
        nameError.style.display = "block";
        yourName.style.borderColor = "red";
    } else {
        nameError.style.display = "none"
        yourName.style.borderColor = "black";
    }

    if (subject.value.length < 10){
        inputErrors.push("2");
        subjectError.style.display = "block";
        subject.style.borderColor = "red";
    } else {
        subjectError.style.display = "none";
        subject.style.borderColor = "black";
    }

    if (message.value.length < 25){
        inputErrors.push("3");
        messageError.style.display = "block";
        message.style.borderColor = "red";
    } else {
        messageError.style.display = "none";
        message.style.borderColor = "black";
    }

    if(validEmail(email.value) === false){
        inputErrors.push("4");
        emailError.style.display = "block";
        email.style.borderColor = "red";
    } else {
        emailError.style.display = "none";
        email.style.borderColor = "black";
    };

    if(inputErrors.length === 0){
    form.submit();
    formSuccess.style.display = "block";
    localStorage.setItem("formSubmitted", "true");
  }


}

function validEmail(checkemail) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(checkemail);
  }



form.addEventListener("submit", formVal);


const formSubmitted = localStorage.getItem("formSubmitted");
if (formSubmitted === "true") {
    formSuccess.style.display = "block";
    localStorage.removeItem("formSubmitted");
}
