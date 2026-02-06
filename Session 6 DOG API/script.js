// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Select buttons and containers
  const singleDogButton = document.getElementById('single-dog-button');
  const multipleDogButton = document.getElementById('multiple-dog-button');
  const singleDogContainer = document.getElementById('single-dog-container');
  const multipleDogContainer = document.getElementById('multiple-dog-container');

  // Guard against missing elements
  if (!singleDogButton || !multipleDogButton || !singleDogContainer || !multipleDogContainer) {
    // eslint-disable-next-line no-console
    console.warn('Dog API script: one or more elements missing — script not initialized.');
    return;
  }

  // Helper: extract a readable breed name from the Dog CEO image URL
  function extractBreedFromUrl(url) {
    try {
      const path = new URL(url).pathname; // e.g. /breeds/hound-afghan/n02088094_1003.jpg
      const parts = path.split('/').filter(Boolean);
      const breedIndex = parts.indexOf('breeds');
      if (breedIndex >= 0 && parts.length > breedIndex + 1) {
        const raw = parts[breedIndex + 1];
        // Replace hyphens with spaces and capitalize words
        return raw
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(' ');
      }
    } catch (e) {
      // ignore and return null
    }
    return null;
  }

  // Show and hide loading state for a container and optionally disable a button
  function setLoading(container, button, isLoading) {
    if (isLoading) {
      container.setAttribute('aria-busy', 'true');
      if (button) button.disabled = true;
    } else {
      container.removeAttribute('aria-busy');
      if (button) button.disabled = false;
    }
  }

  // Function to fetch and display a single random dog image
  async function getSingleDogImage() {
    setLoading(singleDogContainer, singleDogButton, true);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const data = await response.json();

      // Clear previous image
      singleDogContainer.innerHTML = '';

      // Create an image element and set attributes
      const img = document.createElement('img');
      img.src = data.message;
      img.alt = extractBreedFromUrl(data.message) || 'Random dog';
      img.loading = 'lazy';
      img.className = 'dog-image';
      img.onerror = () => {
        img.alt = 'Image failed to load';
        img.remove();
        const fallback = document.createElement('p');
        fallback.textContent = 'Image failed to load.';
        singleDogContainer.appendChild(fallback);
      };

      // Append the image to the container
      singleDogContainer.appendChild(img);
    } catch (err) {
      // Show a user-friendly message
      singleDogContainer.innerHTML = '';
      const msg = document.createElement('p');
      msg.textContent = 'Could not load image. Please try again.';
      singleDogContainer.appendChild(msg);
      // eslint-disable-next-line no-console
      console.error('getSingleDogImage error:', err);
    } finally {
      setLoading(singleDogContainer, singleDogButton, false);
    }
  }

  // Function to fetch and display multiple random dog images
  async function getMultipleDogImages() {
    setLoading(multipleDogContainer, multipleDogButton, true);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random/3');
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const data = await response.json();

      // Clear previous images
      multipleDogContainer.innerHTML = '';

      // Build nodes in a fragment for better performance
      const frag = document.createDocumentFragment();

      data.message.forEach((imageUrl) => {
        const imgWrap = document.createElement('div');
        imgWrap.className = 'dog-image-wrap';

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = extractBreedFromUrl(imageUrl) || 'Random dog';
        img.loading = 'lazy';
        img.className = 'dog-image';
        img.onerror = () => {
          // Remove broken image and show small placeholder text
          img.remove();
          const fallback = document.createElement('p');
          fallback.textContent = 'Image failed to load.';
          fallback.className = 'img-fallback';
          imgWrap.appendChild(fallback);
        };

        imgWrap.appendChild(img);
        frag.appendChild(imgWrap);
      });

      multipleDogContainer.appendChild(frag);
    } catch (err) {
      multipleDogContainer.innerHTML = '';
      const msg = document.createElement('p');
      msg.textContent = 'Could not load images. Please try again.';
      multipleDogContainer.appendChild(msg);
      // eslint-disable-next-line no-console
      console.error('getMultipleDogImages error:', err);
    } finally {
      setLoading(multipleDogContainer, multipleDogButton, false);
    }
  }

  // Add event listeners to buttons
  singleDogButton.addEventListener('click', getSingleDogImage);
  multipleDogButton.addEventListener('click', getMultipleDogImages);
});
