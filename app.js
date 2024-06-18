const telegramBotToken = 'your_telegram_bot_token';
const chatId = 'your_chat_id'; 

const apiKey = '6064cb3ca00f9837f19bba921ebdffa6'; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weathericon");

async function checkWeather(city){
	const response = await fetch(apiUrl+ city + `&appid=${apiKey}`);
	var data = await response.json();


	document.querySelector(".city").innerHTML=data.name;
	document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";


	if(data.weather[0].main=="Clear"){
		weatherIcon.src="media/clear.png"

	}
	else if(data.weather[0].main=="Clouds"){
		weatherIcon.src="media/cloudy.png"

	}
	else if(data.weather[0].main=="Haze"){
		weatherIcon.src="media/haze.png"

	}
	else if(data.weather[0].main=="Rain"){
		weatherIcon.src="media/rain.png"

	}
	else if(data.weather[0].main=="Drizzle"){
		weatherIcon.src="media/drizzle.png"

	}
	else if(data.weather[0].main=="Mist"){
		weatherIcon.src="media/snow.png"

	}

	if(data.weather[0].main == "Thunderstorm"){
		sendTelegramAlert(`Thunderstorm alert for ${data.name}!`);
	}
}

async function sendTelegramAlert(message){
	const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
	const params = new URLSearchParams();
	params.append('chat_id', chatId);
	params.append('text', message);

	await fetch(telegramApiUrl, {
		method: 'POST',
		body: params
	});
}

searchBtn.addEventListener("click", ()=>{
	checkWeather(searchBox.value);
})


