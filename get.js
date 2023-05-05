const express = require('express');
const yelp = require('yelp-fusion');
const app = express();
const apiKey = 'YOUR_API_KEY'; // Replace with your Yelp Fusion API key
const client = yelp.client(apiKey);

app.get('/businesses', (req, res) => {
  const { location, latitude, longitude, term, radius, categories, locale, price, open_now, open_at, attributes, sort_by, limit, offset } = req.query;
  const searchRequest = {
    location,
    latitude,
    longitude,
    term,
    radius,
    categories,
    locale,
    price,
    open_now,
    open_at,
    attributes,
    sort_by,
    limit,
    offset,
  };
  client.search(searchRequest).then(response => {
    res.json(response.jsonBody.businesses);
  }).catch(error => {
    console.log(error);
    res.status(500).send('Internal Server Error');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
