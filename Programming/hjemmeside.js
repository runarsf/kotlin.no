/* funciont init gjør at filene i funksjonen blir lastet inn når nettsiden åpnes. */
function init(){

document.getElementById("meny").style.top=0;
document.getElementById("meny").style.left=0;
document.getElementById("meny").style.width=document.body.clientWidth;
document.getElementById('meny').style.height=50;

document.getElementById("meny1").style.visibility='hidden';
document.getElementById("meny2").style.visibility='hidden';
document.getElementById("meny3").style.visibility='hidden';
}
/* function meny 1, 2 eller 3 er funksjoner som sier hva som skal skje når man interacter med den menyen. Da blir alt annet på sida usynlig og submenyene lastes inn. */
function meny1(){

if (document.getElementById("meny1").style.visibility=='hidden') {
document.getElementById("meny1").style.left=document.getElementById("en").offsetLeft;
document.getElementById("meny1").style.top=document.getElementById("meny").offsetHeight;
document.getElementById("meny1").style.visibility='visible';
document.getElementById("welcome").style.visibility='hidden';
}
else document.getElementById("meny1").style.visibility='hidden';
}

function meny2(){

if (document.getElementById("meny2").style.visibility=='hidden') {
document.getElementById("meny2").style.left=document.getElementById("to").offsetLeft;
document.getElementById("meny2").style.top=document.getElementById("meny").offsetHeight;
document.getElementById("meny2").style.visibility='visible';
document.getElementById("welcome").style.visibility='hidden';
}
else document.getElementById("meny2").style.visibility='hidden';
}

function meny3(){

if (document.getElementById("meny3").style.visibility=='hidden') {
document.getElementById("meny3").style.left=document.getElementById("tre").offsetLeft;
document.getElementById("meny3").style.top=document.getElementById("meny").offsetHeight;
document.getElementById("meny3").style.visibility='visible';
document.getElementById("welcome").style.visibility='hidden';
}
else document.getElementById("meny3").style.visibility='hidden';
}
/* Dette er en funksjon som gjør det kortere og enklere å utføre like kommandoer på alle items. Vanligvis måtte man lagd 3-4 linjer med kode for hver item, men den funksjonen gjør alt sammen på mye mindre plass. */
function skjulAlle(){

var x = document.getElementsByClassName("innhold");

for (i = 0; i < x.length; i++) {
  x[i].style.visibility='hidden';
  }

var y = document.getElementsByClassName("submeny")

for (i = 0; i < y.length; i++) {
  y[i].style.visibility='hidden';
  }

}

function vis(id){
document.getElementById(id).style.visibility='visible';


}
/* onKonamiCode lager en funksjon som ser etter en bestemt rekkefølge med inputs fra tastaturet, i dette tilfellet "↑, ↑, ↓, ↓, ←, →, ←, →, B, A", også kjent som "Konami Code" */
function onKonamiCode(cb) {
  var input = '';
  /* "var key" angir ID-ene til tastene i Konami Coden, 38 for pil opp, 40 for pil ned, 37 og 39 for pil venstre og høyre, og 66 og 65 for B og A */
  var key = '38384040373937396665';
  document.addEventListener('keydown', function (e) {
    input += ("" + e.keyCode);
    if (input === key) {
      return cb();
    }
    if (!key.indexOf(input)) return;
    input = ("" + e.keyCode);
  });
}

onKonamiCode(function () {alert('Excuse me, this is supposed to be a secret, you are now obligated to shut the hell up about it so no one else will know. You should know better than to expose a secret kept by the official goverment of the United States of America.')})
