// api.js
async function searchWeather(city,container){
  const apiKey = "13963dbfbca0aa0e311f7d46e1332683"; 
 
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;


fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
     const div=document.createElement("div");
     div.innerHTML=`
      <h3>${data.name}</h3>
      <p>Temperatura: ${data.main.temp}°C</p>
      <p>Pogoda: ${data.weather[0].description}</p>`;
      container.appendChild(div);
  })
  .catch(error => {
    console.error('Error:', error);
     document.getElementById("weatherResult").innerText = "Nie udało się pobrać pogody.";
  });

}
async function searchButtonOnClick()
{
    document.getElementById("weatherResult").innerText = "";
    const city = document.getElementById("city").value;
    const weatherContainer = document.getElementById("weatherResult");
    const data = await searchWeather(city,weatherContainer);
}