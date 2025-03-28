// import {movies} from "../data/movies.js"
// // import the movies array from the supplied data file.

document.addEventListener("DOMContentLoaded", async() => {
let movies;    
try{
    const response = await fetch("http://localhost:4000/api/movies");
    const data = await response.json();
    movies = data
}catch(error){
    console.log(error)
}

// write the array to the console, so you can see that they are loading properly
console.log(movies)
/* call insertMoviesIntoTable, 
    give it a reference to the table you want to populate,
    and the list of movies you want to show in the table */
// show the table
const tableBody = document.getElementById("movie-table");
const favMovie = document.getElementById("fav-movie");
insertMoviesIntoTable(tableBody, movies);
const pinnedMoviesArray = movies.filter(movie => movie.rating == 1.4)
localStorage.setItem("pinnedMovies", JSON.stringify(pinnedMoviesArray))
console.log(pinnedMoviesArray)

// get a list of `pinnedMovies` from local storage
// log them out so you can see that you have working pins
// if there are no pinned movies, put a message on the screen that says so
// but if there are, hide the message
/* call insertMoviesIntoTable, 
    give it a reference to the table you want to populate,
    and the list of movies you want to show in the table */
// show the table



/* 
 *  getPinnedMoviesFromStorage
 *  This should take no parameters, and return an array.
 */
function getPinnedMoviesFromStorage() {
    console.log(JSON.parse(localStorage.getItem("pinnedMovies")) || [])
    return JSON.parse(localStorage.getItem("pinnedMovies")) || []
}
getPinnedMoviesFromStorage()
document.getElementById("current-year").textContent = new Date().getDate() + "-" + new Date().getMonth() +1 + "-" + new Date().getFullYear();


/*
 *  insertMoviesIntoTable
 *  This should take two parameters,
 *  - a reference to the table you want to populate
 *  - a list of movies to put in the table
 *  It should return nothing
 */
function insertMoviesIntoTable(eleTable, movies) 
{
// Sort movies by rating (highest to lowest)
    let sortedMovies = movies.sort((a, b) => a.rating - b.rating);
    let newRow = "";
    let favMovieRow = "";

    for (const movie of sortedMovies) {
        // Skip dramas
        if (movie.genre.toLowerCase() === "drama") continue;

        // Convert release date from Unix timestamp to a readable format
        let formattedDate = new Date(movie.release_date * 1000).toLocaleDateString();

        // Determine row color based on rating
        let rowColor = "";
        if (movie.rating <= 2) rowColor = "table-danger";
        else if (movie.rating > 2 && movie.rating <= 5) rowColor = "table-warning";
        else if (movie.rating > 5 && movie.rating <= 8) rowColor = "table-primary";
        else if (movie.rating > 8) rowColor = "table-success";

        // Check if the movie is pinned in local storage
        let pinnedMovies = JSON.parse(localStorage.getItem("pinnedMovies")) || [];
        console.log(pinnedMovies);
        let isPinned = pinnedMovies.some(pinnedMovie => pinnedMovie.title === movie.title)
        console.log(isPinned)
        let buttonColor = isPinned ? "bg-danger pin-btn text-light" : "bg-primary pin-btn text-light";
        let buttonIcon = isPinned ? `<i class="fa-thin fa-x"></i>` : `<i class="fa-solid fa-pencil"></i>`;

       if(isPinned){
        favMovieRow += `
        <tr class = ${rowColor}>
            <td scope="row">${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${formattedDate}</td>
            <td>${movie.director}</td>
            <td>${movie.rating}</td>
            <td>
                <button class="${buttonColor}" data-title="${movie.title}">
                    ${buttonIcon}
                </button>
            </td>
        </tr>
    `;
       }
       newRow += `
       <tr class = ${rowColor}>
           <td scope="row">${movie.title}</td>
           <td>${movie.genre}</td>
           <td>${formattedDate}</td>
           <td>${movie.director}</td>
           <td>${movie.rating}</td>
           <td>
               <button class="${buttonColor}" data-title="${movie.title}">
                   ${buttonIcon}
               </button>
           </td>
       </tr>`;
    }
    eleTable.innerHTML = newRow;
    favMovie.innerHTML = favMovieRow;
     // Add event listeners to buttons
     document.querySelectorAll(".pin-btn").forEach((button) => {
        button.addEventListener("click", function () {
            let movieTitle = this.getAttribute("data-title");
            let pinnedMovies = JSON.parse(localStorage.getItem("pinnedMovies")) || [];

            if (pinnedMovies.includes(movieTitle)) {
                pinnedMovies = pinnedMovies.filter(title => title !== movieTitle);
            } else {
                pinnedMovies.push(movieTitle);
            }

            localStorage.setItem("pinnedMovies", JSON.stringify(pinnedMovies));
            location.reload(); // Refresh the page to update colors and icons
        });
    });
    
}

})