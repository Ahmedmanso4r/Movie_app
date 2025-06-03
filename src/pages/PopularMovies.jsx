import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';

const PopularMovies = () => {
  // Load movies from localStorage or use default if none exists
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [
      {
        id: 1,
        title: "The Shawshank Redemption",
        poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        rating: 9.3
      },
      {
        id: 2,
        title: "The Dark Knight",
        poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        rating: 9.0
      },
      {
        id: 3,
        title: "The Good, the Bad and the Ugly",
        poster_path: "/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
        description: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
        rating: 8.8
      },
      {
        id: 4,
        title: "GoodFellas",
        poster_path: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
        description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
        rating: 8.7
      },
      {
        id: 5,
        title: "Seven Samurai",
        poster_path: "/8OKmBV5BUFzmozIC3pPWKHy17kx.jpg",
        description: "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.",
        rating: 8.6
      },
      {
        id: 6,
        title: "The Lord of the Rings: The Return of the King",
        poster_path: "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        rating: 8.9
      },
      {
        id: 7,
        title: "Forrest Gump",
        poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other events unfold through the perspective of an Alabama man with an IQ of 75.",
        rating: 8.8
      }
    ];
  });

  const [editingId, setEditingId] = useState(null);
  const [editMovie, setEditMovie] = useState({
    title: '',
    poster_path: '',
    description: '',
    rating: ''
  });
  const [addMovie, setAddMovie] = useState({
    title: '',
    poster_path: '',
    description: '',
    rating: ''
  });

  // Save movies to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const handleDelete = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const handleEdit = (id) => {
    const movie = movies.find(m => m.id === id);
    setEditingId(id);
    setEditMovie({
      title: movie.title,
      poster_path: movie.poster_path,
      description: movie.description,
      rating: movie.rating
    });
  };

  const handleSave = (id) => {
    if (editMovie.title.trim() && editMovie.poster_path.trim() && editMovie.description.trim() && editMovie.rating) {
      setMovies(movies.map(movie => 
        movie.id === id ? { 
          ...movie, 
          title: editMovie.title,
          poster_path: editMovie.poster_path,
          description: editMovie.description,
          rating: parseFloat(editMovie.rating) || 0
        } : movie
      ));
      setEditingId(null);
    }
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleSave(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditMovie({ title: '', poster_path: '', description: '', rating: '' });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditMovie(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMovie = () => {
    if (addMovie.title.trim() && addMovie.poster_path.trim() && addMovie.description.trim() && addMovie.rating) {
      const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
      const newMovie = {
        id: newId,
        title: addMovie.title,
        poster_path: addMovie.poster_path,
        description: addMovie.description,
        rating: parseFloat(addMovie.rating) || 0
      };
      setMovies([...movies, newMovie]);
      setAddMovie({ title: '', poster_path: '', description: '', rating: '' });
    }
  };

  const handleAddKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddMovie();
    }
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddMovie(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container page-container">
      <h1 className="mb-4">Popular Movies</h1>
      <div className="form-container mb-4" style={{ maxWidth: '800px', padding: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Add New Movie</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: '1 1 150px' }}>
            <label htmlFor="add-title">Title</label>
            <input
              type="text"
              id="add-title"
              name="title"
              value={addMovie.title}
              onChange={handleAddInputChange}
              onKeyPress={handleAddKeyPress}
              placeholder="Enter movie title"
              className="form-control"
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 150px' }}>
            <label htmlFor="add-poster_path">Image Path</label>
            <input
              type="text"
              id="add-poster_path"
              name="poster_path"
              value={addMovie.poster_path}
              onChange={handleAddInputChange}
              onKeyPress={handleAddKeyPress}
              placeholder="Enter image path"
              className="form-control"
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 150px' }}>
            <label htmlFor="add-description">Description</label>
            <input
              type="text"
              id="add-description"
              name="description"
              value={addMovie.description}
              onChange={handleAddInputChange}
              onKeyPress={handleAddKeyPress}
              placeholder="Enter description"
              className="form-control"
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 80px' }}>
            <label htmlFor="add-rating">Rating</label>
            <input
              type="number"
              id="add-rating"
              name="rating"
              value={addMovie.rating}
              onChange={handleAddInputChange}
              onKeyPress={handleAddKeyPress}
              placeholder="0-10"
              className="form-control"
              min="0"
              max="10"
              step="0.1"
            />
          </div>
          <div className="form-group" style={{ flex: '0 0 auto' }}>
            <button
              onClick={handleAddMovie}
              className="btn btn-success submit-btn"
            >
              Add Movie
            </button>
          </div>
        </div>
      </div>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card-container">
            <div className="movie-card">
              <Link to={`/movie/${movie.id}`} className="text-decoration-none">
                <MovieCard movie={movie} />
              </Link>
              
              <div className="card-buttons">
                {editingId === movie.id ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <input
                        type="text"
                        name="title"
                        value={editMovie.title}
                        onChange={handleEditInputChange}
                        onKeyPress={(e) => handleKeyPress(e, movie.id)}
                        placeholder="Enter movie title"
                        className="form-control mb-2"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="poster_path"
                        value={editMovie.poster_path}
                        onChange={handleEditInputChange}
                        onKeyPress={(e) => handleKeyPress(e, movie.id)}
                        placeholder="Enter new image path"
                        className="form-control mb-2"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="description"
                        value={editMovie.description}
                        onChange={handleEditInputChange}
                        onKeyPress={(e) => handleKeyPress(e, movie.id)}
                        placeholder="Enter movie description"
                        className="form-control mb-2"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        name="rating"
                        value={editMovie.rating}
                        onChange={handleEditInputChange}
                        onKeyPress={(e) => handleKeyPress(e, movie.id)}
                        placeholder="Enter movie rating (0-10)"
                        className="form-control mb-2"
                        min="0"
                        max="10"
                        step="0.1"
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <button 
                        onClick={() => handleSave(movie.id)}
                        className="btn btn-success btn-sm"
                      >
                        Save
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="btn btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between">
                    <button 
                      onClick={() => handleEdit(movie.id)}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(movie.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;