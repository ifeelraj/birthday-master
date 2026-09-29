$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});

// Floating Hearts & Romantic Love Particle Canvas System
(function initHeartCanvas() {
	var canvas = document.getElementById('heart-canvas');
	if (!canvas) return;
	var ctx = canvas.getContext('2d');
	var hearts = [];
	var sparkles = [];
	var celebrationMode = false;
	var celebrationTimer = 0;

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	window.addEventListener('resize', resize);
	resize();

	var colors = [
		'rgba(255, 42, 109, ',
		'rgba(255, 75, 114, ',
		'rgba(255, 117, 140, ',
		'rgba(255, 133, 161, ',
		'rgba(247, 37, 133, ',
		'rgba(233, 30, 99, ',
		'rgba(255, 182, 193, '
	];

	function createHeart(isCelebration) {
		return {
			x: Math.random() * canvas.width,
			y: isCelebration ? canvas.height + 20 : Math.random() * canvas.height,
			size: (Math.random() * 16 + 10) * (isCelebration ? 1.4 : 1),
			speedY: (Math.random() * 1.5 + 0.6) * (isCelebration ? 2.5 : 1),
			speedX: (Math.random() - 0.5) * 1.2,
			alpha: Math.random() * 0.6 + 0.3,
			color: colors[Math.floor(Math.random() * colors.length)],
			rotation: Math.random() * Math.PI * 2,
			rotationSpeed: (Math.random() - 0.5) * 0.03,
			oscillationSpeed: Math.random() * 0.03 + 0.01,
			oscillationDist: Math.random() * 20 + 10,
			initialX: 0
		};
	}

	function drawHeart(x, y, size, color, alpha, rotation) {
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(rotation);
		ctx.beginPath();
		var topCurveHeight = size * 0.3;
		ctx.moveTo(0, topCurveHeight);
		ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
		ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.4, 0, size);
		ctx.bezierCurveTo(0, (size + topCurveHeight) / 1.4, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
		ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
		ctx.closePath();
		ctx.fillStyle = color + alpha + ')';
		ctx.shadowColor = color + '0.8)';
		ctx.shadowBlur = 8;
		ctx.fill();
		ctx.restore();
	}

	// Initialize gentle background floating hearts
	for (var i = 0; i < 25; i++) {
		var h = createHeart(false);
		h.initialX = h.x;
		hearts.push(h);
	}

	function createSparkle(x, y) {
		return {
			x: x,
			y: y,
			size: Math.random() * 4 + 2,
			speedX: (Math.random() - 0.5) * 2,
			speedY: (Math.random() - 0.5) * 2 - 1,
			alpha: 1,
			color: colors[Math.floor(Math.random() * colors.length)]
		};
	}

	window.addEventListener('mousemove', function(e) {
		if (Math.random() > 0.6) {
			sparkles.push(createSparkle(e.clientX, e.clientY));
		}
	});

	window.addEventListener('touchmove', function(e) {
		if (e.touches && e.touches[0] && Math.random() > 0.5) {
			sparkles.push(createSparkle(e.touches[0].clientX, e.touches[0].clientY));
		}
	});

	window.startCelebrationHearts = function() {
		celebrationMode = true;
		for (var k = 0; k < 60; k++) {
			var h = createHeart(true);
			h.initialX = h.x;
			hearts.push(h);
		}
	};

	var tick = 0;
	function animate() {
		requestAnimationFrame(animate);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		tick += 0.03;

		// Hearts update & draw
		for (var i = 0; i < hearts.length; i++) {
			var h = hearts[i];
			h.y -= h.speedY;
			h.x = h.initialX + Math.sin(tick * h.oscillationSpeed * 10) * h.oscillationDist;
			h.rotation += h.rotationSpeed;

			if (h.y < -40) {
				if (celebrationMode) {
					h.y = canvas.height + 20;
					h.initialX = Math.random() * canvas.width;
					h.x = h.initialX;
				} else {
					h.y = canvas.height + 20;
					h.initialX = Math.random() * canvas.width;
					h.x = h.initialX;
				}
			}

			drawHeart(h.x, h.y, h.size, h.color, h.alpha, h.rotation);
		}

		// Sparkles update & draw
		for (var j = sparkles.length - 1; j >= 0; j--) {
			var sp = sparkles[j];
			sp.x += sp.speedX;
			sp.y += sp.speedY;
			sp.alpha -= 0.02;
			if (sp.alpha <= 0) {
				sparkles.splice(j, 1);
				continue;
			}
			ctx.beginPath();
			ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
			ctx.fillStyle = sp.color + sp.alpha + ')';
			ctx.shadowColor = sp.color + '0.9)';
			ctx.shadowBlur = 6;
			ctx.fill();
		}
	}
	animate();
})();

$('document').ready(function(){
	function layoutBalloons(speed) {
		var s = (typeof speed !== 'undefined') ? speed : 500;
		var w = $(window).width();
		var vw = w / 2;

		if (w < 600) {
			// Mobile Two-Row Responsive Layout:
			// Row 1: H B D (3 items centered)
			// Row 2: M O U U (4 items centered)
			var bWidth = 80;
			var halfB = bWidth / 2;
			var r1Top = 150;
			var r2Top = 260;
			var spacing = Math.min(78, (w - 20) / 4);

			// Row 1 (H B D):
			var r1Start = vw - spacing - halfB;
			$('#b11').animate({top: r1Top, left: r1Start}, s);
			$('#b22').animate({top: r1Top, left: r1Start + spacing}, s);
			$('#b33').animate({top: r1Top, left: r1Start + spacing * 2}, s);

			// Row 2 (M O U U):
			var r2Start = vw - (1.5 * spacing) - halfB;
			$('#b44').animate({top: r2Top, left: r2Start}, s);
			$('#b55').animate({top: r2Top, left: r2Start + spacing}, s);
			$('#b66').animate({top: r2Top, left: r2Start + spacing * 2}, s);
			$('#b77').animate({top: r2Top, left: r2Start + spacing * 3}, s);
		} else if (w < 820) {
			// Tablet Single-Row Responsive Layout:
			var bTop = 220;
			var spacing = (w - 90) / 6.5;
			var start = vw - (3 * spacing) - 44;
			$('#b11').animate({top: bTop, left: start}, s);
			$('#b22').animate({top: bTop, left: start + spacing * 1}, s);
			$('#b33').animate({top: bTop, left: start + spacing * 2}, s);
			$('#b44').animate({top: bTop, left: start + spacing * 3}, s);
			$('#b55').animate({top: bTop, left: start + spacing * 4}, s);
			$('#b66').animate({top: bTop, left: start + spacing * 5}, s);
			$('#b77').animate({top: bTop, left: start + spacing * 6}, s);
		} else {
			// Desktop Single-Row Layout:
			$('#b11').animate({top: 240, left: vw - 350}, s);
			$('#b22').animate({top: 240, left: vw - 250}, s);
			$('#b33').animate({top: 240, left: vw - 150}, s);
			$('#b44').animate({top: 240, left: vw - 50}, s);
			$('#b55').animate({top: 240, left: vw + 50}, s);
			$('#b66').animate({top: 240, left: vw + 150}, s);
			$('#b77').animate({top: 240, left: vw + 250}, s);
		}
	}

	$(window).resize(function(){
		if ($('#b11').length) {
			$('#b11,#b22,#b33,#b44,#b55,#b66,#b77').stop();
			layoutBalloons(300);
		}
	});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(3500).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});

	$('#play').click(function(){
		var audio = $('.song')[0];
		audio.play();
		$('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('background-color','#ffe5ec');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(4000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		$(this).fadeOut('slow').delay(3500).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	function getRandPos() {
		var balloonW = $(window).width() < 600 ? 80 : 100;
		var maxW = Math.max(20, $(window).width() - balloonW - 15);
		var maxH = Math.max(100, $(window).height() * 0.55);
		return {
			left: Math.max(10, Math.random() * maxW),
			bottom: Math.max(20, Math.random() * maxH)
		};
	}

	function loopOne() {
		var pos = getRandPos();
		$('#b1').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopOne(); });
	}
	function loopTwo() {
		var pos = getRandPos();
		$('#b2').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopTwo(); });
	}
	function loopThree() {
		var pos = getRandPos();
		$('#b3').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopThree(); });
	}
	function loopFour() {
		var pos = getRandPos();
		$('#b4').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopFour(); });
	}
	function loopFive() {
		var pos = getRandPos();
		$('#b5').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopFive(); });
	}
	function loopSix() {
		var pos = getRandPos();
		$('#b6').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopSix(); });
	}
	function loopSeven() {
		var pos = getRandPos();
		$('#b7').animate({left: pos.left, bottom: pos.bottom}, 10000, function(){ loopSeven(); });
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();
		loopSeven();
		
		$(this).fadeOut('slow').delay(4000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').delay(2500).promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

	$('#wish_message').click(function(){
		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22');
		$('#b3').attr('id','b33');
		$('#b4').attr('id','b44');
		$('#b5').attr('id','b55');
		$('#b6').attr('id','b66');
		$('#b7').attr('id','b77');
		
		layoutBalloons(500);

		$('.balloons').css('opacity','0.95');
		$('.balloons h2').fadeIn(2000);
		$(this).fadeOut('slow').delay(3500).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
	$('#story').click(function(){
		$(this).fadeOut('fast');
		$('.cake, .balloons').fadeOut('fast').promise().done(function(){
			$('.message').fadeIn('slow');
		});
		
		var totalMsgs = $('.message p').length;

		function msgLoop (i) {
			$("p:nth-child("+i+")").fadeOut('slow').delay(600).promise().done(function(){
				i = i + 1;
				$("p:nth-child("+i+")").fadeIn('slow').delay(1300);
				if(i > totalMsgs){
					$("p:nth-child("+totalMsgs+")").fadeOut('slow').promise().done(function () {
						$('.cake').fadeIn('fast');
						$('.balloons').fadeIn('slow');
						layoutBalloons(400);
						if (window.startCelebrationHearts) {
							window.startCelebrationHearts();
						}
					});
				}
				else{
					msgLoop(i);
				}			
			});
		}
		
		msgLoop(0);
	});
});