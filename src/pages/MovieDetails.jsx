import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Load movies from localStorage
    const savedMovies = localStorage.getItem('movies');
    const movies = savedMovies ? JSON.parse(savedMovies) : [];
    
    // Find the movie by ID
    const foundMovie = movies.find(m => m.id === parseInt(id));
    
    // Set movie data or fallback to default
    setMovie(foundMovie || {
      id: parseInt(id),
      title: `Movie ${id}`,
      description: 'This is a mock movie description.',
      poster_path: '',
      release_date: '2023-01-01',
      rating: 7.5,
    });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-4 movie-details">
      <div className="row">
        <div className="col-md-4">
          <img 
            src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-8">
          <h1 className="mb-3">{movie.title}</h1>
          <div className="mb-3">
            <span className="badge bg-warning text-dark">
              Rating: {movie.rating}/10
            </span>
          </div>
          <h4 className="mb-3">Overview</h4>
          <p className="h6 float-start">{movie.description || movie.overview || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;