var Vejrsgo = new function() {
	
	this.setup = function() {
		var cardDelay = 200;
		var cardDelayFactor = 1.5;
		$(".card").each(function() {
			//$(this).css("-webkit-animation-delay", cardDelay.toString()+"s");
			
			var card = $(this);

			setTimeout(function() {
				card.addClass("visible");
			}, cardDelay);

			cardDelay = cardDelay*cardDelayFactor;
		});
	};

};