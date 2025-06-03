const MovieCard = ({ movie }) => {
  return (
    <div className="card h-100 border-0 shadow-sm transition-all">
      <img 
        src={movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
          : 'https://via.placeholder.com/300x450?text=No+Poster'}
        className="card-img-top"
        alt={movie.title}
        style={{ height: '400px', objectFit: 'cover' }}
      />
      <div className="card-body bg-dark text-light">
        <h5 className="card-title text-truncate">{movie.title}</h5>
        <p className="card-text text-muted">
          {movie.release_date?.substring(0, 4)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;