<script>
	/** @type {import('./$types').PageData} */
	export let data;

	// Switch between search and dropdown
	let showSearchBar = true;

	function switchSearch() {
		showSearchBar = !showSearchBar;
	}

	// Search for a bird species
	let searchValue = 'car'; // TODO for testing purposes only
	let showResults = false;
	let showChoice = false;
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

	function logData() {
		console.log('updated to supabase');
	}

	// TODO for testing purposes only
	searchForBird();
</script>

{#if showSearchBar}
	<div class="mx-auto mt-5 form-control w-full max-w-xs">
		<label class="label">
			<span class="label-text">Search for a bird species to submit</span>
			<!--<span class="label-text-alt">Or use a dropdown menu</span>-->
		</label>
		<input
			bind:value={searchValue}
			on:input={searchForBird}
			type="text"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
		/>
		<label class="label">
			<a on:click={switchSearch}
				><span class="text-primary hover:text-gray-900 label-text-alt">Use a dropdown instead</span
				></a
			>
		</label>
	</div>

	{#if showResults}
		<div class="overflow-x-auto mx-auto max-w-xs mt-2">
			<table class="table table-compact table-zebra w-full">
				<!-- head -->
				<thead>
					<tr>
						<th>Bird Species</th>
					</tr>
				</thead>
				<tbody>
					{#each searchResults as result}
						<tr>
							<td on:click={logBird(result[0])}
								><div class="flex justify-between">
									{result[0]} <button class="btn btn-xs btn-outline btn-primary">Select</button>
								</div></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	{#if showChoice}
		<div class="text-center justify-center ml-auto mr-auto mt-8 card w-96 bg-base-100 shadow-xl">
			<div class="card w-96 bg-secondary">
				<div class="card-body items-center text-center">
					<h2 class="card-title">Selected Species:</h2>
					<div class="mt-2 space-x-1 card-actions justify-end">
						<button on:click={logData} class="btn btn-primary">Log Bird</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
{:else}
	<div class="form-control w-full max-w-xs">
		<label class="label">
			<span class="label-text">Pick the best fantasy franchise</span>
		</label>
		<select class="select select-bordered">
			<option disabled selected>Pick one</option>
			{#each data.records as record}
				<option value={record[0]}>{record[0]}</option>
			{/each}
		</select>
		<label class="label">
			<a on:click={switchSearch}
				><span class="text-primary hover:text-gray-900 label-text-alt">Use a search instead</span
				></a
			>
		</label>
	</div>
{/if}
