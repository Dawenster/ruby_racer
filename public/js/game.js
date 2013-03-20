function Game(player1, player2, p1Length, p2Length) {
	this.startTime = new Date();
	this.endTime = null;
	this.elapsedTime = null;
	this.player1 = player1;
	this.player2 = player2;
	this.winner = null;
	this.p1Length = p1Length;
	this.p2Length = p2Length;
}

var gamePlay = function() {
  $('#main-form input').blur();
  $("#container").removeClass("opaque");
  $(document).on('keyup', function(e) {
    moveForward(e);
    if (gameOver()) {
    }
  });
}

var moveForward = function(e) {
  if (e.which == 81) {
    $('#player1_strip .active').next().addClass("active");
    $('#player1_strip .active').first().removeClass("active");
    game.player1.stepsTaken += 1;
  }

  if (e.which == randKey) {
    $('#player2_strip .active').next().addClass("active");
    $('#player2_strip .active').first().removeClass("active");
    game.player2.stepsTaken += 1;
  }
}

var endGame = function() {
  game.endTime = new Date();
  game.elapsedTime = (game.endTime.getTime() - game.startTime.getTime()) / 1000;
  debugger
  $.ajax({
    type: 'post',
    url: '/game_over',
    data: game
  })
  .done(function(data) {
    window.location = data;
  })
}

var gameOver = function() {
  if (game.player1.stepsTaken == game.p1Length) {
  	game.winner = game.player1
    endGame();
    return true;
  }

  if (game.player2.stepsTaken == game.p2Length) {
  	game.winner = game.player2
    endGame();
    return true;
  }
}

var restartGame = function() {
  $('#player1_strip .active').removeClass("active");
  $('#player1_strip td').first().addClass("active");
  $('#player2_strip .active').removeClass("active");
  $('#player2_strip td').first().addClass("active");
}
