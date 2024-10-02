// denne filen inneholder alle funksjoner som snakker med OpenAI APIet(AI funksjonalitet)
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
const API_KEY = process.env.API_KEY; // API key from .env file
const BASE_URL =
  process.env.BASE_URL || `http://www.omdbapi.com/?apikey=${API_KEY}&`;

//beskriv denne funksjonen
export async function getRecommendations() {
  // 1) hent alle filmer fra favoriteList(bruke samme funksjonene som du allerede har lagd for å fetche movielist??)
  // her må jeg implementere "hente alle favoritemovies"


  
  // -> disse stegene vil for øyeblikket være getDummyTitles();
  // 2) lag en prompt til AI(getDummyRecommendations();)
  // 3) kall OpenAI API med prompten(getDummyRecommendations();)
  //4) lagre svaret fra AI som en liste som ser feks slik ut->
  //movieRecommendations=["title 1", "title 2", "title 3",] (getDummyRecommendations();)
  const movieTitles = getDummyTitles();



  // 5) for hver tittel i movieRecommendations. søk opp i OMDB og få tak i full MovieObject for hver film.
  // her må jeg gå igjennom "movieTitles" og hente movie objects fra OMDB. 
  const recommendedMovies = await getMovieListFromTitles (movieTitles);

  // 6) returner hele listen av MovieObject. Returner til frontend og vis i fint UI.
  return recommendedMovies;
}

//beskriv denne funksjonen?
async function getMovieListFromTitles (movieTitles) {
    //gå gjennom hver tittel og hent hele movie objektet
    let movieList = [];
    for (let i = 0; i < movieTitles.length; i++ ) {
        let movieObject = await getMovieFromOmdbApi(movieTitles[i]);
        if (movieObject == null) {
            console.log("fant ikke movie for for tittel: " + movieTitles[i] )
            continue
        }
        console.log("legger til movie i movielist: " + movieObject.Title)
        movieList.push(movieObject);
    }
    return movieList;
}

//beskriv denne funksjonen
async function getMovieFromOmdbApi(title) {
    console.log("getMovieFromOmdbApi: kalt med tittel: " + title);
    try {
        console.log("fetch " + `${BASE_URL}s=${title}`)
        const response = await fetch(`${BASE_URL}s=${title}`);
        const data = await response.json();
        const movieList = data.Search;
        console.log(movieList);
        const movieObject = movieList[0];
        console.log("movieObject er: " + movieObject);
        if(movieObject.response === "False") {
            throw new error(movieObject.error);
        }
        return movieObject;

}
    catch (error) {
        console.error("failed to find movie with title: " + title + "error: " + error);
        return null;
}
};

// denne funksjonen "mocker" hva OpenAI skal returnere i realiteten. 
function getDummyTitles() {
  return ["The Shawshank Redemption", "The Godfather", "The Dark Knight"];
}


// slik ønsker vi å returnere recommendations til frontend etter vi har gjort en GET request til OMDB APIet for hver tittel. 
function getDummyRecommendations() {
  return [
    {
      imdbID: "tt0111161",
      title: "The Shawshank Redemption",
      year: "1994",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0068646",
      title: "The Godfather",
      year: "1972",
      poster:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0071562",
      title: "The Godfather: Part II",
      year: "1974",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0468569",
      title: "The Dark Knight",
      year: "2008",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    },
  ];
}

export default getRecommendations;
