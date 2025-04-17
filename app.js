const telegramBotToken = '7261046303:AAE69q6m9ybXquBtuCWQVsftpBDLCnaQmBY';
const chatId = '-4284216426';

const apiKey = '6064cb3ca00f9837f19bba921ebdffa6';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weathericon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    // Handle 404 or other API errors
    if (data.cod !== 200) {
      alert(data.message || "City not found!");
      return;
    }

    console.log(data);

    // Update DOM safely
    document.querySelector(".city").innerHTML = data.name || "Unknown";
    document.querySelector(".temp").innerHTML = 
      data.main?.temp ? Math.round(data.main.temp) + "°C" : "N/A";

    const condition = data.weather?.[0]?.main || "Unknown";

    // Icon set
    switch (condition) {
      case "Clear":
        weatherIcon.src = "media/clear.png";
        break;
      case "Clouds":
        weatherIcon.src = "media/cloudy.png";
        break;
      case "Haze":
        weatherIcon.src = "media/haze.png";
        break;
      case "Rain":
        weatherIcon.src = "media/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "media/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "media/snow.png";
        break;
      default:
        weatherIcon.src = "media/cloudy.png";
    }

    // Telegram alert for rain
    if (condition === "Rain") {
      sendTelegramAlert(`⛈️ Thunderstorm alert for ${data.name}!`);
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Something went wrong while fetching data.");
  }
}

async function sendTelegramAlert(message) {
  const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
  const params = new URLSearchParams();
  params.append('chat_id', chatId);
  params.append('text', message);

  try {
    await fetch(telegramApiUrl, {
      method: 'POST',
      body: params
    });
  } catch (err) {
    console.error("Failed to send Telegram alert:", err);
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
