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
    //destrukturer movie objektet for bedre lesbarhet
    const {Title, Year, imdbID, Type, Poster} = movie;
    // SQL-spørring for å sette inn filmen i favouritemovielist-tabellen
    // $1, $2, osv. erfor å forhindre SQL-injeksjon
    const result = await client.query(
      `
      INSERT INTO favouritemovielist (title, year, imdbID, type, poster)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (imdbID) DO NOTHING;
    `,
      [Title, Year, imdbID, Type, Poster]
    );

    if (result.rows.length >= 0) {
      console.log("film lagt til med sukkess.");
      return { success: true, message: "Film lagt til med suksess", movie: result.rows[0]};
    } else {
      console.log("film finnes allerede i databasen.");
      return {success: false, message: "film finnes allerede i databasen"};
    }

  } catch (error) {
    // Logg eventuelle feil som oppstår under innsettingen
    console.error("Feil ved innsetting av film:", error.message);
    console.error("Error details:", error.stack); // More details

    return {
      success: false,
      message: "Feil ved innsetting av film " + error.message, error: error.stack
    }
  } finally {
    // Frigi alltid databasetilkoblingen tilbake til poolen
   if (client) client.release();
  }
}

export async function getMovieList() {
  // Koble til databasen
  const client = await pool.connect();

  try {
    //SQL spørring for å hente alle filmer
    const result = await client.query(`
      SELECT * FROM favouritemovielist;
  `);

    //result.rows er et array med alle movie objectene(filmene)
    const movieList = result.rows;

    // Logg en suksessmelding
if (result.rows.length > 0) {
  console.log(`Movielist hentet med sukksess. Antall filmer: ${movieList.length}`)
} else {
  console.log("ingen filmer funnet i databasen.")
}

return movieList;

  } catch (error) {
    // Logg eventuelle feil som oppstår under innsettingen
    console.error("Feil ved henting av film", error.message);

    return {
      success: false,
      message: "feil ved henting av film" + error.message
    }
  } finally {
    // Frigi alltid databasetilkoblingen tilbake til poolen
   if (client) client.release();
  }
}

export async function deleteMovieByID(imdbid) {
  //gå inn i databasen og slett denne IDen.
  // Koble til databasen
  const client = await pool.connect();
  try {
    // SQL-spørring for å slette filmen fra favouritemovielist-tabellen

    const result = await client.query(
      `
    DELETE FROM favouritemovielist
    WHERE imdbid = $1;
  `,
      [imdbid]
    );

    if (result.rowCount === 0) {
      console.log("kan ikke finne film");
      return{
        sucess: false, 
        message: "kan ikke finne film"
      };
    }

    // Logg en suksessmelding
    console.log("Film slettet med suksess.");
    return{sucess: true};

  } catch (error) {
    // Logg eventuelle feil som oppstår under slettingen
    console.error("Feil ved sletting av film:", error.message);
    return {
      sucess: false,
      message: error.message
    }
  } finally {
    // Frigi alltid databasetilkoblingen tilbake til poolen
   if (client) client.release();
  }
}


