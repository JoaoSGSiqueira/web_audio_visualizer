// Document elements
const dropdown = document.getElementById('sourceSelector');
const audioElement = document.getElementById('audio');
const sourceElement = audioElement.querySelector('source');
const audioSrc = sourceElement.getAttribute('src');
audioElement.src = audioSrc;
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');

// Visualizer parameters
const canvas = document.getElementById('visualizer');
const canvasCtx = canvas.getContext('2d');
const WIDTH = (canvas.width = 1800);
const HEIGHT = (canvas.height = 150);
canvasCtx.scale(devicePixelRatio, devicePixelRatio);
canvasCtx.imageSmoothingEnabled = false;
const audio = new Audio();

// Audio analyser
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audioElement);
const distortion = audioCtx.createWaveShaper();
source.connect(analyser);
analyser.connect(distortion);
distortion.connect(audioCtx.destination);

analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
let drawVisual;
function draw() {
	drawVisual = requestAnimationFrame(draw);

	analyser.getByteFrequencyData(dataArray);
	canvasCtx.imageSmoothingEnabled = false;
	canvasCtx.fillStyle = 'rgb(0, 0, 0)';
	canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
	const barWidth = (WIDTH / bufferLength) * 2.5;
	let barHeight;
	let x = 0;
	for (let i = 0; i < bufferLength; i++) {
		const barHeight = (dataArray[i] / 255) * HEIGHT;

		const red = 255 - barHeight;
		const green = 50;
		const blue = barHeight + 100;

		canvasCtx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
		canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

		x += barWidth + 1;
	}
}

// Add an event listener to the dropdown
playButton.addEventListener('click', function () {
	const selectedOption = dropdown.value;

	if (selectedOption == 'file') {
		//audio.src = 'night_dancer.mp3';
		playButton.addEventListener('click', function () {
			audioElement.play();
			draw();
		});
		pauseButton.addEventListener('click', function () {
			audioElement.pause();
		});
	}
});

export {dropdown, audioElement, playButton, pauseButton};
