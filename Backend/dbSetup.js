import pkg from "pg"; // Import the default export from 'pg'
const { Pool } = pkg;

// Function to create the 'movies_db' database if it doesn't exist
const createDatabaseIfNotExists = async () => {
  // Connection pool for the admin-level database in order to create a new database.
  const adminPool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE, // Connect to the default admin database
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  const client = await adminPool.connect();
  try {
    // Check if 'movies_db' database exists
    const result = await client.query(`
        SELECT 1 FROM pg_database WHERE datname = 'movies_db';
      `);

    if (result.rowCount === 0) {
      // Create the 'movies_db' database
      await client.query(`CREATE DATABASE movies_db;`);
      console.log("Database 'movies_db' created successfully.");
    } else {
      console.log("Database 'movies_db' already exists.");
    }
  } catch (error) {
    console.error("Error creating database:", error.message);
  } finally {
    client.release();
  }
};

// Function to set up the 'favouritemovielist' table if it doesn't exist
const setupTableIfNotExists = async () => {
  const movieDbPool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: "movies_db", // Use the new database
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  const client = await movieDbPool.connect();
  try {
    // Check if the 'favouritemovielist' table exists
    const tableCheckResult = await client.query(`
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'favouritemovielist';
      `);

    if (tableCheckResult.rowCount === 0) {
      // Create the table if it doesn't exist
      await client.query(`
          CREATE TABLE favouritemovielist (
            Title TEXT NOT NULL,
            Year VARCHAR(16) NOT NULL,
            imdbID VARCHAR(20) PRIMARY KEY,
            Type TEXT NOT NULL,
            Poster TEXT NOT NULL
          );
        `);
      console.log("Table 'favouritemovielist' created successfully.");
    } else {
      console.log("Table 'favouritemovielist' already exists.");
    }
  } catch (error) {
    console.error("Error checking or creating table:", error.message);
  } finally {
    client.release();
  }
};

// Run the setup process: create the database (if necessary) and the table
export const setupDatabaseAndTable = async () => {
  await createDatabaseIfNotExists();
  await setupTableIfNotExists();
};
