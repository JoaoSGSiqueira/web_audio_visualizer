(function () {
	let isDragging = false; // Flag to check if the right mouse button is held
	const knob = document.querySelector('.knob');
	const maxAngle = 90;

	function startDrag(e) {
		// if button is left mouse button and target is the knob
		if (e.button === 0 && e.target === knob) {
			// Check for the drag event
			isDragging = true;
			document.body.style.userSelect = 'none'; // Prevent text selection while dragging
		}
	}

	function endDrag() {
		// Check for the drag event
		isDragging = false;
		document.body.style.userSelect = 'auto'; // Restore text selection
	}

	function mouseAngle(e) {
		if (isDragging) {
			const _mouseX = e.clientX;
			const _w = window.innerWidth / 2;
			let _angle = (_mouseX - _w) / 4;
			_angle = Math.min(Math.max(_angle, -maxAngle), maxAngle); // Clamp the angle between -180 and 180
			knob.style.transform = `rotate(${_angle}deg)`;
		}
	}

	document.addEventListener('mousedown', startDrag, false);
	document.addEventListener('mouseup', endDrag, false);
	document.addEventListener('mousemove', mouseAngle, false);
})();

(function () {
	let isDragging = false;
	const thumb = document.querySelector('.slider-thumb');
	const sliderTrack = document.querySelector('.slider-track');

	function startDrag(e) {
		if (e.button === 0 && e.target === thumb) {
			isDragging = true;
			document.body.style.userSelect = 'none';
		}
	}

	function endDrag() {
		isDragging = false;
		document.body.style.userSelect = 'auto';
	}

	function mouseOffset(e) {
		if (isDragging) {
			const mouseY = e.clientY;
			const sliderRect = sliderTrack.getBoundingClientRect();
			let offset = mouseY - sliderRect.top - thumb.offsetHeight / 2;

			// Constrain the thumb's position within the track
			if (offset < 0) {
				offset = 0;
			} else if (offset > sliderTrack.clientHeight - thumb.clientHeight) {
				offset = sliderTrack.clientHeight - thumb.clientHeight;
			}

			thumb.style.transform = `translate(0, ${offset}px)`;
		}
	}

	document.addEventListener('mousedown', startDrag, false);
	document.addEventListener('mouseup', endDrag, false);
	document.addEventListener('mousemove', mouseOffset, false);
})();
