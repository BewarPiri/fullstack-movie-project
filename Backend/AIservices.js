
// denne filen inneholder alle funksjoner som snakker med OpenAI APIet(AI funksjonalitet)

export async function getRecommendations() {
// 1) hent alle filmer fra favoriteList(bruke samme funksjonene som du allerede har lagd for å fetche movielist??)

// -> disse stegene vil for øyeblikket være getDummyRecommendations(); 
// 2) lag en prompt til AI(getDummyRecommendations();)
// 3) kall OpenAI API med prompten(getDummyRecommendations();)
//4) lagre svaret fra AI som en liste som ser feks slik ut->
//movieRecommendations=["title 1", "title 2", "title 3",] (getDummyRecommendations();)

// 5) for hver tittel i movieRecommendations. søk opp i OMDB og få tak i full MovieObject for hver film. 
// 6) returner hele listen av MovieObject. Returner til frontend og vis i fint UI. 


const getDummyRecommendations = [
    { imdbID: "tt0111161", title: "The Shawshank Redemption", year: "1994", poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" },
    { imdbID: "tt0068646", title: "The Godfather", year: "1972", poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
    { imdbID: "tt0071562", title: "The Godfather: Part II", year: "1974", poster: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
    { imdbID: "tt0468569", title: "The Dark Knight", year: "2008", poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
  ];


};

export default getRecommendations;



