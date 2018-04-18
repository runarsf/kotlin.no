const secondHand = document.querySelector('.sec');
const minsHand = document.querySelector('.min');
const hourHand = document.querySelector('.hour');
const digitalTime = document.querySelector('.time');

function setDate() {
    const now = new Date();
    var seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    var mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;
    var hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
   
    digitalTime.innerHTML = parseTime(hour) + ':' + parseTime(mins) + ':' + parseTime(seconds);
  }
  
  function parseTime(n) {
     if(n < 10) {
      n = '0' + n;
    }
    return n;
  }
  setInterval(setDate, 1000);
  setDate();