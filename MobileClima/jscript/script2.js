let weather = 
{
    "apiKey": "962c39d28143d4f80e56607caf40bb29",
    coletaCoord: function(city)
    {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + ",pt_br&units=metric&lang=pt_br&appid=" + this.apiKey)
        .then((response) => {return response.json()})
        .then((datam) => this.dadosCoord(datam));
    },

    dadosCoord: function(datam)
    {
        const { lat, lon } = datam.coord;
        this.geraDadosPag(lat,lon);
    },

    geraDadosPag: function(latitude,longitude)
    {
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,minutely&units=metric&lang=pt_br&appid=" + this.apiKey)
        .then((response) => {return response.json()})
        .then((data) => this.dados(data));
    },

    dados: function(data)
    {
        const {temp, humidity, wind_speed} = data.current;
        const {description, icon} = data.current.weather[0];
        const {morn, eve, night} = data.daily[0].feels_like;
        const {pop} = data.daily[0];
        try 
        {
            const alertas = data.alerts[0].event;
            document.querySelector(".dados").innerText = "Alerta: " + alertas;
        } 
        catch (error) {}
        const temp1 = parseInt(temp,10);
        const temp2 = parseInt(morn,10);
        const temp3 = parseInt(eve,10);
        const temp4 = parseInt(night,10);

        document.querySelector(".mtemp").innerText = temp2 + "°C";
        document.querySelector(".ttemp").innerText = temp3 + "°C";
        document.querySelector(".ntemp").innerText = temp4 + "°C";
        document.querySelector(".temp").innerText = temp1 + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = humidity + "%";
        document.querySelector(".wind").innerText = wind_speed + " km/h";
        document.querySelector(".precipitation").innerText = pop*100 + "%";
            
        document.querySelector(".carregamento").classList.remove("loading");
    },
    pesquisar: function()
    {
        this.coletaCoord(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function()
{
    weather.pesquisar();
})

document.querySelector(".search-bar").addEventListener("keyup", function (event)
{
    if(event.key == "Enter")
    {
      weather.pesquisar();
    }
});


