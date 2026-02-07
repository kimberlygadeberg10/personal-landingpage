// Asynchronous function to fetch a random dog image from the Dog CEO API and display it on the page
async function loadDog() {
    try {
        // Fetch a random dog image from the Dog CEO API
        const response = await fetch("https://dog.ceo/api/breeds/image/random");

        // Parse the JSON response to get the dog image URL
        const data = await response.json();

        // Get the dog card element from the DOM
        const dogCard = document.getElementById('dog-card');

        // Update the dog card with the fetched image
        dogCard.innerHTML =`
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
        const catCard = document.getElementById('cat-card');

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
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.8781&longitude=-87.6298&current_weather=true');
        
        // Parse the JSON response to get the weather data
        const data = await response.json();

        // Get the weather card element from the DOM
        const weatherCard = document.getElementById('weather-card');

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