var Vejrsgo = new function() {

	this.WeatherAPIKey = "e494905c60db134c0b21009c27b069d67d81e8a0";
	
	this.setup = function() {
		this.weather();
		this.setupBindings();
	};

	this.setupBindings = function() {
		this.Ripple();

		$(".card").click(function() {
			$(".card.highlight").each(function() {
					$(this).css("top", "-"+$(this).outerHeight()+"px").css("opacity", "0");
					var card = $(this);
					setTimeout(function() {
						card.remove();
					}, 2000);
			});
			var newCard = $(this).clone();
			newCard.addClass("highlight");
			newCard.find(".ripple").remove();
			newCard.find(".sun").addClass("sun--big");
			$("body").append(newCard);

			newCard.click(function() {
				$(this).css("top", "-"+$(this).outerHeight()+"px").css("opacity", "0");
				var card = $(this);
				setTimeout(function() {
					card.remove();
				}, 2000);
			});
		});
	};

	this.showCards = function() {
		Vejrsgo.load.hide();
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


	this.getWeather = function(card, city, callback) {
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
			Vejrsgo.injectWeather(card, city, data.data, callback);
		}).fail(function(error, text) {
			console.log("Something went wrong");
			return false;
		});
	};

	this.weather = function() {
		console.log("weather initiated");

		Vejrsgo.load.show();

		var filter = $("[data-city]");

		filter.each(function() {

			var	card = $(this),
					city = card.attr("data-city");
			Vejrsgo.getWeather(card, city, Vejrsgo.showCards);

		});

	};

	this.injectWeather = function(card, city, data, callback) {
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

			callback();

		}
	};

	this.scopes = {

	};

	this.load = {

    loadElement: $(".load.load--container"),

    show: function() {
      $(".load.load--container").css("opacity", "1");
    },

    hide: function(el) {
      $(".load.load--container").css("opacity", "0");
    }

	};


  this.Ripple = function()  {
      $("[data-ripple]").each(function() {
          if ($(this).css("overflow") != "hidden") {
              $(this).css("overflow", "hidden");
          }
          if ($(this).css("position") != "relative") {
              $(this).css("position", "relative");
          }
      });

      $("[data-ripple]").on("mousedown", function(e) {
          if ($(this).find(".ripple").length != 0) {
              $(this).find(".ripple").remove();
          }
          var parent = $(this).parent();

          $(this).prepend("<span class='ripple' />");

          var ripple = $(this).find(".ripple");

          if (!ripple.height() || !ripple.width()) {
              var d = Math.max(parent.outerWidth(), parent.outerHeight());
              ripple.css({
                  height: d,
                  width: d
              });
          }

          var x = e.pageX - $(this).offset().left - ripple.width() / 2;
          var y = e.pageY - $(this).offset().top - ripple.height() / 2;

          ripple.css({
              top: y + 'px',
              left: x + 'px'
          }).addClass("animate");

          setTimeout(function() {
              ripple.remove();
          }, 1000);
      });
  };

};