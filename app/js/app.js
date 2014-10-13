"use strict";

var x = document.getElementById("error");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successPosition,errorPosition);
  }else{
    x.innerHTML = "Geolocalização não é suportada nesse navegador.";
    x.style.display = "";
  }
}

function successPosition(position) {
  var latlon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      mapOtions = {
        center: latlon,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions:{
          style: google.maps.NavigationControlStyle.SMALL
        }
      },
      map = new google.maps.Map(document.getElementById("map-location"), mapOtions),
      markerOptions = {
        position: latlon,
        map: map,
        title:"Você está aqui!"
      },
      marker = new google.maps.Marker(markerOptions);
}

function errorPosition(error) {
  x.style.display = "";
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "Usuário rejeitou a solicitação de geolocalização."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Localização indisponível."
      break;
    case error.TIMEOUT:
      x.innerHTML = "O tempo da requisição expirou."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "Algum erro desconhecido aconteceu."
      break;
  }
}