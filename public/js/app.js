const button = document.getElementById("myBtn");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const contactForm = document.querySelector('#contact-form');

let fullName = document.getElementById('full_name');
let email = document.getElementById('email');
let phoneNumber = document.getElementById('phone_number');
let message = document.getElementById('message');


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        fullName: fullName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        if (xhr.status == '200') {
            alert(`Thank you for reaching out, ${formData.fullName}`)
            fullName.value = '',
            email.value = '',
            phoneNumber.value = '',
            message.value = ''
            // console.log(xhr.status)
        } else (
            alert ('Something went wrong')
        )
    }

    xhr.send(JSON.stringify(formData));
    
})

button.addEventListener("click", () => {
    modal.style.display = "flex";
})

close.addEventListener("click", () => {
    modal.style.display = "none";
})

window.onload = () => {
    alert("Welcome, I am Oluwatimilehin Idowu")
}

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

