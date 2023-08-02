import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

interface Movie {
  rank: number;
  title: string;
  rating: string;
}

async function scrapeTop5Movies(): Promise<Movie[]> {
  const url = 'https://www.imdb.com/chart/top/?sort=rank%2Casc';

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const top5Movies: Movie[] = [];

    $('tbody.lister-list tr').each((index, element) => {
      const rank = parseInt($(element).find('.posterColumn span[name="rk"]').text().trim(), 10);
      const title = $(element).find('.titleColumn a').text().trim();
      const rating = $(element).find('.imdbRating strong').text().trim();

      top5Movies.push({ rank, title, rating });
    });

    return top5Movies.slice(0, 5);
  } catch (error) {
    console.error('Error fetching top movies from IMDb:', error);
    return [];
  }
}

const app = express();
const port = 3000;

app.get('/top-movies', async (req, res) => {
  try {
    const top5Movies = await scrapeTop5Movies();
    if (top5Movies.length === 0) {
      res.status(404).json({ error: 'No movies found on IMDB.' });
    } else {
      res.json(top5Movies);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching top movies from IMDB.' });
  }
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:${3000}`);
});
