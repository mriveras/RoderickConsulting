$(document).ready(function() {
  var backgroundImage = selectBackground();
  var backgroundText = SelectBackgroundText(backgroundImage);
  var windowHeight = $(window).innerHeight()-$('#nav').height();
  $('header').css('min-height', windowHeight);
  $('#nav').affix({
    offset: {
      top: $('header').height()-$('#nav').height()
    }
  }); 

  /* highlight the top nav as scrolling occurs */
  $('body').scrollspy({ target: '#nav' })

  /* smooth scrolling for scroll to top */
  // $('.scroll-top').click(function(){
  //   $('body,html').animate({scrollTop:0},1000);
  // })

  /* smooth scrolling for nav sections */
  $('#nav .navbar-nav li>a').click(function(){
    event.preventDefault();
    var link = $(this).attr('href');
    var posi = $(link).offset().top;
    $('body,html').animate({scrollTop:posi},700);
  })

  $('header').css('background','url(images/'+backgroundImage+')');
  $('header').css('background-size','cover');
  $('#homeTextImage h2').html(backgroundText);
  console.log("imageText: " + backgroundText);
  /* google maps */

  // enable the visual refresh
  google.maps.visualRefresh = true;

  var map;
  function initialize() {
    var mapOptions = {
      zoom: 13,
      panControl: true,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    // try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var pos = new google.maps.LatLng(-37.865531, 145.029720);
        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'Roderick Consulting'
        });
        map.setCenter(pos);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // browser doesn't support geolocation
      handleNoGeolocation(false);
    }
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(-37.865531, 145.029720),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
  }
  google.maps.event.addDomListener(window, 'load', initialize);

 });

function autoresize() {
  var windowHeight = $(window).innerHeight()-50;
  $('header').css('height',windowHeight);
}

function selectBackground() {
  if (typeof(Storage) != "undefined") {
      var bg;
      if( (localStorage.getItem("RoderickConsultingBg") == "undefined") || (localStorage.getItem("RoderickConsultingBg") == null) ) {
        localStorage.setItem("RoderickConsultingBg", selectBackgroundSeconds());
      }else{
        bg = localStorage.getItem("RoderickConsultingBg");
        if(bg.substring(0,1)=="1"){
          bg="2.jpg";
        }else if(bg.substring(0,1)=="2"){
          bg="3.jpg";
        }else if(bg.substring(0,1)=="3"){
          bg="4.jpg";
        }else if(bg.substring(0,1)=="4"){
          bg="5.jpg";
        }else if(bg.substring(0,1)=="5"){
          bg="6.jpg";
        }else if(bg.substring(0,1)=="6"){
          bg="1.jpg";
        }
        localStorage.setItem("RoderickConsultingBg", bg);
        console.log(localStorage.getItem("RoderickConsultingBg"));
      }
      return localStorage.getItem("RoderickConsultingBg");
  }else{
    return selectBackgroundSeconds();
  }
}

function selectBackgroundSeconds() {
  var sec = new Date().getSeconds();
  var bg;
  if(sec<10){
    bg="1.jpg";
  }else if(sec<21){
    bg="2.jpg";
  }else if(sec<31){
    bg="3.jpg";
  }else if(sec<41){
    bg="4.jpg";
  }else if(sec<51){
    bg="5.jpg";
  }else if (sec<61){
    bg="6.jpg";
  }
  return bg;
}

function SelectBackgroundText(backgroundImage) {
  if(backgroundImage=="1.jpg"){
    return "Design your business growth we will keep track of it";
  }else if(backgroundImage=="2.jpg"){
    return "Build your business future We look after its accounting needs";
  }else if(backgroundImage=="3.jpg"){
    return "Let us manage your accounts and you can be on your business";
  }else if(backgroundImage=="4.jpg"){
    return "Teamwork is key for our customer service";
  }else if(backgroundImage=="5.jpg"){
    return "Training is basic for us helping businesses";
  }else if(backgroundImage=="6.jpg"){
    return "Let meet and start working together for your business";
  }
}

