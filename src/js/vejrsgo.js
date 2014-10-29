var Vejrsgo = new function() {

	this.WeatherAPIKey = "e494905c60db134c0b21009c27b069d67d81e8a0";	

	this.setup = function() {
		//this.weather();
		Vejrsgo.load.hide();
		this.setupBindings();
		this.attachFooter();
		this.attachOverlay();
	};

	this.setupBindings = function() {
		this.Ripple();

		$("body").on("click", ".card:not(.highlight)", function() {
			var newCard = $(this).clone();
			newCard.addClass("highlight");
			newCard.find(".ripple").remove();
			newCard.find(".sun").addClass("sun--big");
			$("body").append(newCard);

			newCard.click(function() {
				$(this).css("top", "-100px").css("opacity", "0");
				//.css("top", "-"+$(this).outerHeight()+"px").css("transition-duration", "1.2s")
				var card = $(this);
				setTimeout(function() {
					card.remove();
				}, 2000);
			});	
		});

		$("body").on("click", "a", function(e) {

			if ($(this).data("action") == undefined) {
				return;
			}

			e.preventDefault();

			var action = $(this).data("action");

			if (action == "login") {
				console.log("log ind pressed");
			}

		});
	};

	this.showCards = function() {
		Vejrsgo.load.hide();
		var cardDelay = 200;
		var cardDelayFactor = 1.5;
		$(".card").each(function() {
			$(this).css("-webkit-animation-delay", cardDelay.toString()+"s");
			
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
		if (!data) {
			card.css("opacity", "0.4");
			console.log("Something went wrong!");
			console.log(data);
		} else {

			$(card).find("[data-inject]").each(function() {

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
				} else if (_this.is("div") || _this.is("span")) {
					_this.text(inject);
				}

			});

			setTimeout(function() {
				callback();
			}, 1500);

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

  this.attachFooter = function() {

  	/*var footer = $("footer.footer");

  	var footerBottom = footer.offset().top + footer.height();
  	var bodyHeight = $("body").height();

  	if (footerBottom <= bodyHeight) {
  		footer.addClass("attached");
  	}*/



  };

  this.attachOverlay = function() {

  	console.log("overlays attached");

  	$("footer a.overlay").click(function(e) {
  		console.log("footer overlay inititated");
  		e.preventDefault();

  		Vejrsgo.overlay("privacypolicy");
  	});
  };

  this.overlay = function(arg) {

  	if (!arg) {
  		return;
  	}

  	if (arg == "privacypolicy") {

  		var text = "Her kommer vores privatlivspolitik....<br />";
  		text += "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias tempore, neque repellat et. Perferendis ea cum, sit numquam quidem sed nihil laboriosam autem exercitationem quae error et amet officia.";
  		text += "</p><p class='overlay__card__paragraph'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, deleniti, ad voluptatum eum voluptatibus illo perferendis minima doloremque. Aliquid laboriosam aspernatur cumque vitae, architecto, labore magnam a? Placeat, maxime ducimus."

  		var output = [
  		"<div class='overlay'>",
  		"<div class='overlay__card'>",
  		"<h3 class='overlay__card__header'>Privat politik</h3>",
  		"<p class='overlay__card__paragraph'>",
  		text,
  		"</p>",
  		"</div>",
  		"</div>"
  		];

  		console.log("output array: "+output.join(", "));

  		$("body").append(output.join(""));

  		setTimeout(function() {
  			$("div.overlay").addClass("shown");
  		}, 200);

  	}

  };

  this.storage = {

  	set: function(arg, val) {
  		localStorage.setItem(arg, val);
  	},

  	get: function(arg) {
  		return localStorage.getItem(arg);
  	}

  };


  this.system = function() {

  	if (Vejrsgo.storage.get("user")) {
  		
  		console.log(Vejrsgo.storage.get("user"));

  	} else {

  		console.log("NOT SET!");
  		Vejrsgo.storage.set("user", "Leo Ørsnes");

  	}

  };

  this.title = function(title) {

  	var domTitle = $("head title");

  	if (title && title != "" && domTitle.html() != title) {
  		console.log("Title changed to ", title);
  		domTitle.html(title);
  	}

  };

};

Vejrsgo.load.show();