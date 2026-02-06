// Asynchronous function to fetch a random dog image from the Dog CEO API and display it on the page
async function loadDog() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        const dogCard = document.getElementById('dog-card');

        dogCard.innerHTML =`
        <h2>Random Dog</h2>
        <img src="${data.message}" width="200" alt="Random Dog">
        `;
    } catch (error) {
        console.error("Error fetching dog image:", error);
    }
}

// call the loadDog function when the page loads to display a random dog image
loadDog();