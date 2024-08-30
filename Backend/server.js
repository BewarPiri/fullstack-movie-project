import express from "express"
import fetch from 'node-fetch'
import dotenv from 'dotenv'

//hent enviroment variabelen fra ".env" filen. 
dotenv.config();

const app = express()
const API_KEY = process.env.API_KEY //denne må være i .env filen
const BASE_URL = process.env.BASE_URL || `http://www.omdbapi.com/?apikey=${API_KEY}&`

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//endpoint for å fetche filmer
app.get('/api/movies', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({error: 'Query is required'})
  }
})

try {
  const response = await fetch(`${BASE_URL}s=${query}`);
  const data = await response.json();
  res.json(data);
} catch (error) {
  res.status(500).json({ error: 'Failed to fetch data from OMDB API' });
}
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

