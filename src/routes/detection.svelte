<script>
	import * as tf from '@tensorflow/tfjs';
	//import * as tfn from '@tensorflow/tfjs-node';

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

	// Load and process model
	let model = undefined;

	// TODO test code
	async function predictWebcam() {
		tf.loadLayersModel('http://localhost:8080/api/model.json').then((loadedModel) => {
			model = loadedModel;
			model.summary();
		});
		/*
		// Now let's start classifying a frame in the stream.
		model.detect(videoSource).then((predictions) => {
			//showDetections(predictions);
			requestAnimationFrame(predictWebcam);
		});
		*/
		console.log(model);
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
	<button on:click={predictWebcam}>Predict Bird</button>
</div>
