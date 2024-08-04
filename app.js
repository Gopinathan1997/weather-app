const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
  const location = req.body.city;

  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`;
  const response = await fetch(url);

  const data = await response.json();
  console.log(data.location.name)
  const name = data.location.name;
  const time = data.location.localtime;
  const temperature = data.current.temp_c;
  const description = data.current.condition.text;

  console.log(
    `<h1>The Current Temperature in ${name} City is ${temperature} degree celsious and it is ${description}</h1>`
  );
  res.write(
    `<h1>The Current Temperature in ${name} City is ${temperature} degree celsious and it is ${description}</h1>`
  );
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
