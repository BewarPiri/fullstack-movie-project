// denne filen inneholder alle funksjoner som snakker med OpenAI APIet(AI funksjonalitet.

{/*
1) Hent favorittfilmer fra databasen.
2) Bruk Ai til å generere anbefalinger basert på disse favorittene.
3) hent fullstendige filmdetaljer for hver anbefalte tittel fra OMDB API.
4) Returner listen over anbefalte filmer med fullstendige detaljer.
*/}
import dotenv from "dotenv";
import { getMovieListTitles } from "./dbservice.js";
import OpenAI from "openai";

dotenv.config(); // Load environment variables from .env file
const API_KEY = process.env.API_KEY; // API key from .env file
const API_KEY_OPENAI = process.env.API_KEY_OPENAI;
const openai = new OpenAI({ apiKey: API_KEY_OPENAI });
const BASE_URL =
  process.env.BASE_URL || `http://www.omdbapi.com/?apikey=${API_KEY}&`;

{/*
  Hovedfunksjonen som styrer hele "recommendation"-prosessen
//den kaller på getAirecommendations() for å få en liste over anbefalte filmtitler, deretter kaller
//vi på getMovieListFromTitles() for å konvertere disse titlene til fulle filmobjekter.
//den returnerer listen med anbefalte filmobjekter
*/}
export async function getRecommendations() {

{/*
  denne funksjonen interagerer med OpenAI API for å få film recommendations.
  først får den en liste med favoritt film titler fra databasen,
  så sender den en prompt til AI, inkludert disse favoritttitlene.
  Ai-en genererer anbefalinger basert på favorittene. 
  så returneres det et objekt med en melding og en array av anbefalte filmtitler. 
*/}
  const aiResponseObject = await getAiRecommendations();
  //const movieTitles = AiResponsObject.recommondations ?? [];
  let movieTitles = [];
  if(aiResponseObject != null && aiResponseObject.recommendations != null && aiResponseObject.recommendations.length > 0) {
    movieTitles = aiResponseObject.recommendations
  }
  const aiMessage = aiResponseObject.message;
  console.log("this is the message from AI: ", aiMessage)
  console.log("AI recommended titles: ", movieTitles)
  if(aiResponseObject == null || movieTitles.length == 0) {
    console.log("No movie titles recommended by AI");
      const recommendationObject = {
        message: aiMessage,
        recommendedMovies: [],
      }
      return recommendationObject;
  }

  {/*
  for hver tittel i movieRecommendations. søk opp i OMDB og få tak i full MovieObject for hver film.
  her må jeg gå igjennom "movieTitles" og hente movie objects fra OMDB. 
  */}
  const recommendedMovies = await getMovieListFromTitles(movieTitles);

  const recommendationObject = {
    message: aiMessage,
    recommendedMovies: recommendedMovies
  }

  //returner hele listen av MovieObject. Returner til frontend og vis i fint UI.
  return recommendationObject;
}

{/* 
  få AI genererte film recommendations. 
  Her kommuniserer vi med OpenAi APIet for å få filmanbefalinger. 
  Først henter vi en liste over favorittfilmtitler fra databasen. Deretter sender vi en prompt 
  til AIen, inkludert disse favorrittitlene. AIen genererer anbefalinger basert på favorittene.
  Den returnerer et objekt med en melding og en array av anbefalte filmtitler. 
  */}
export async function getAiRecommendations() {
  console.log("nå kjører: getAiRecommendations");
  const favoriteTitles = await getMovieListTitles();
  const PROMPT = `You are a recommendation bot, an AI movie expert. Analyze the input list of favorite movies and provide recommendations. Respond with a JSON object containing:

1) 'message': A friendly greeting that:
   - Introduces you as an AI movie recommendation bot
   - Comments on the user's movie tastes
   - Briefly explains your recommendations
   - Uses a conversational tone and 1-2 relevant emojis
   - Is at least 3 sentences long

2) 'recommendations': An array of 10 movie or TV show titles based on the input.

For an empty input, encourage the user to add favorites.

Example:

Input: ["The Matrix", "Inception"]
Output:
{
  "message": "Hello, movie enthusiast! 🎬 I'm a recommendation bot, your AI movie guru. Your love for mind-bending sci-fi like 'The Matrix' and 'Inception' shows you enjoy thought-provoking films. I've selected some movies that will keep your mind buzzing with excitement. Get ready for a cinematic journey that challenges reality! 🚀",
  "recommendations": ["Blade Runner 2049", "Ex Machina", "Interstellar", "Source Code", "The Thirteenth Floor", "Donnie Darko", "Eternal Sunshine of the Spotless Mind", "Looper", "Arrival", "Predestination"]
}

Always maintain the JSON structure and tailor your response to the user's preferences.`

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
    const aiResponseObject = JSON.parse(aiMessage);
    console.log("dette er aiResponseObject: " + JSON.stringify(aiResponseObject));
    return aiResponseObject;
  } catch (error) {
    console.error("AI failed to fetch recommendations " + "error" + error);
    return null;
  }
}

{/*
returnerer movieObject gitt en tittel.
returnerer det første resultatet fra omdb-apiet. Men den trenger bare en tittel for å få tak i hele objektet.
*/}
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

{/*
  Her tar vi en array av filmtitler og konverterer dem til en array av filmobjekter.
vi bruker getMovieFromOmdbApi() for å hente detaljer for hver tittel. 
for hver tittel som ikke returnerer et gyldig filmobjekt hopper vi over. 
så returnerer vi et array av filmobjekter. 
*/}
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
