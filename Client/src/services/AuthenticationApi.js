export const registerUser = async (username, password) => {
  try {
    const response = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure`;
}

export const loginUser = async (username, password) => {
  try {
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',  
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Login failed: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const checkAuth = async () => {
  try {
    const response = await fetch('http://localhost:4000/auth/me', {
      method: 'GET',
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Authenticated:', data);
    return data;
  } catch (error) {
    console.error('User not authenticated', error);
    throw error;
  }
};


export const logoutUser = async () => {
  try {
    const response = await fetch('http://localhost:4000/auth/logout', {
      method: 'POST',
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error(`Logout failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await fetch('http://localhost:4000/auth/me', {
      method: 'GET',
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
