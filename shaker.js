(function( $ ) {
	var t;
	var freq = 100;
	function shake(obj, dp, options) {
		var bp = '0px ';

		if (options.x) {
			var x = Math.round(Math.random() * 100) % 3;
			if (x == 0) bp = '-' +dp +'px ';
			if (x == 1) bp = '0px ';
			if (x == 2) bp = dp +'px ';
		}
		
		if (options.y) {
			var y = Math.round(Math.random() * 100) % 3;
			if (y == 0) bp += '-' +dp +'px';
			if (y == 1) bp += '0px';
			if (y == 2) bp += dp +'px';
		}

		$(obj).css("background-position", bp);


		t = setTimeout(function() {
			shake(obj, dp, options);
		}, freq);
	}

	$.fn.shakker = function(options) {
		$(this).each(function() {
			console.log($(this));
			this.property = {x: true, y: true};
			if (typeof options.x != 'undefined') {
				this.property.x = (options.x) ? true: false;
			}
			
			if (typeof options.y != 'undefined') {
				this.property.y = (options.y) ? true: false;
			}
			
			
			var x = this.offsetLeft;
			var y = this.offsetTop;
			var w = this.offsetWidth;
			var h = this.offsetHeight;

			var src = $(this).attr("src");
			try {
				var targetZindex = parseInt($(this).zIndex()) + 1;
			} catch(err) {
				var targetZindex = 100;
			}
			var elem = document.createElement('div');
			$(elem).css("position", "absolute");
			$(elem).css("background-size", w +'px ' +h +'px');
			$(elem).css("overflow", "hidden");
			$(elem).css("background-repeat", "no-repeat");
			$(elem).css("background-position", "0px 0px");
			$(elem).css("transition", "background-position .3s");



			$(elem).css("top", y +"px");
			$(elem).css("left", x +"px");
			$(elem).css("width", w +"px");
			$(elem).css("height", h +"px");
			$(elem).css("opacity", ".4");

			$(elem).css("background-image", "url(" +src +")");
			$(elem).css("z-index", targetZindex);

			$(elem).innerHTML = ' ';
			document.body.appendChild(elem);
			shake(elem, h/15, {x: this.property.x, y: this.property.y});
		});
	}
}( jQuery ));