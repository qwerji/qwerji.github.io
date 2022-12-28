const textInput = document.querySelector("#search-input"),
    resultsContainer = document.querySelector("#results-container"),
    postsContainer = document.querySelector("#posts-container");

textInput.addEventListener("keyup", e => {
    setTimeout(() => {
        if (!textInput.value && resultsContainer.childElementCount === 0) {
            postsContainer.style.display = "block";
        } else {
            postsContainer.style.display = "none";
        }
    }, 0);
});
