const accessKey = "RncztU5B_jMHD74mzo-CohRaiCc4488kb_2RuDz7nto";

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

/* unsplah api */
let keyword ="";
let page = 1;
async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    //clear previous results
    if(page === 1) {
        searchResult.innerHTML = ""; 
    }
    //display
    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img"); //create image element
        image.src = result.urls.small; //small image from api
        const imageLink = document.createElement("a"); //redirect
        imageLink.href = result.links.html;           //
        imageLink.target = "_blank";                  //open link in a new tab

        imageLink.appendChild(image); //append image to link
        searchResult.appendChild(imageLink); //append link to search result
    })
    //show more button
    showMoreBtn.style.display = "block";
}
//search
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});
//show more
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
})