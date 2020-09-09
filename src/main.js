import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

// function displayImg() {
//   let html = ();
//   html += `<img src=${}>`
// }

function getSolKey(response) { //optain solkey at arra
let solKey;
let last = response.sol_keys.length - 1;
solKey = response.sol_keys[last]
console.log(solKey);
return solKey;

}

function displayDate(response) { // date of first UTC
  console.log(response[getSolKey(response)].First_UTC);
}

function getTemp(response) { //atmospheric temp in celcius
  console.log(response[getSolKey(response)].AT.av)
}

function getWindSpeed(response) { //horizontal wind speed meters per second
  console.log(response[getSolKey(response)].HWS.av)
}

$(document).ready(function() {
  let request = new XMLHttpRequest();
  const url = `https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);
      displayDate(response);
      getTemp(response);
      getWindSpeed(response);
    }
  };
  request.open("GET", url, true);
  request.send();
  
  
  $('#pic-of-day').click(function() {
    alert('hello');
    let request2 = new XMLHttpRequest
    const url2 = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
  
    request2.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        console.log(response);
      }
    };
    request.open("GET", url2, true);
    request.send();
    


  })


})