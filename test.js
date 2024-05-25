// test.js
const { register, login, verifyToken } = require('./index');

async function runTests() {
  try {
    console.log('Registering user...');
    const user = await register('testuser', 'password123');
    console.log('User registered:', user);

    console.log('Logging in user...');
    const loginData = await login('testuser', 'password123');
    console.log('User logged in:', loginData);

    console.log('Verifying token...');
    const decoded = verifyToken(loginData.token);
    console.log('Token verified:', decoded);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

runTests();
