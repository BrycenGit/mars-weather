import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

function displayImg(response) {
  let html = ('');
  html += `<img src=${response.hdurl} style='width:50%;'>`;
  $('#pic').html(html);
}

function displayData(response) {
  let html = ('');
  html += `<p>The date is ${response[getLastSolKey(response)].First_UTC}</p>`;
  html += `<p>The wind speed is ${response[getLastSolKey(response)].HWS.av} km/h</p>`
  html += `<p>The temp is ${response[getLastSolKey(response)].AT.av} degrees celcius</p>`
  $('#data').html(html);
}

function getLastSolKey(response) { //optain solkey of last array
  let solKey;
  let last = (response.sol_keys.length - 1);
  solKey = response.sol_keys[last]
  return solKey;
}

$(document).ready(function() {
  $('#get-date').click(function() {
    let request = new XMLHttpRequest();
    const url = `https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        displayData(response);
      }
    };  
    request.open("GET", url, true);
    request.send();
  })  
  
  $('#pic-of-day').click(function() {
    let request2 = new XMLHttpRequest
    const url2 = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    request2.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const picResponse = JSON.parse(this.responseText);
        displayImg(picResponse);
      }
    };
    request2.open("GET", url2, true);
    request2.send();
  })
})