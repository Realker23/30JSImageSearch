const key = "PcDshNUJiTalnNiJjUqkM3-2pZsHhW0ieHxVMPgH-Vs";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResult = document.getElementById("search-result");
const searchBtn = document.getElementById("search-btn");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function fetchdata() {
  const imageUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}&per_page=12`;
  const response = await fetch(imageUrl);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result?.urls?.small;
    const imageLink = document.createElement("a");
    imageLink.href = result?.links?.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
    showMoreBtn.style.display = "block";
  });
}

showMoreBtn.onclick = () => {
  page++;
  fetchdata();
};

searchForm.addEventListener("submit", (e) => {
  //   searchResult.removeChild(image);
  e.preventDefault();
  page = 1;
  keyword = searchInput.value;
  fetchdata();
});
