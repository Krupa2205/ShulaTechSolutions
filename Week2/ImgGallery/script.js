// Wait for config.js to load
window.onload = function () {
    const gallery = document.getElementById("gallery");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const darkModeToggle = document.getElementById("darkModeToggle");

    let page = 1;
    let query = "random";
    const apiKey = CONFIG.API_KEY;  // Fetch API key from config.js
    const perPage = 15;

    // Fetch images from Unsplash API
    async function fetchImages() {
        const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${query}&client_id=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch images");

            const data = await response.json();
            displayImages(data.results);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    // Display images in gallery
    function displayImages(images) {
        images.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = image.urls.regular;
            imgElement.alt = image.alt_description;
            gallery.appendChild(imgElement);
        });
    }

    // Search images
    searchBtn.addEventListener("click", () => {
        gallery.innerHTML = "";
        page = 1;
        query = searchInput.value.trim();
        if (query !== "") fetchImages();
    });

    // Filter images by category
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            gallery.innerHTML = "";
            page = 1;
            query = btn.getAttribute("data-category");
            fetchImages();
        });
    });

    // Infinite Scrolling
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            page++;
            fetchImages();
        }
    });

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Change button icon
        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.textContent = "☀️";
            localStorage.setItem("darkMode", "enabled");
        } else {
            darkModeToggle.textContent = "🌙";
            localStorage.setItem("darkMode", "disabled");
        }
    });

    // Load saved dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️";
    }

    // Initial Load
    fetchImages();
};
