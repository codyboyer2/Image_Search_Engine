// API access key
const accessKey = config.myKey

// HTML ids linked to js variables
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("result-container");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

// Search function for API images link
async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    // Waits for return of API url and data
    const response = await fetch(url);
    const data = await response.json();

    // Remove previous images with new search
    if(page === 1){
        searchResult.innerHTML = "";
    }

    const results = data.results;

    // Map array created for img results and img links
    results.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a")
        // Img link opens new tab
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })

    // Show more button appears after find button clicked
    showMoreBtn.style.display = "block"
}

// Prevent default of submit button going to link
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

// Show more button adds more images to page by incrementing page number
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
})