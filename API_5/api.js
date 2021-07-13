document.getElementById("my_form").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const searchInput = e.target.query.value;
    e.target.query.value = "";
    newCard(searchInput);
}

function newCard(userInput) {
    document.getElementById("keywordCard").innerHTML = "";
    document.getElementById("container").innerHTML = "";
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    card.id = "keyword"

    card.innerHTML = `<h3 id="title" class="card-text">${userInput}</h3>
    <button id="movie">search movie ${userInput}</button>
    <button id="gif">search gif ${userInput}</button>`

    document.getElementById("keywordCard").appendChild(card);
    document.getElementById("movie").addEventListener("click", handleMovies);
    document.getElementById("gif").addEventListener("click", handleGifs);
    
}

function handleMovies(e) {
    e.preventDefault();
    const searchInput = document.getElementById("title").innerHTML;
    console.log(searchInput);
    getMovies(searchInput);
}

function handleGifs(e) {
    e.preventDefault();
    const searchInput = document.getElementById("title").innerHTML;
    getGifs(searchInput)
}

// function addMovieBtn(input, id) {
//     const btn = document.createElement("button");
//     btn.innerHTML = `search movie ${input}`;
//     btn.name = `${input}`;
//     btn.id = "movie"
//     document.getElementById(id).appendChild(btn);
//     btn.addEventListener("click", getMovies(btn.name));
    

// }

// function addGifBtn(input, id) {
//     const btn = document.createElement("button");
//     btn.innerHTML = `search gif ${input}`;
//     btn.name = `${input}`;
//     btn.id = "gif"
//     document.getElementById(id).appendChild(btn);

// }

function getGifs(userInput) {
    // Build url using our variable
    // https://api.giphy.com/v1/gifs/search?api_key=pLHOw2L9F5ye1VaVrP1QrThNyL4DIVUq&q=VARIABLE&limit=12
   // http://www.omdbapi.com/?apikey=[yourkey]&
   console.log("getGifs")
  
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=pLHOw2L9F5ye1VaVrP1QrThNyL4DIVUq&q=${userInput}&limit=2`;
  
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
      const url = gif.images.fixed_height_small.url;
  
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";
  
      card.innerHTML = 
         `<img src=${url} class="card-img-top" alt=${title}>
         <div class="card-body">
          <p class="card-text">
          ${title}</p>
        </div>`;
  
      document.getElementById("container").appendChild(card);
    }
}

function getMovies(userInput) {

    const URL = `http://www.omdbapi.com/?i=tt3896198&apikey=b9f4e324&s=${userInput}`;
    console.log("getMovies")
  
    fetch(URL)
      .then(res => res.json())
      .then(movies => {
        const movie = movies.Search;
        document.getElementById("container").innerHTML = "";
        showMovies(movie);
      })
      .catch((err) => console.log(err)); 
}
  
function showMovies(movies) {
    for (const movie of movies) {
      const title = movie.Title;
      const year = movie.Year;
      const url = movie.Poster;
  
  
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";
  
      card.innerHTML = `
        <div class="card-body">
          <p class="card-text">
          ${title}</p>
          <p class="card-text">
          ${year}</p>
        </div>
        <img src=${url} class="card-img-bottom" alt=${title}>
      `;
  
      document.getElementById("container").appendChild(card);
    }
}