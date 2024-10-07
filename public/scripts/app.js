const commentButtons = document.querySelectorAll(".comment-btns")

commentButtons.forEach((commentButton) => {
    commentButton.addEventListener("click", (e) => {
        const hiddenDiv = document.querySelector(`#${e.target.dataset.postid}`)
        hiddenDiv.classList.toggle("hidden")
    })
})