// index.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = {}; // In-memory user store, replace with a database in a real application

// Register a new user
async function register(username, password) {
  if (users[username]) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword };

  return { username };
}

// Login a user
async function login(username, password) {
  const user = users[username];

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' }); // Replace 'secretKey' with a real secret key
  return { username, token };
}

// Verify JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, 'secretKey'); // Replace 'secretKey' with a real secret key
    return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

module.exports = { register, login, verifyToken };
