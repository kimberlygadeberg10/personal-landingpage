// Asynchronous function to fetch a random dog image from the Dog CEO API and display it on the page
async function loadDog() {
  try {
    // Fetch a random dog image from the Dog CEO API
    const response = await fetch("https://dog.ceo/api/breeds/image/random");

    // Parse the JSON response to get the dog image URL
    const data = await response.json();

    // Get the dog card element from the DOM
    const dogCard = document.getElementById("dog-card");

    // Update the dog card with the fetched image
    dogCard.innerHTML = `
        <h2>Random Dog</h2>
        <img src="${data.message}" width="200" alt="Random Dog">
        `;
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching dog image:", error);
  }
}

// call the loadDog function when the page loads to display a random dog image
loadDog();

// Asynchronous function to fetch a random cat image from the Cat API and display it on the page
async function loadCat() {
  try {
    // Fetch a random cat image from the Cat API
    const response = await fetch("https://api.thecatapi.com/v1/images/search");

    // Parse the JSON response to get the cat image data
    const data = await response.json();

    // Get the cat card element from the DOM
    const catCard = document.getElementById("cat-card");

    //Update the cat card with fetched image
    catCard.innerHTML = `
        <h2>Random Cat</h2>
        <img src="${data[0].url}" width="200" alt="Random Cat">
        `;
  } catch (error) {
    //Handling any errors that occur during the fetch operation
    console.error("Error fetching cat image:", error);
  }
}

// call the loadCat function when the page loads to display a random cat image
loadCat();

// Asynchronous to fetch weather data for a specific city
async function loadWeather() {
  try {
    // Fetch weather data for Chicago, Illinois
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.8781&longitude=-87.6298&current_weather=true",
    );

    // Parse the JSON response to get the weather data
    const data = await response.json();

    // Get the weather card element from the DOM
    const weatherCard = document.getElementById("weather-card");

    // Update the weather card with fetched data
    weatherCard.innerHTML = `
        <h2>Current Weather in Chicago, Illinois</h2>
        <p>Temperature: ${data.current_weather.temperature}°C</p>
        <p>Wind Speed: ${data.current_weather.windspeed} km/h</p>
        `;
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching weather data:", error);
  }
}

// call the loadWeather function when the page loads to display current weather data for Chicago, Illinois
loadWeather();

//Asynchronous function to fetch currency exchange rates from USD to Euro
async function loadCurrency() {
  try {
    // Fetch currency exchange rates from USD to Euro
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD",
    );

    // Parse the JSON response to get the exchange rate data
    const data = await response.json();

    //Select the currency card element from the DOM
    const currencyCard = document.getElementById("currency-card");

    // Update the currency card with fetched exchange rate
    currencyCard.innerHTML = `
        <h2>Currency Exchange Rate</h2>
        <p>1 USD = ${data.rates.EUR} EUR</p>
        `;
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching currency exchange rate:", error);
  }
}

// call the loadCurrency function when the page loads to display current exchange rate from USD to Euro
loadCurrency();

let movies = [];
let currentIndex = 0;
//Asynchronous function to fetch trending movies from the TMDB API and display them on the page
async function loadMovies() {
  try {
    // Fetch trending movies from the TMDB API
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=921d8916dbbf2ab83e882f8d1fc9f059",
    );

    // Parse the JSON response to get the movie data
    const data = await response.json();
    movies = data.results.slice(0, 10); // Store the first 10 movies in the global variable

    showMovie(); // Display the first movie when the page loads
    startCarousel(); // Start the carousel to automatically show the next movie every 5 seconds
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching trending movies:", error);
  }
}
function showMovie() {
  const movieCard = document.getElementById("movie-card");
  const movie = movies[currentIndex];

  movieCard.innerHTML = `
        <h2>Trending Movie</h2>
        <h3>${movie.title}</h3>
        <p>Rating: ${movie.vote_average}/10</p>
        <img 
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
            alt="${movie.title}"
            width="200"
        >
    `;
}

function startCarousel() {
  setInterval(() => {
    currentIndex++;

    if (currentIndex >= movies.length) {
      currentIndex = 0; // loop back to start
    }

    showMovie();
  }, 3000); // change every 30 seconds
}

loadMovies();

// GitHub Fetch Button Event Listener
document.getElementById("fetch-github").addEventListener("click", async () => {
  const username = document.getElementById("github-username").value.trim();
  const githubProfile = document.getElementById("github-profile");

  if (!username) {
    githubProfile.innerHTML = "<p>Please enter a GitHub username.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    githubProfile.innerHTML = `
      <img src="${data.avatar_url}" width="100" alt="Profile Picture">
      <p><strong>Username:</strong> ${data.login}</p>
      <p><strong>Name:</strong> ${data.name || "N/A"}</p>
      <p><strong>Public Repositories:</strong> ${data.public_repos}</p>
      <p><strong>Followers:</strong> ${data.followers}</p>
      <a href="${data.html_url}" target="_blank">View Profile on GitHub</a>
    `;
  } catch (error) {
    githubProfile.innerHTML = "<p>User not found. Try another username.</p>";
    console.error("Error fetching GitHub user data:", error);
  }
});

//Asynchronous function to fetch a random joke from the Official Joke API and display it on the page
async function loadJoke() {
  try {
    // Fetch a random joke from the Official Joke API
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke",
    );

    // Parse the JSON response to get the joke data
    const data = await response.json();

    // Get the joke card element from the DOM
    const jokeCard = document.getElementById("joke-card");

    // Update the joke card with fetched joke
    jokeCard.innerHTML = `
        <h2>Random Joke</h2>
        <p>${data.setup}</p>
        <p><em>${data.punchline}</em></p>
        `;
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching joke:", error);
  }
}

// call the loadJoke function when the page loads to display a random joke
loadJoke();

//Asynchronous function to fetch a random piece of advice from the Advice Slip API and display it on the page
async function loadAffirmation() {
  const affirmationCard = document.getElementById("custom-card");

  try {
    const response = await fetch("https://api.adviceslip.com/advice");

    const data = await response.json();

    affirmationCard.innerHTML = `
      <h2>Daily Advice</h2>
      <p>${data.slip.advice}</p>
    `;
  } catch (error) {
    console.error("Error fetching affirmation:", error);

    affirmationCard.innerHTML = `
      <h2>Daily Advice</h2>
      <p>Stay patient. Great things take time.</p>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadAffirmation);