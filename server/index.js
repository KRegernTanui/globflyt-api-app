const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = 3001;
const API_KEY = process.env.OPENTRIPMAP_API_KEY;

app.get('/api/place', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius`, {
      params: {
        radius: 10000,
        lon,
        lat,
        format: 'json',
        limit: 100,
        apikey: API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/details/:xid', async (req, res) => {
  const { xid } = req.params;
  try {
    const response = await axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${xid}`, {
      params: { apikey: API_KEY },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});









app.get('/api/geoname', async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname`, {
      params: {
        name,
        apikey: API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch geoname data' });
  }
});
