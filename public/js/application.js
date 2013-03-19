$(document).ready(function() {
  // $("#play_button").on('click', function(){


  $("#main-form").submit(function(e) {
    e.preventDefault();
    var $start_time = $.now();
    var data = $(this).serialize();
    $.ajax({
      type: 'post',
      url: '/',
      data: data,
      dataType: 'json'
    })
    .done(function (data) {
      $("#container").removeClass("opaque");
      var randKey = Math.floor((Math.random()*25)+65);
      gamePlay(randKey);
      var $player_1 = data.game.player1_id;
      var $player_2 = data.game.player2_id;
    })
    .fail(function (a, b, c) {
      console.log(a, b, c);
    });
  });  
});

var gamePlay = function(randKey) {
  $(document).on('keyup', function(e) {
    // do nothing if the game is not started
    
    moveForward(e, randKey);
    if (gameOver()) {
    }
  });  
}

var moveForward = function(e, randKey) {
  

  if (e.which == 81) {
    $('#player1_strip .active').next().addClass("active");
    $('#player1_strip .active').first().removeClass("active");
  }

  if (e.which == randKey) {
    $('#player2_strip .active').next().addClass("active");
    $('#player2_strip .active').first().removeClass("active");
  }
}

var player1Wins = function() {
  $.ajax({
    type: 'post',
    url: '/game_over',
    data: { winning_id: "player1" },
    dataType: 'json'
  })
  .done(function(data) {
    window.location = data;
  })
}

var player2Wins = function() {

  $.ajax({
    type: 'post',
    url: '/game_over',
    data: { winning_id: "player2" },
    dataType: 'json'
  })
  .done(function(data) {
    window.location = data;
  })
}

var gameOver = function() {
  if ($('#player1_strip td:last-child').hasClass("active")) {
    player1Wins();
    return true;
  }

  if ($('#player2_strip td:last-child').hasClass("active")) {
    player2Wins();
    return true;
  }
}

var restartGame = function() {
  $('#player1_strip .active').removeClass("active");
  $('#player1_strip td').first().addClass("active");
  $('#player2_strip .active').removeClass("active");
  $('#player2_strip td').first().addClass("active");
}
