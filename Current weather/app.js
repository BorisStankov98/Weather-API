// Selecting all of my elements
const inp = document.getElementById("input")
const form = document.getElementById("form")
const container = document.getElementById("container")
// Pictures and API key
const apiKey = "a6f922dcdd663a60627025e5586baeff"


form.addEventListener("submit", async(e)=>{
    e.preventDefault()
  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inp.value}&appid=${apiKey}&units=metric`)
   .then((response)=> {
    console.log(response.data)
    // Response data
    const currentWeather = Number(response.data.main.temp)
    const feelsLike = Number(response.data.main.feels_like)
    const sky = response.data.weather[0].main
    const windSpeed = Number(response.data.wind.speed)
    const icon =`http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png` 
    //creating elements
    const newContainer = document.createElement("div")
    newContainer.classList.add("newContainer")
    const newImage = document.createElement("img")
    const newParagraph= document.createElement("p")
    // Fixing the Clouds problem
    if ( sky === "Clouds"){
        newParagraph.append(`Temperature in ${response.data.name}: ${currentWeather.toFixed(1)}℃ ,feels like: ${feelsLike.toFixed(1)}℃ wind speed: ${windSpeed.toFixed(1)}kph sky is Cloudy`)
    } else{
    newParagraph.append(`Temperature in ${response.data.name}: ${currentWeather.toFixed(1)}℃ ,feels like: ${feelsLike.toFixed(1)}℃ wind speed: ${windSpeed.toFixed(1)}kph sky is ${sky}`)
    }
    newContainer.append(newParagraph)
   // Adding the tag for the text color and the src of the picture depending on the temperature
    if(currentWeather <= 5){
        newParagraph.classList.add("blue")
        newImage.src = icon
        newContainer.append(newImage)
    }else if(currentWeather >= 6 && currentWeather <= 30){
        newParagraph.classList.add("white")
        newImage.src = icon
        newContainer.append(newImage)
    }else{
        newParagraph.classList.add("red")
        newImage.src = icon
        newContainer.append(newImage)
    }
    container.append(newContainer)
    inp.value=""
})
})


