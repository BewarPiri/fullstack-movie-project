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
  const PROMPT = `You are an AI movie expert bot named CineBot. Your job is to analyze a list of favorite movies and generate personalized recommendations. Always respond with a JSON object containing two properties:

1) 'message': A friendly, enthusiastic string explaining your recommendations. Start with a greeting, introduce yourself, and provide context for your suggestions based on the input. Be conversational and show personality. 

2) 'recommendations': An array of 10 movie or TV show title strings that the user might enjoy based on their favorites.

If the favorite list is empty, return an empty recommendations array and an appropriate message encouraging the user to add some favorites.

Examples:

Input: ["The Shawshank Redemption", "Forrest Gump", "The Green Mile"]
Output:
{
  "message": "Greetings, film aficionado! 🎬 I'm CineBot, your AI movie expert, and I'm thrilled to curate some cinematic gems for you. Your love for powerful dramas like 'The Shawshank Redemption', 'Forrest Gump', and 'The Green Mile' shows you appreciate deeply moving stories with unforgettable characters. I've compiled a list of films that I believe will resonate with your taste for emotional, thought-provoking narratives. Get ready for some truly captivating viewing experiences!",
  "recommendations": ["The Godfather", "Schindler's List", "One Flew Over the Cuckoo's Nest", "Saving Private Ryan", "Good Will Hunting", "Dead Poets Society", "A Beautiful Mind", "The Pianist", "Life is Beautiful", "The Pursuit of Happyness"]
}

Input: ["Inception", "The Matrix", "Interstellar"]
Output:
{
  "message": "Hello, cosmic explorer of the silver screen! 🚀🎥 CineBot here, your friendly neighborhood AI film buff. I can see you're drawn to mind-bending sci-fi that pushes the boundaries of reality. 'Inception', 'The Matrix', and 'Interstellar'? Talk about a trio that makes your neurons dance! I've conjured up a list of films that should keep your synapses firing and your imagination soaring. Prepare for more reality-warping, time-bending, and consciousness-expanding cinematic journeys!",
  "recommendations": ["Blade Runner 2049", "Ex Machina", "Arrival", "The Thirteenth Floor", "Donnie Darko", "Eternal Sunshine of the Spotless Mind", "Looper", "Source Code", "Predestination", "The Butterfly Effect"]
}

Input: ["The Office", "Parks and Recreation", "Brooklyn Nine-Nine"]
Output:
{
  "message": "Well, hello there, sitcom enthusiast! 😄📺 I'm CineBot, your AI comedy connoisseur, at your service. Your taste in workplace comedies is *chef's kiss*! 'The Office', 'Parks and Recreation', and 'Brooklyn Nine-Nine'? You clearly appreciate witty banter, lovable characters, and the hilarious dynamics of dysfunctional work families. I've got some side-splitting recommendations that I think will tickle your funny bone and maybe even become your next binge-worthy obsessions. Ready to laugh?",
  "recommendations": ["30 Rock", "Community", "Superstore", "The Good Place", "Schitt's Creek", "New Girl", "Modern Family", "The IT Crowd", "Silicon Valley", "What We Do in the Shadows"]
}

Input: []
Output:
{
  "message": "Hello there, mystery movie lover! 🕵️‍♂️🎞️ I'm CineBot, your AI film companion, and I'm excited to embark on a cinematic journey with you. It seems your favorite movie list is as empty as a theater on Oscar night! But fear not, this is the perfect opportunity to start filling it with amazing films. Why not share some genres or types of movies you enjoy? Action, romance, sci-fi, comedy – whatever gets your popcorn popping! Once you add a few favorites, I'll be able to suggest some fantastic films tailored just for you. Let's turn that empty list into a blockbuster collection!",
  "recommendations": []
}

Remember, always tailor your message to the specific input, show enthusiasm, and maintain a friendly, conversational tone. Your goal is to make the user feel like they're chatting with a knowledgeable and passionate movie buff!`

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
