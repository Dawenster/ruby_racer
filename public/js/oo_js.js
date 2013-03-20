$(document).ready(function() {
	$('#main-form').submit(function(e) {
		e.preventDefault();
		// debugger
		if ($(this).serializeArray()[0] == [] || $(this).serializeArray()[1] == []) {
			return false;
		}
		else {
			var data = $(this).serializeArray();

			var player1 = new Player(data[0].value);
		  var player2 = new Player(data[1].value);
		  var p1Length = $(".racer_table1 td").length;
		  var p2Length = $(".racer_table2 td").length;

		  game = new Game(player1, player2, p1Length, p2Length);

		  randKey = Math.floor((Math.random()*25)+65);
		  gamePlay();
		}
	});
});