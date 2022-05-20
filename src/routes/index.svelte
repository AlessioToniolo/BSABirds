<script>
	import Layout from './__layout.svelte';
</script>

<div class="container mx-auto min-width-max flex justify-center">
	<div class="flex flex-wrap justify-center">
		<div class="mb-5 mt-10">
			<img src="../../static/undraw_nature_m5ll.svg" alt="nature birds" class="h-40" />
		</div>
		<div class="sm:basis-1/2 text-center mb-5">
			<p class="text-primary font-extrabold text-3xl">Help Track Birds in Brookhaven's Parks</p>
		</div>
		<div class="mb-10"><a class="btn btn-primary">Get started</a></div>
		<div class="container min-width-max bg-primary flex justify-center py-10">
			<div class="card w-80 bg-base-100 shadow-xl">
				<figure><img src="../../static/whitebird.jpeg" alt="White Bird" /></figure>
				<div class="card-body">
					<h2 class="card-title">How to access it?</h2>
					<p>
						Visitors to Brookhaven parks can either scan the QR Code on the park's entrance sign or
						visit <a href="https://bsabirds.herokuapp.com" class="underline hover:text-primary"
							>this site</a
						>
					</p>
					<div class="card-actions justify-end">
						<button class="btn btn-tertiary">View Parks</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
