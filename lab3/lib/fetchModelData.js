const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

async function fetchModel(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

module.exports = { fetchModel };


