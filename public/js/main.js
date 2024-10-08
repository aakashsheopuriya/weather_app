const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp = document.getElementById("temp");
const datahide = document.querySelector(".middle_layer");
const loader = document.getElementById("loader");
const dataContainer = document.getElementById("data");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerHTML = `Plz write city name before search`;
    datahide.classList.add("data_hide");
  } else {
    loader.style.display = "block";
    dataContainer.style.display = "none";

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=952094191f7f9602a842c8087ec3e7f5`;

      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      loader.style.display = "none";
      dataContainer.style.display = "block";

      temp.innerHTML = arrData[0].main.temp + "°c";
      city_name.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
      const tempMood = arrData[0].weather[0].main;
      if (tempMood == "Clouds") {
        temp_status.innerHTML = '<i class="fa-solid fa-cloud"</i>';
      } else if (tempMood == "Clear") {
        temp_status.innerHTML = '<i class="fa-solid fa-sun"></i>';
      } else if (tempMood == "Rain") {
        temp_status.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
      } else if (tempMood == "Mist") {
        temp_status.innerHTML = '<i class="fa-solid fa-grip"></i>';
      } else if (tempMood == "Snow") {
        temp_status.innerHTML = '<i class="fa-solid fa-snowman"></i>';
      } else if (tempMood == "Thunderstorm") {
        temp_status.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
      } else {
        temp_status.innerHTML = '<i class="fa-solid fa-sun"></i>';
      }

      datahide.classList.remove("data_hide");
    } catch {
      city_name.innerHTML = `Plz enter city name correctly`;
      datahide.classList.add("data_hide");
    }
  }
};

const getCurrentday = () => {
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thusday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  let currentTime = new Date();
  let days = weekday[currentTime.getDay()];
  let day = document.getElementById("day");
  day.innerText = days;

  const today_date = document.getElementById("today_date");
  let date = currentTime.getDate();
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "jan",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var month = months[currentTime.getMonth() + 1];
  today_date.innerText = `${date} ${month}`;
};

getCurrentday();

submitBtn.addEventListener("click", getInfo);
