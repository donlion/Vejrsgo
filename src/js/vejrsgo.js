var Vejrsgo = new function() {

	this.WeatherAPIKey = "e494905c60db134c0b21009c27b069d67d81e8a0";
	
	this.setup = function() {
		this.showCards();
		this.weather();
	};

	this.showCards = function() {
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


	this.getWeather = function(card, city) {
		console.log("getWeather initiated");
		city = city.replace(" ", "+");

		var url = [
		"http://api.worldweatheronline.com/free/v1/weather.ashx",
		"?q="+city,
		"&key="+Vejrsgo.WeatherAPIKey,
		"&format=json"
		].join("");

		$.ajax({
			url: url,
			type: "GET",
			contentType: "JSON",
			dataType: "JSON",
		}).done(function (data) {
			Vejrsgo.injectWeather(card, city, data.data);
		}).fail(function(error, text) {
			console.log("Something went wrong");
			return false;
		});
	};

	this.weather = function() {
		console.log("weather initiated");

		var filter = $("[data-city]");

		filter.each(function() {

			var	card = $(this),
					city = card.attr("data-city");
			Vejrsgo.getWeather(card, city);

		});

	};

	this.injectWeather = function(card, city, data) {
		console.log(data["current_condition"][0]["temp_C"]);
		if (!data) {
			card.css("opacity", "0.4");
			console.log("Something went wrong!");
			console.log(data);
		} else {
			console.log($(card).find("[data-inject]"));

			$(card).find("[data-inject]").each(function() {
				console.log("[data-inject]");

				var _this = $(this),
						inject = _this.attr("data-inject"),
						splitInject = inject.split(".");

				if (splitInject.length == 2) {
					var inject = data[splitInject[0]][0][splitInject[1]];
				} else if (splitInject.length == 3) {
					var inject = data[splitInject[0]][0][splitInject[1]][0][splitInject[2]];
				}



				if (_this.is("input")) {
					_this.val(inject);
				} else if (_this.is("div")) {
					_this.text(inject);
				}

			});

		}
	};

	this.scopes = {

	};

};