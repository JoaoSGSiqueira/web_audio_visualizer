import {audioElement} from './visualizer.js';
const imgElement = document.getElementById('coverImage');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const album = document.getElementById('album');
const year = document.getElementById('year');

audio.addEventListener('canplay', function () {
	jsmediatags.read(audioElement.src, {
		onSuccess: function (result) {
			title.innerHTML = result.tags.title;
			artist.innerHTML = result.tags.artist;
			album.innerHTML = result.tags.album;
			year.innerHTML = result.tags.year;

			if (result.tags.picture) {
				const {data, format} = result.tags.picture;
				let base64String = '';
				for (let i = 0; i < data.length; i++) {
					base64String += String.fromCharCode(data[i]);
				}
				const resizedImage = `data:${format};base64,${window.btoa(base64String)}`;
				//resizedImage.width = 50;
				//resizedImage.height = 50;
				imgElement.src = resizedImage;
			} else {
				console.log('No cover picture found.');
			}
		},
		onError: function (error) {
			console.log(':(', error.type, error.info);
		},
	});
});
