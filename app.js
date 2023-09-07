 
const apiKey = '6064cb3ca00f9837f19bba921ebdffa6'; 
const apiUrl = `https://openweather43.p.rapidapi.com/weather?q=delhi&units=standard`;

const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");

async function checkWeather(city){
	const response = await fetch(apiUrl+ city + `&appid=${apiKey}`);
	var data = await response.json();


	console.log(data);


	document.querySelector(".city").innerHTML=data.name;
	document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"C";
	document.querySelector(".humidity").innerHTML=data.main.temp+"%";
	document.querySelector(".wind").innerHTML=data.main.temp+"km/h";
}

searchBtn.addEventListener("click", ()=>{
	checkWeather(searchBox.value)
})
