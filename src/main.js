import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

function displaySolKeys(response) {
let solKey;
solKey = response.sol_keys[0]
return solKey;
}

function displayDate(response) {
  let earthDate;
  earthDate = response.[634].First_UTC;
  console.log(earthDate);
}

$(document).ready(function() {
  let request = new XMLHttpRequest();
  const url = `https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);
      displaySolKeys(response);
      displayDate(response);
    }
  };
  request.open("GET", url, true);
  request.send();
  
})