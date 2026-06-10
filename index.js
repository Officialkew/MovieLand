
const API_URL = 'https://omdbapi.com/?apikey=64524f73';
let searchInput = document.getElementById('searchInput');
let loader = document.querySelector('.loader');
let allMovies=[];
async function fetchMovies() {
  try {
    // 1. Send the HTTP request
    const response = await fetch(API_URL+'&page'); // Example: searching for movies with "avengers" in the title
    
    // 2. Check if the response status is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // 3. Extract the JSON data from the response
    const data = await response.json();
    
    // 4. Log or use your movie data
    console.log(data);
    
  } catch (error) {
    // Handle network errors or server exceptions
    console.error('Failed to fetch movies:', error);
  }
}

// Call the function to execute the fetch
function searchMovies() {

   
  console.log(searchInput.value);
    // MoviesGrid element
    const MoviesGrid = document.
        getElementById('MoviesGrid');
        MoviesGrid.innerHTML = '';

        
        loader.style.display = 'flex';
        


    // Search result validation
    if (searchInput.value.trim() !== '') {

        
// Fetch movie data from OMDB API
        fetch(`${API_URL}&s=${searchInput.value}`)
            .then(response => response.json())
            .then(data => {
                if (data.Search && data.Search.length > 0) {
                    setTimeout(() => {
                    renderMovies(data.Search);
                    allMovies = data.Search;
                    }, 2000);
                } else {
                    MoviesGrid.innerHTML =
             '<p class=main>No movies found with the given name!</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                MoviesGrid.innerHTML =
           '<p>Error fetching movies. Please try again later.</p>';
            });
    } else {
        alert('Enter a movie title then search!');
    }
    
}
// Function to render movies in the MoviesGrid
function renderMovies(movies) {
    const MoviesGrid = document.
        getElementById('MoviesGrid');

    // Clear previous results
    MoviesGrid.innerHTML = '';

    // Display each movie in the results
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
<div>
    <img src="${movie.Poster}" alt="Movie Poster" />
    <div class="title-box"></div>
    <div class="name">${movie.Title}</div>
   
</div>

      
    `;

        MoviesGrid.appendChild(movieCard);
    });
    loader.style.display = 'none';
}

searchInput.addEventListener('keypress',(event) => {
    if (event.key === 'Enter') {
        searchMovies();
    }
});

// Year filter functionality
function filterMovies() {
    const selectedYear = parseInt(yearSlider.value, 10);
    var output = document.getElementById("selectedYear");
    output.textContent = selectedYear === 1900 ? "All" : selectedYear;
    console.log(selectedYear);
    

    const filtered = allMovies.filter(movie => {
        const releaseYear = parseInt(movie.Year.split('–')[0], 10); // Handle ranges like 1999–2004
        
        // If slider is at 1900, show all. Otherwise, filter by year.
        return selectedYear === 1900 ? true : releaseYear >= selectedYear;
    });
 console.log(filtered);
renderMovies(filtered);
}

yearSlider.addEventListener('input', filterMovies);
