<script>
	/** @type {import('./$types').PageData} */
	export let data;

	// Switch between search and dropdown
	let showSearchBar = true;

	function switchSearch() {
		showSearchBar = !showSearchBar;
	}

	// Search for a bird species
	let searchValue = '';
	let showResults = false;
	let showChoice = false;
	let showSuccess = false;
	let showDropdown = true;
	let searchResults = [];
	let speciesName = '';

	function searchForBird() {
		const query = searchValue.toUpperCase();

		if (query.length < 1) {
			showResults = false;
		} else {
			showResults = true;
		}

		// Filter the data
		searchResults = data.records.filter((record) => {
			return record[0].toUpperCase().includes(query);
		});

		const cutoff = 7;

		if (searchResults.length > cutoff) {
			searchResults = searchResults.slice(0, cutoff);
		}
	}

	function logBird(nameOfSpecies) {
		speciesName = nameOfSpecies;
		showChoice = true;
	}

	async function logData() {
		const response = await fetch('https://bird-ml-server.vercel.app/api/logging', {
			method: 'POST',
			body: speciesName,
			headers: {
				'content-type': 'text/plain',
				accept: 'text/plain'
			}
		}).then((res) => {
			console.log(res.json());
		});

		clearScreen();
	}

	// Helper function
	function clearScreen() {
		showResults = false;
		showChoice = false;
		showSearchBar = false;
		showSuccess = true;
		showDropdown = false;
	}

	// TODO for testing purposes only
	searchForBird();
</script>

{#if showSuccess}
	<div class="mx-auto alert alert-success max-w-xs sm:max-w-md shadow-lg">
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
			<span>Successfully logged, thank you for your contribution!</span>
		</div>
	</div>
{:else}
	<div class="container my-8 py-6 card bg-slate-100 max-w-sm">
		{#if showSearchBar}
			<div class="mx-auto form-control w-xs">
				<span class="label">
					<span class="label-text">Search for a bird species to submit</span>
				</span>
				<input
					bind:value={searchValue}
					on:input={searchForBird}
					type="text"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
				/>
				<span class="label">
					<div on:click={switchSearch}>
						<span class="text-primary hover:text-gray-900 label-text-alt"
							>Use a dropdown instead</span
						>
					</div>
				</span>
			</div>

			{#if showResults}
				<div class="mx-auto mt-2">
					<table class="table table-compact table-zebra">
						<!-- head -->
						<thead>
							<tr>
								<th>Bird Species</th>
							</tr>
						</thead>
						<tbody>
							{#each searchResults as result}
								<tr>
									<td
										><div class="flex justify-between">
											<p>{result[0]}</p>
											<div class="pl-6">
												<button
													on:click={logBird(result[0])}
													class="btn btn-xs btn-outline btn-primary">Select</button
												>
											</div>
										</div></td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}

			{#if showChoice}
				<div class="text-center justify-center px-8 mt-8">
					<div class="card bg-secondary">
						<div class="card-body items-center text-center">
							<h2 class="card-title">Selected Species:</h2>
							<p><b>{speciesName}</b></p>
							<div class="mt-2 space-x-1 card-actions justify-end">
								<button on:click={logData} class="btn btn-primary">Log Bird</button>
							</div>
						</div>
					</div>
				</div>
			{/if}
		{:else if showDropdown}
			<div class="mx-auto w-xs form-control">
				<select class="select select-bordered">
					<option disabled selected>Pick one</option>
					{#each data.records as record}
						<div on:click={logBird(record[0])}>
							<option value={record[0]}>{record[0]}</option>
						</div>
					{/each}
				</select>
				<div class="label">
					<a on:click={switchSearch}
						><span class="text-primary hover:text-gray-900 label-text-alt"
							>Use a search instead</span
						></a
					>
				</div>
			</div>
		{/if}
	</div>
{/if}
