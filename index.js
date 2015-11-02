$(function () {
	var isMouseDown = false;
	var CurrentControl;

	var winHalf = $(window).height() / 2;

	var controls = $('.js-control');

	var aspect = {
		x: "xMin",
		y: "YMin",
		s: "meet"
	}

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
		reDraw(viewPort, viewBox);
	});

	$('.ya').on('change', function () {
		aspect.y = $(this).val();
		reDraw(viewPort, viewBox);
	});

	$('.sa').on('change', function () {
		aspect.s = $(this).val();
		reDraw(viewPort, viewBox);
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

			reDraw(viewPort, viewBox);
		}
	});

	var reDraw = function (viewPort, viewBox) {
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

		var vbText = (viewBox.left) + ' ' + (viewBox.top) + ' ' + (viewBox.right - viewBox.left) + ' ' + (viewBox.bottom - viewBox.top);
		var aspectText = aspect.x + aspect.y + " " + aspect.s;

		$('.js-sizer').css({
			top: viewPort.top,
			left: viewPort.left,
			width: viewPort.right - viewPort.left,
			height: viewPort.bottom - viewPort.top
		}).get(0).setAttribute("viewBox", vbText);

		$('.js-sizer').get(0).setAttribute("preserveAspectRatio", aspect.s !== "none" ? aspectText : "none");

		$('.aspecttext').text(aspectText);
		$('.viewboxtext').text(vbText);
		$('.viewporttext').text('width: ' + (viewPort.right - viewPort.left) + '; height: ' + (viewPort.bottom - viewPort.top));
	};

	reDraw(viewPort, viewBox);
});