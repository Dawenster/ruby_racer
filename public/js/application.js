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
      gamePlay();
      var $player_1 = data.game.player1_id;
      var $player_2 = data.game.player2_id;
    })
    .fail(function (a, b, c) {
      debugger
      console.log(a, b, c);

    });
  });  





  // });
});

var gamePlay = function() {
  $(document).on('keyup', function(e) {
    // do nothing if the game is not started
    moveForward(e);
    if (gameOver()) {
      // restartGame();
      window.location="/game_over"
    }
  });  
}

var moveForward = function(e) {
  if (e.which == 81) {
    $('#player1_strip .active').next().addClass("active");
    $('#player1_strip .active').first().removeClass("active");
  }

  if (e.which == 80) {
    $('#player2_strip .active').next().addClass("active");
    $('#player2_strip .active').first().removeClass("active");
  }
}

var gameOver = function() {
  if ($('#player1_strip td:last-child').hasClass("active")) {
    alert('Game over - Player 1 wins!');
    return true;
  }

  if ($('#player2_strip td:last-child').hasClass("active")) {
    alert('Game over - Player 2 wins!');
    return true;
  }
}

var restartGame = function() {
  $('#player1_strip .active').removeClass("active");
  $('#player1_strip td').first().addClass("active");
  $('#player2_strip .active').removeClass("active");
  $('#player2_strip td').first().addClass("active");
}
