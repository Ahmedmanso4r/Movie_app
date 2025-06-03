import MovieCard from '../components/MovieCard';

const mockFavorites = [
  { id: 4, title: 'GoodFellas', poster_path: '/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg' },
  { id: 2, title: 'The Dark Knight', poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
];

const Favorites = () => {
  return (
    <div className="container page-container">
      <h1 className="mb-4">Your Favorite Movies</h1>
      <div className="movies-grid">
        {mockFavorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;