/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

const apiKey = "&APPID=fe7cb7a14deec6a74354c4b2f76835cf&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  forecast(baseURL, zipCode, apiKey).then(function (data) {
    postData("/add", {
      temp: data.main.temp,
      feel: feelings,
      date: newDate,
    });
    updateUI();
  });
}

const forecast = async (baseURL, zipCode, key) => {
  const res = await fetch(baseURL + zipCode + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("temp").innerHTML =
      "The temperature at the location you selected is " +
      Math.round(allData.temp) +
      " degrees";
    document.getElementById("content").innerHTML =
      "Guess that's why you may be feeling " + allData.feel;
    document.getElementById("date").innerHTML =
      "For today being " + allData.date;
  } catch (error) {
    console.log("error", error);
  }
};
