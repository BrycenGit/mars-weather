import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

function displayImg(response) {
  let html = ('');
  html += `<img src=${response.hdurl} style='width:50%;'>`;
  $('#pic').html(html);
}

// function displayImg2(response)
// let html = ('');
// html += `<img src=${response.hdurl} style='width:50%;'>`
function generateDate() {
  let date = new Date().toJSON().slice(0,10);
  console.log(date);
  return date;
}



function displayData(response) {
  let html = ('');
  let date = ((response[getLastSolKey(response)].First_UTC)).substring(0,10);
  html += `<p>The date is ${date}</p>`;
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
    $('#data').toggle();
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
    $('#pic').toggle();
  })
})

$('#mars-pic').click(function() {
  let request3 = new XMLHttpRequest
  const url3 = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${generateDate()}&api_key=${process.env.API_KEY}`
  request3.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const picResponse2 = JSON.parse(this.responseText);
      // displayImg2(picResponse2);
      console.log(picResponse2);
      generateDate();
    }
  };
  request3.open("GET", url3, true);
  request3.send();
})