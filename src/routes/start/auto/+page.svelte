<script>
	import papaparse from 'papaparse';
	import * as tf from '@tensorflow/tfjs';

	let showCamera = true;
	let showDetection = false;
	let showTakePictureButton = false;
	let showPredictButton = false;
	let showVideoSource = false;
	let showCanvasSource = false;
	let showResult = false;
	let error;
	let videoSource = null;
	let loading = false;
	let secondLoading = false;
	let image;
	let imageCanvas;
	let model = undefined;
	let prediction;
	let accuracy;

	const obtainVideoCamera = async () => {
		showVideoSource = true;
		try {
			showCamera = false;
			loading = true;
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true
			});
			videoSource.srcObject = stream;
			videoSource.play();
			loading = false;
			showTakePictureButton = true;
		} catch (error) {
			console.log(error);
		}
	};

	async function loadImage() {
		showCanvasSource = true;
		loading = true;
		const camera = await tf.data.webcam(videoSource);
		image = await camera.capture();
		showTakePictureButton = false;
		showCamera = false;
		showVideoSource = false;
		await tf.browser.toPixels(image, imageCanvas);
		image = tf.expandDims(tf.image.resizeBilinear(image, [150, 150]).div(tf.scalar(255)), 0);
		loading = false;
		showPredictButton = true;
	}

	async function predictWebcam() {
		showPredictButton = false;
		secondLoading = true;
		tf.loadLayersModel('https://bird-ml-server.vercel.app/api/model.json').then((loadedModel) => {
			model = loadedModel;
			model.summary();
			const predictionData = model.predict(image);
			predictionData.data().then((arr) => {
				let max = arr[0];
				let maxIndex = 0;
				for (let i = 0; i < arr.length; i++) {
					if (arr[i] >= max) {
						maxIndex = i;
						max = arr[i];
					}
				}
				accuracy = Math.round(max * 100);
				papaparse.parse('https://bird-ml-server.vercel.app/api/listOfBirdSpecies.csv', {
					download: true,
					complete: (results) => {
						prediction = results.data[maxIndex][0];
					}
				});
				secondLoading = false;
				showDetection = true;
			});
		});
	}

	async function logData() {
		const response = await fetch('https://bird-ml-server.vercel.app/api/logging', {
			method: 'POST',
			body: prediction,
			headers: {
				'content-type': 'text/plain',
				accept: 'text/plain'
			}
		}).then((res) => {
			console.log(res.json());
		});

		clearScreen();
		showResult = true;
		error = response;
	}

	// Helper function
	function clearScreen() {
		showDetection = false;
		showCamera = false;
		showVideoSource = false;
		showCanvasSource = false;
		showTakePictureButton = false;
		showPredictButton = false;
	}
</script>

<div
	class="w-max mt-12 ml-auto mr-auto flex-initial justify-center content-center px-12 text-center py-2"
>
	<div class="text-center justify-center">
		{#if loading}
			<div class="mt-12 alert alert-warning shadow-lg">
				<div>
					<strong>LOADING...</strong>
				</div>
			</div>
		{/if}
		<!-- svelte-ignore a11y-media-has-caption -->
		{#if showVideoSource}
			<video bind:this={videoSource} />
		{/if}
		{#if showCanvasSource}
			<canvas bind:this={imageCanvas} />
		{/if}
		{#if showCamera}
			<div class="card w-96 bg-base-100 shadow-xl">
				<figure><img src="/hundredpicture.jpg" alt="Shoes" /></figure>
				<div class="card-body">
					<h2 class="card-title">Identify Bird Species</h2>
					<p class="text-left">
						BSABirds will automatically identify a bird picture taken on your camera!
					</p>
					<div class="card-actions justify-center pt-2">
						<button class="btn-primary btn" on:click={obtainVideoCamera}>Turn on Camera</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div>
		{#if showTakePictureButton}
			<button class="btn mt-2" on:click={loadImage}>Take a picture</button>
		{/if}
		{#if showPredictButton}
			<button class="btn btn-primary mt-2" on:click={predictWebcam}>Predict Bird</button>
		{/if}
		{#if secondLoading}
			<div class="mt-12 alert alert-warning shadow-lg">
				<div>
					<strong>LOADING...</strong>
				</div>
			</div>
		{/if}
	</div>
	{#if showDetection}
		<div class="text-center justify-center ml-auto mr-auto mt-8 card w-96 bg-base-100 shadow-xl">
			<div class="card w-96 bg-secondary">
				<div class="card-body items-center text-center">
					<h2 class="card-title">Bird Species:</h2>
					<p><b>{prediction}</b> with {accuracy}% certainty!</p>
					<div class="mt-2 space-x-1 card-actions justify-end">
						<button on:click={logData} class="btn btn-primary">Log Bird</button>
						<a href="/">
							<button class="btn btn-neutral">Try Again</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
	{#if showResult}
		{#if error}
			<div class="alert alert-error shadow-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>Error! Something went wrong...</span>
				</div>
			</div>
		{:else}
			<div class="alert alert-success shadow-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>Bird saved in databse succesfully!</span>
				</div>
			</div>
		{/if}
	{/if}
</div>
