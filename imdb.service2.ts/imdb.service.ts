import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

interface Movie {
  title: string;
  rating: string;
}

async function scrapeTop5ActionMovies(): Promise<Movie[]> {
  const url = 'https://www.imdb.com/search/title/?genres=Action&ref_=nv_sr_srsg_0_tt_6_nm_1_q_action';

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const top5ActionMovies: Movie[] = [];

    // Assuming the movie titles and ratings are contained within the elements with class 'lister-item-content'
    $('.lister-item-content').each((index, element) => {
      const title = $(element).find('.lister-item-header a').text().trim();
      const rating = $(element).find('.ratings-imdb-rating strong').text().trim();

      top5ActionMovies.push({ title, rating });
    });

    return top5ActionMovies.slice(0, 5);
  } catch (error) {
    console.error('Error fetching top action movies from IMDb:', error);
    return [];
  }
}

scrapeTop5ActionMovies()
  .then((top5ActionMovies) => {
    if (top5ActionMovies.length === 0) {
      console.log('No action movies found on IMDb.');
    } else {
      console.log('Top 5 action movies on IMDb:');
      top5ActionMovies.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title} - Rating: ${movie.rating}`);
      });
    }
  })
  .catch((error) => {
    console.error('Error fetching top action movies from IMDb:', error);
  });
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

function scrapeTop5Movies() {
  throw new Error('Function not implemented.');
}
  