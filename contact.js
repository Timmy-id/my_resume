const button = document.getElementById("myBtn");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

button.addEventListener("click", () => {
    modal.style.display = "flex";
})

close.addEventListener("click", () => {
    modal.style.display = "none";
})

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}