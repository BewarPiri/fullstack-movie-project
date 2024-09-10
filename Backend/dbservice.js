import pkg from "pg";
const { Pool } = pkg;

      // Opprett en tilkoblingspool for å kommunisere med PostgreSQL-databasen
      const pool = new Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: "movies_db",
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
      });

export async function addMovie(movie) {

  // Koble til databasen
  const client = await pool.connect();
  
  try {
    // SQL-spørring for å sette inn filmen i favouritemovielist-tabellen
    // $1, $2, osv. erfor å forhindre SQL-injeksjon
    await client.query(`
      INSERT INTO favouritemovielist (title, year, imdbID, type, poster)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (imdbID) DO NOTHING;
    `, [movie.title, movie.year, movie.imdbID, movie.type, movie.poster]);

    // Logg en suksessmelding
    console.log("Film lagt til med suksess.");
    return true;
    
  } catch (error) {
    // Logg eventuelle feil som oppstår under innsettingen
    console.error("Feil ved innsetting av film:", error.message);
    return false;
    
  } finally {
    // Frigi alltid databasetilkoblingen tilbake til poolen
    client.release();
  }
}

export async function getMovieList() {
  
  // Koble til databasen
  const client = await pool.connect();
  
  try {
 //SQL spørring for å hente alle filmer
    const result = await client.query(`
      SELECT * FROM favouritemovielist;
  `)

  //result.rows er et array med alle movie objectene(filmene)
  const movieList = result.rows;

    // Logg en suksessmelding
    console.log("hentet movielist: " + JSON.stringify(movieList));
    return movieList;

  } catch (error) {
    // Logg eventuelle feil som oppstår under innsettingen
    console.error("Feil ved henting av film", error.message);
    return [];
    
  } finally {
    // Frigi alltid databasetilkoblingen tilbake til poolen
    client.release();
  }
}

export async function deleteMovieByID(imdbID) {
//gå inn i databasen og slett denne IDen. 
}



