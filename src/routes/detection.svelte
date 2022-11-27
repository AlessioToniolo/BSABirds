<script>
	import papaparse from 'papaparse';

	async function loadCSVData() {
		await fetch('https://bird-ml-server.vercel.app/api/listOfBirdSpecies.csv', {
			method: 'GET'
		}).then((res) => {
			/*
			const parseStream = papaparse.parse(papaparse.NODE_STREAM_INPUT);
			res.body.pipe(parseStream);

			let data = [];
			parseStream.on('data', (row) => {
				data.push(row);
			});
			parseStream.on('end', () => {
				console.log(data);
			});

			console.log(res.body);
			return res;
			*/
		});
	}

	// TODO: machine learning section
	import * as tf from '@tensorflow/tfjs';

	let videoSource = null;
	let loading = false;

	const obtainVideoCamera = async () => {
		try {
			loading = true;
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true
			});
			videoSource.srcObject = stream;
			videoSource.play();
			loading = false;
		} catch (error) {
			console.log(error);
		}
	};

	let image;
	//let container;
	// Webcam promise return
	async function loadImage() {
		const camera = await tf.data.webcam(videoSource);
		// Image camera capture promise return.
		image = await camera.capture();
		image = tf.expandDims(tf.image.resizeBilinear(image, [150, 150]).div(tf.scalar(255)), 0);
		image.print();
		/*
		container = document.createElement('canvas');
		// Stopping the camera.
		camera.stop();
		*/
	}

	// Load and process model
	let model = undefined;
	let prediction;

	// TODO test code
	async function predictWebcam() {
		tf.loadLayersModel('https://bird-ml-server.vercel.app/api/model.json').then((loadedModel) => {
			model = loadedModel;
			model.summary();
			prediction = model.predict(image);
			const predictionArray = prediction.data().then((arr) => {
				console.log(arr);
				let max = arr[0];
				let maxIndex = 0;
				for (let i = 0; i < arr.length; i++) {
					if (arr[i] >= max) {
						maxIndex = i;
						max = arr[i];
					}
				}
				console.log(maxIndex);
				console.log(max * 100);

				/*
				loadCSVData().then((arrOfSpecies) => {
					console.log(arrOfSpecies);
				});
				*/
				papaparse.parse('https://bird-ml-server.vercel.app/api/listOfBirdSpecies.csv', {
					download: true,
					complete: (results) => {
						console.log(results.data[maxIndex][0]);
					}
				});
			});
		});
	}
</script>

<div>
	{#if loading}
		<h1>LOADING</h1>
	{/if}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={videoSource} />
	<button on:click={obtainVideoCamera}>CLICK</button>
</div>
<div>
	<button class="btn" on:click={loadImage}>Take a picture</button>
	<button class="btn-primary" on:click={predictWebcam}>Predict Bird</button>
</div>
<h1>{prediction}</h1>
<!--<div bind:this={container} id="resized-image"></div>-->
<button on:click={loadCSVData}>load csv data</button>
