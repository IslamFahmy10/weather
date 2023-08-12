let city=''
let resp=""
let tomorrow=''
let afterTomorrow=''
let find=document.getElementById('find')
myLocation()
async function myLocation(){
    let resp=await fetch(`https://ipinfo.io/json?token=a5f26c53181287`)
    resp=await resp.json()
    city=resp.city
    getApi(city)
    getImage(city.toLowerCase())
}



async function  getImage(x){
if(x.includes(' ')){
   x= x.split(' ')
   x=x.join('-')
}
let resp =await fetch(`https://api.teleport.org/api/urban_areas/slug:${x}/images/`)
resp=await resp.json()
if(resp.status==404){
    document.getElementById('image').innerHTML=`<h1 class=" fs-6 text-center gray">there is no data for city image</h1>`
}
else{
    let img=resp.photos[0].image.mobile
document.getElementById('image').innerHTML=`<img src="${img}" alt="description" class="w-100 h-100">`
}
}

find.addEventListener('click',async function(){
    resp= await fetch(`https://api.weatherapi.com/v1/search.json?key=4ce0d4a3be3b4122a4a235501231108&q=${search.value}`)
    resp=await resp.json()
    getApi(resp[0].name)
    getImage(resp[0].name.toLowerCase())
})

let search = document.getElementById('search')
search.addEventListener('keyup',async function searchLocation(){

    resp= await fetch(`https://api.weatherapi.com/v1/search.json?key=4ce0d4a3be3b4122a4a235501231108&q=${search.value}`)
    resp=await resp.json()
    getApi(resp[0].name)
    getImage(resp[0].name.toLowerCase())
})

async function getApi(x){
    console.log(x);
    resp=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4ce0d4a3be3b4122a4a235501231108&q=${x}&days=3`)
    resp=await resp.json()
    city=resp.location.name
    getTomorrow()
    getAfterTomorrow()
    let temp=resp.current.temp_c
    let text=resp.current.condition.text
    let icon=resp.current.condition.icon
    let windSpeed= resp.current.wind_kph
    let windDirection=resp.current.wind_dir
    let rainChance=resp.forecast.forecastday[0].day.daily_chance_of_rain
    let content=`<div class="day w-100 d-flex justify-content-between align-items-center radiusr"><span class="week">${today.day}</span><span class="date">${today.numOfDay} ${today.month}</span></div>
    <div class="main card-body p-3">
      <h5 class="card-title my-2">${city}</h5>
      <h1 class="text-white">${temp}&deg;C <img src=${'https://'+icon} class="w-25  mx-auto text-center" alt="weather"></h1>
      <h6 class="text-info my-2">${text}</h6>
      <ul class="d-flex justify-content-between me-5 list-unstyled w-75"><li><img src="img/icon-umberella.png" alt="rain"> ${rainChance}%</li><li><img src="img/icon-wind.png" alt="wind"> ${windSpeed} km/hr</li><li><img src="img/icon-compass.png" alt="compass"> ${windDirection}</li></ul>
    </div>`
    document.getElementById('today').innerHTML=content
}
days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
months=["January","February","March","April","May","June","July",
"August","September","October","November","December"];
date=new Date
 let today={
    day:days[date.getDay()],
    month:months[date.getMonth()],
    year:date.getFullYear(),
    numOfDay:date.getDate()
}
function getTomorrow(){
    var tomorrow= resp.forecast.forecastday[1].date
    tomorrow=new Date(tomorrow)
    tomorrow=days[tomorrow.getDay()]
    document.getElementById('tomorrow').innerHTML=`<span class="week"
    >${tomorrow}</span>`
    let hTemp=resp.forecast.forecastday[1].day.maxtemp_c
    let mTemp=resp.forecast.forecastday[1].day.mintemp_c
    let text=resp.forecast.forecastday[1].day.condition.text
    let icon=resp.forecast.forecastday[1].day.condition.icon
    content1=`<img src="${'https://'+icon}" class="w-25 mx-auto text-center" alt="weather">
    <h1 class="text-white fs-2 text-center">${hTemp}&deg;C</h1>
    <h1 class=" fs-6 text-center gray">${mTemp}&deg;C</h1>
    <h6 class="text-info text-center">${text}</h6>`
document.getElementById('details1').innerHTML=content1
}
    
function getAfterTomorrow(){
    var afterTomorrow=resp.forecast.forecastday[2].date
    afterTomorrow=new Date(afterTomorrow)
    afterTomorrow=days[afterTomorrow.getDay()]
    document.getElementById('afterTomorrow').innerHTML=`<span class="week"
    >${afterTomorrow}</span>`
    let hTemp=resp.forecast.forecastday[2].day.maxtemp_c
    let mTemp=resp.forecast.forecastday[2].day.mintemp_c
    let text=resp.forecast.forecastday[2].day.condition.text
    let icon=resp.forecast.forecastday[2].day.condition.icon
    content2=`<img src="${'https://'+icon}" class="w-25 mx-auto text-center" alt="weather">
    <h1 class="text-white fs-2 text-center">${hTemp}&deg;C</h1>
    <h1 class=" fs-6 text-center gray">${mTemp}&deg;C</h1>
    <h6 class="text-info text-center">${text}</h6>`
    document.getElementById('details2').innerHTML=content2
}
