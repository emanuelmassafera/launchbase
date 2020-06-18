const modalOverlay = document.querySelector(".modal-overlay");
const closeModal = document.querySelector(".close-modal");
const maximizeModal = document.querySelector(".maximize-modal");
const cards = document.querySelectorAll(".card");

for (let card of cards) {
    card.addEventListener("click", function(){
        const courseId = card.getAttribute("id");
        modalOverlay.querySelector("iframe").src = `https://www.rocketseat.com.br/${courseId}`;
        modalOverlay.classList.add("active");
    });
}

closeModal.addEventListener("click", function(){
    modalOverlay.classList.remove("active");
    modalOverlay.querySelector("iframe").src = ``;
    modalOverlay.querySelector(".modal").classList.remove("maximize");
});

maximizeModal.addEventListener("click", function(){
    if(modalOverlay.querySelector(".modal").classList.contains("maximize")){
        modalOverlay.querySelector(".modal").classList.remove("maximize");
    } else {
        modalOverlay.querySelector(".modal").classList.add("maximize")
    }
});