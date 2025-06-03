import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.username || /\s/.test(formData.username)) newErrors.username = 'No spaces allowed';
    if (!formData.password || formData.password.length < 8 ||
        !/[a-z]/.test(formData.password) ||
        !/[A-Z]/.test(formData.password) ||
        !/\d/.test(formData.password) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with one lowercase, uppercase, digit, and special character';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Register values:', formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="User Name"
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="submit-btn register-btn">Register</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;