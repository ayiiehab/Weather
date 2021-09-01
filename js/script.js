

(async function () {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    display('cai');
    let searchInput = document.getElementById("search");

    searchInput.addEventListener("keyup", SearchValue => {
        let land = SearchValue.target.value;

        if (land == '') {
            display('cairo');
        }
        else {
            if (validedland() == true) {
                display(land);
            }
            else {
                alert("Please Enter Your Location")
            }

        }
    });



    async function display(value) {
        // let searchInput = document.getElementById("search");
        // console.log(searchInput.value.length)
        if (value.length > 2) {
            let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=29ecd65b17b843808ab215057210805&q=${value}&days=3&fbclid=IwAR37Rf849GNuxnCozDbodfrcTRy-Bg5jOJjRXpDQ3expbnMdT9W7TsB-9VY`);
            let responseData = await response.json();
            // console.log(responsecData)
            let location = responseData.location;
            let current = responseData.current;
            let forecast = responseData.forecast;
            // console.log(responseData)
            
            let dateToday = new Date(`${location.localtime}`);
            let dataTomorrow = new Date(`${forecast.forecastday[1]?.date}`);
            let dataAfter = new Date(`${forecast.forecastday[2]?.date}`);
        


            // console.log(location);
            // console.log(current);
            // console.log(forecast);



            let term = `
           <div class=" today col-4 m-0 p-0 ">
               <div class="forecast-header  d-flex justify-content-between">
                    <p>${days[dateToday?.getDay()]}</p>
                    <p>${dateToday.getDate()} ${months[dateToday.getMonth()]}</p>
                </div>
    <!--End forecast-header -->
                <div>
                     <h4 id="city" class="m-3">${location.name}</h4>
                    <div class="row d-flex justify-content-around p-3 ">
                    <div class="div col ">
                          <p id="degree">
                              ${current.temp_c}<sup>o</sup>C
                          </p>
                    </div>

                    <div class="div col px-2 ">
                           <img  src='https:${current.condition.icon}' alt="Weather data by WeatherAPI.com" border="0">
                    </div>
                </div>
                <p class="mx-3 state ">${current.condition.text}</p>

                <div id="icons" class="d-flex">

                <div class="px-3   d-flex">
                <i class="fas fa-wind p-1  "></i>
                <p class="icon-color">${current.wind_kph}<small>k/h</small></p>
                </div>

                <div class="px-3   d-flex">
                <i class="fas fa-compass p-1"></i>
                <p class="icon-color">${current.wind_dir}</p>
                </div>

                <div class="px-3 d-flex">
                <i class="fab fa-cloudversify p-1"></i>
                <p class="icon-color">${current.cloud}</p>
                </div>

                </div>
            </div>

      </div>

          <div class=" tom col-4 m-0 p-0 text-center ">
                <div class="forecast-header ">
                    <p>${days[dataTomorrow.getDay()]}</p>
                    
                </div>
                <!--End forecast-header -->
                <div class="py-3">
        
                    <div>
                    <img  src='https:${forecast.forecastday[1]?.day.condition.icon}' alt="Weather data by WeatherAPI.com" border="0">

                    </div>
        
                    <div>
                        <p id="degreeTom">
                        ${forecast.forecastday[1]?.day.maxtemp_c}<sup>o</sup>C
                        </p>
                    </div>
        
                    <div>
                        <p id="degreeSmallTom">
                        ${forecast.forecastday[1]?.day.mintemp_c}<sup>o</sup>C
                        </p>
                    </div>
                    
                    <p class="mx-3 state">${forecast.forecastday[1]?.day.condition.text}</p>
        
        
                </div>
        
            </div>
            <div class=" after col-4 m-0 p-0 text-center ">
                <div class="forecast-header ">
                <p>${days[dataAfter.getDay()]}</p>
                    
                </div>
                <!--End forecast-header -->
                <div class="py-3">
        
                    <div>
                    <img  src='https:${forecast.forecastday[2]?.day.condition.icon}' alt="Weather data by WeatherAPI.com" border="0">
                    </div>
        
                    <div>
                        <p id="degreeAfter">
                        ${forecast.forecastday[2]?.day.maxtemp_c}<sup>o</sup>C
                        </p>
                    </div>
        
                    <div>
                        <p id="degreeSmallAfter">
                        ${forecast.forecastday[2]?.day.mintemp_c}<sup>o</sup>C
                        </p>
                    </div>
                    
                    <p class="mx-3 state">${forecast.forecastday[2]?.day.condition.text}</p>
                </div>
            </div>
    
    `;

            document.getElementById("weather").innerHTML = term;
        }}
    
    function validedland() {
        let regex = /^[A-Za-z]+$/;

        if (regex.test(searchInput.value) == true) {
            return true;
        }
        else {
            return false;
        }

    }



})();


let subscribeInput = document.getElementById("subscribe");
let subscribeBtn = document.getElementById("subscribeBtn");
let homeStorage;

if (localStorage.getItem("subscribeList") == null) {
    homeStorage = [];
}
else {
    homeStorage = JSON.parse(localStorage.getItem("subscribeList"));
}


subscribeBtn.addEventListener("click", function () {
    if (validedEmail() == true) {
        subscribe();
        clearData();
    }
    else {
        alert("Please Enter Right Email")
    }

})

function subscribe() {


    if (subscribeInput.value != "" && validedEmail() == true) {
        var subscribeEmails = {
            subscribeEmail: subscribeInput.value,

        }
        homeStorage.push(subscribeEmails);
        localStorage.setItem("subscribeList", JSON.stringify(homeStorage));



    }

}

function clearData() {
    subscribeInput.value = "";


}


function validedEmail() {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    ;

    if (regex.test(subscribeInput.value) == true) {
        return true;
    }
    else {
        return false;
    }

}





