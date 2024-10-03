// denne filen inneholder alle funksjoner som snakker med OpenAI APIet(AI funksjonalitet)
import dotenv from "dotenv";
import { getMovieListTitles } from "./dbservice.js";
import OpenAI from "openai";

dotenv.config(); // Load environment variables from .env file
const API_KEY = process.env.API_KEY; // API key from .env file
const API_KEY_OPENAI = process.env.API_KEY_OPENAI;
const openai = new OpenAI({ apiKey: API_KEY_OPENAI });
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

  const movieTitles = await getAiRecommendations();
  if(movieTitles == null) {
    return [];
  }

  // 5) for hver tittel i movieRecommendations. søk opp i OMDB og få tak i full MovieObject for hver film.
  // her må jeg gå igjennom "movieTitles" og hente movie objects fra OMDB.
  const recommendedMovies = await getMovieListFromTitles(movieTitles);

  // 6) returner hele listen av MovieObject. Returner til frontend og vis i fint UI.
  return recommendedMovies;
}

export async function getAiRecommendations() {
  console.log(" når kjører: getAiRecommendations");
  const favoriteTitles = await getMovieListTitles();
  const PROMPT = `You are a movie recommender. Your job is to analyze an input of a list of favorite movies, and generate a new list of recommendations
                    Please make recommendations based on the genre and type(movies or series). Always reply with a javascript array of strings.
                    always return 20 recommendations. If the favorite list is empty, simply return an empty list.
                    example input: ["Batman", "300", "James Bond"]
                    example output: ["Spiderman", "Troy", "mission impossible"]
                    `;

  console.log("favorite titles er: " + JSON.stringify(favoriteTitles));

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: PROMPT },
        {
          role: "user",
          content: JSON.stringify(favoriteTitles),
        },
      ],
    });

    let aiMessage = completion.choices[0].message.content;
    console.log("AIen svarer: " + JSON.stringify(aiMessage));
    const aiRecommendationList = JSON.parse(aiMessage);
    return aiRecommendationList;
  } catch (error) {
    console.error("AI failed to fetch recommendations " + "error" + error);
    return null;
  }
}

//returnerer movieObject gitt en tittel.
//returnerer det første resultatet fra omdb-apiet. Men den trenger bare en tittel for å få tak i hele objektet.
async function getMovieFromOmdbApi(title) {
  console.log("getMovieFromOmdbApi: kalt med tittel: " + title);
  try {
    const response = await fetch(`${BASE_URL}s=${title}`);
    const data = await response.json();
    const movieList = data.Search;
    const movieObject = movieList[0];
    return movieObject;
  } catch (error) {
    console.error(
      "failed to find movie with title: " + title + "error: " + error
    );
    return null;
  }
}

//beskriv denne funksjonen?
async function getMovieListFromTitles(movieTitles) {
  //gå gjennom hver tittel og hent hele movie objektet
  let movieList = [];
  for (let i = 0; i < movieTitles.length; i++) {
    let movieObject = await getMovieFromOmdbApi(movieTitles[i]);
    if (movieObject == null) {
      console.log("fant ikke movie for for tittel: " + movieTitles[i]);
      continue;
    }
    console.log("legger til movie i movielist: " + movieObject.Title);
    movieList.push(movieObject);
  }
  return movieList;
}

export default getRecommendations;
