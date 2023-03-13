const API_KEY = "key" // visit openWeather to get your own API key 

window.onload = function () {

    let geo;
    let geoSuccess = function (position){

        geo = position

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo.coords.latitude}&lon=${geo.coords.longitude}&units=metric&appid=${API_KEY}`)
        .then((data) => data.json())
        .then((jsonData) => {
            fetch(`http://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`)
            .then((res) => res.blob())
            .then((result) => {  

            let sun_rise = new Date(jsonData.sys.sunrise * 1000)
            let sun_set = new Date(jsonData.sys.sunset * 1000)
    
            document.getElementsByClassName('description__text')[0].innerHTML = jsonData.weather[0].description
            document.getElementsByClassName('location__text')[0].innerHTML = jsonData.name
            document.getElementsByClassName('temperature-humidity__temperature-text')[0].innerHTML =  parseFloat(jsonData.main.temp).toFixed(1)
            document.getElementsByClassName('temperature-humidity__humidity-text')[0].innerHTML = jsonData.main.humidity
            document.getElementsByClassName('sun__rise-text')[0].innerHTML =  `${sun_rise.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
            document.getElementsByClassName('sun__set-text')[0].innerHTML =  `${sun_set.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
    
            const imageURL = URL.createObjectURL(result)
            document.getElementsByClassName("description__image")[0].src = imageURL
            })
        
        }) 
             
    }
    
    navigator.geolocation.getCurrentPosition(geoSuccess)   
}
