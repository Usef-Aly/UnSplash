






// ^===========> Api Key 
const apiKey = "lygzohYxSxidhn5TDJsHXoBySnH4r8RnOUCAz_iIN2M";


// ^===========> Html Elements 
const formEl = document.querySelector( 'form');
const inputEl = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const searchResults = document.querySelector('.search-results');
const headerTitle = document.querySelector('.header-title');
const showMore = document.querySelector('#show-btn');
let inputData = '';
let page = 1;




// ^===========> Main Part

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    
    if (page === 1 ) {
        searchResults.innerHTML = "";
    }
    
    headerTitle.innerHTML = inputData;


    results.map( (result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.urls_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;


        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);



    })

    page++
    if (page > 1) {
        showMore.style.display = 'block';

    }


}

// ^=============> Events

inputEl.addEventListener("keyup", (e) => {
    const Value = e.currentTarget.value;
    searchBtn.disabled = false;

    if (Value == "") {
        searchBtn.disabled = true;
    }

});



formEl.addEventListener('submit', (e )=>{
    e.preventDefault();
    page = 1;
    searchImages();
} )


showMore.addEventListener('click', ()=>{
        searchImages();

} )
