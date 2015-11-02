$(function () {
	var isMouseDown = false;
	var CurrentControl;

	var controls = $('.js-control');
	var body = $('body');
	var resultSVG = $('.js-dest');

	var winHalf = body.height() / 2;

	var viewPort = {
		left: 10,
		top: 10,
		right: 200,
		bottom: 200
	};

	var viewBox = {
		left: 50,
		top: 50,
		right: 250,
		bottom: 250
	};

	var aspect = {
		x: "xMin",
		y: "YMin",
		s: "meet"
	};

	controls.on('mousedown', function (event) {
		isMouseDown = true;
		CurrentControl = $(this);

		event.stopPropagation();
	});

	$('body').on('mouseup', function () {
		isMouseDown = false;
		CurrentControl = null;
	});

	$('.xa').on('change', function () {
		aspect.x = $(this).val();
		reDraw();
	});

	$('.ya').on('change', function () {
		aspect.y = $(this).val();
		reDraw();
	});

	$('.sa').on('change', function () {
		aspect.s = $(this).val();
		reDraw();
	});

	$('body').on('mousemove', function (event) {
		if (CurrentControl && isMouseDown) {
			if (CurrentControl.hasClass('tl')) {
				viewPort.top = event.pageY - winHalf;
				viewPort.left = event.pageX;
			}

			if (CurrentControl.hasClass('br')) {
				viewPort.bottom = event.pageY - winHalf;
				viewPort.right = event.pageX;
			}

			if (CurrentControl.hasClass('btl')) {
				viewBox.top = event.pageY;
				viewBox.left = event.pageX;
			}

			if (CurrentControl.hasClass('bbr')) {
				viewBox.bottom = event.pageY;
				viewBox.right = event.pageX;
			}

			reDraw();
		}
	});

	var reDraw = function () {
		controls.filter('.tr').css({
			top: viewPort.top - 10,
			left: viewPort.right - 10
		}).text(viewPort.right + ',' + viewPort.top);

		controls.filter('.bl').css({
			left: viewPort.left - 10,
			top: viewPort.bottom - 10
		}).text(viewPort.left + ',' + viewPort.bottom);

		controls.filter('.tl').css({
			top: viewPort.top - 10,
			left: viewPort.left - 10
		}).text(viewPort.left + ',' + viewPort.top);

		controls.filter('.br').css({
			left: viewPort.right - 10,
			top: viewPort.bottom - 10
		}).text(viewPort.right + ',' + viewPort.bottom);

		controls.filter('.btr').css({
			top: viewBox.top - 10,
			left: viewBox.right - 10
		}).text(viewBox.right + ',' + viewBox.top);

		controls.filter('.bbl').css({
			left: viewBox.left - 10,
			top: viewBox.bottom - 10
		}).text(viewBox.left + ',' + viewBox.bottom);

		controls.filter('.btl').css({
			top: viewBox.top - 10,
			left: viewBox.left - 10
		}).text(viewBox.left + ',' + viewBox.top);

		controls.filter('.bbr').css({
			left: viewBox.right - 10,
			top: viewBox.bottom - 10
		}).text(viewBox.right + ',' + viewBox.bottom);

		var viewBoxText = viewBox.left + ' ' + viewBox.top + ' ' + (viewBox.right - viewBox.left) + ' ' + (viewBox.bottom - viewBox.top);
		var aspectText = aspect.s !== "none" ? aspect.x + aspect.y + " " + aspect.s : aspect.s;

		$('.js-border').css({
			top: viewBox.top,
			left: viewBox.left,
			width: viewBox.right - viewBox.left,
			height: viewBox.bottom - viewBox.top
		});

		resultSVG.css({
			top: viewPort.top,
			left: viewPort.left,
			width: viewPort.right - viewPort.left,
			height: viewPort.bottom - viewPort.top
		});

		resultSVG.get(0).setAttribute("viewBox", viewBoxText);
		resultSVG.get(0).setAttribute("preserveAspectRatio", aspectText);

		$('.aspecttext').text(aspectText);
		$('.viewboxtext').text(viewBoxText);
		$('.viewporttext').text('width: ' + (viewPort.right - viewPort.left) + '; height: ' + (viewPort.bottom - viewPort.top));
	};

	reDraw();
});