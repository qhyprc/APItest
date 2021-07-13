// When search button is clicked, get user input, store it in a variable
document.getElementById("my_form").addEventListener("submit", handleSubmit);


// Build url using our variable
// https://api.giphy.com/v1/gifs/search?api_key=pLHOw2L9F5ye1VaVrP1QrThNyL4DIVUq&q=VARIABLE&limit=12

// Use url to make a GET request to get data from API, store data in a variable

// Display the data on the page
// title and image url

function handleSubmit(e) {
  e.preventDefault();
  const searchInput = e.target.query.value;

  e.target.query.value = "";

  getGifs(searchInput);
}

function getGifs(userInput) {
  // Build url using our variable
  // https://api.giphy.com/v1/gifs/search?api_key=pLHOw2L9F5ye1VaVrP1QrThNyL4DIVUq&q=VARIABLE&limit=12
 // http://www.omdbapi.com/?apikey=[yourkey]&

  const URL = `https://api.giphy.com/v1/gifs/search?api_key=pLHOw2L9F5ye1VaVrP1QrThNyL4DIVUq&q=${userInput}&limit=5`;

  // Use url to make a GET request to get data from API, store data in a variable
  fetch(URL)
    .then((res) => res.json())
    .then((gifs) => {
      const giphies = gifs.data;
      document.getElementById("container").innerHTML = "";
      showGifs(giphies);
    })
    .catch((err) => console.log(err));
}

function showGifs(gifs) {
  for (const gif of gifs) {
    const title = gif.title;
    console.log(title);
    const url = gif.images.fixed_height_small.url;

    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";

    card.innerHTML = 
       `<img src=${url} class="card-img-top" alt=${title}>
       <div class="card-body">
        <p class="card-text">
        ${title}</p>
      </div>
    `;

    document.getElementById("container").appendChild(card);
  }
}

document.getElementById("my_form").addEventListener("reset", handleNew);

function handleNew(e) {
    e.preventDefault();
    const searchInput = e.target.query.value;
    e.target.query.value = "";
    newKeyBtn(searchInput);
  }

function newKeyBtn(userInput){
    const btn = document.createElement("button");
    btn.innerHTML = `search ${userInput}`;
    btn.name = `${userInput}`;
    document.getElementById("btns").appendChild(btn);
}

document.getElementById("btns").addEventListener("click", handleBtn);

function handleBtn(e){
    const name = e.target.name;
    console.log(e.target.name);
    getGifs(name);
    e.remove();
}
