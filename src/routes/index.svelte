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
		<div class="container min-width-max x bg-primary flex justify-center py-10">
			<div class="card w-80 bg-base-100 shadow-xl">
				<figure><img src="../../static/whitebird.jpeg" alt="White Bird" /></figure>
				<div class="card-body">
					<p class="card-title">About BSABirds</p>
					<p>
						<span class="font-semibold">BSABirds</span> provides data for bird species populations
						in
						<a href="https://www.brookhavenga.gov/" class="underline hover:text-primary"
							>Brookhaven, Georgia</a
						> by recording sightings of birds in parks.
					</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Track Birds</button>
					</div>
				</div>
			</div>
		</div>
		<div class="container min-width-max flex justify-center py-10">
			<div class="card w-80 bg-base-100 shadow-xl image-full">
				<figure><img src="../../static/murphey.jpeg" alt="Shoes" /></figure>
				<div class="card-body">
					<h2 class="card-title">How it works</h2>
					<p>
						BSABirds allows users to log birds by using an automatic bird classification through a
						phone camera or logging the species manually.
					</p>
					<div class="card-actions justify-end">
						<button class="btn btn-tertiary">Learn More</button>
					</div>
				</div>
			</div>
		</div>
		<div class="container min-width-max bg-secondary flex justify-center py-10">
			<div class="card w-80 bg-base-100 shadow-xl">
				<figure><img src="../../static/motmot.jpeg" alt="White Bird" /></figure>
				<div class="card-body">
					<h2 class="card-title">Participating parks</h2>
					<p>
						Visitors to Brookhaven parks can either scan the QR Code on the park's entrance
						flyer/sign or visit <a
							href="https://bsabirds.herokuapp.com"
							class="underline hover:text-primary">this site</a
						>.
					</p>
					<div class="card-actions justify-end">
						<button class="btn btn-secondary">View Parks</button>
					</div>
				</div>
			</div>
		</div>
		<!--
		<div class="container min-width-max flex justify-center py-10">
			<div class="flex flex-col">
				<div class="mb-2">
					<p class="text-neutral font-semibold text-xl">Contact Us</p>
				</div>
				<div class="form-control">
					div
					<label class="label">Email</label>
					<input type="text" placeholder="Email" class="input input-bordered w-full max-w-xs" />
					<label class="input-group my-2">
						<span>Name</span>
						<input type="text" placeholder="Bob Smith" class="input input-bordered" />
					</label>
					<label class="input-group">
						<span>Subject</span>
						<input type="text" placeholder="Inquiry About Birds" class="input input-bordered" />
					</label>
				</div>
			</div>
		</div>
	-->
	</div>
</div>
