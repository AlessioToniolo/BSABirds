<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Bar from '../../components/Bar.svelte';
	import Pie from '../../components/Pie.svelte';
	import HorizontalBar from '../../components/HorizontalBar.svelte';
	// Import papaparse
	import Papa from 'papaparse';
	// Import onmount from svelte
	import { onMount } from 'svelte';
	import Line from '../../components/Line.svelte';
	let showCard = true;
	/**
	 * @type {string | any[]}
	 */
	let csvData = [];
	async function getCSVData() {
		const response = await fetch('http://localhost:8080/api/graphing', {
			method: 'POST',
			headers: {
				'content-type': 'text/plain',
				accept: 'text/plain'
			}
		}).then((res) => {
			res.json().then((input) => {
				// Organize the metrics into different objects that have a name property and a count property, then push them into the metrics array
				csvData.push(['ID', 'Date', 'Bird Species']);
				input.forEach((e) => {
					// Create another string that is the date in US format with am or pm
					const dateFormat = new Date(e.created_at);
					const another = dateFormat.toLocaleString('en-US', {
						hour: 'numeric',
						minute: 'numeric',
						hour12: true
					});
					const out = `${
						dateFormat.getMonth() + 1
					}/${dateFormat.getDate()}/${dateFormat.getFullYear()}, ${another}`;

					csvData.push([e.id, out, e.bird_species]);
				});
				// TODO test download the metrics
				const csv = Papa.unparse(csvData);
				var dat = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
				var csvURL = null;
				if (navigator.msSaveBlob) {
					csvURL = navigator.msSaveBlob(dat, 'Brookhaven_Bird_Data.csv');
				} else {
					csvURL = window.URL.createObjectURL(dat);
				}
				var tempLink = document.createElement('a');
				tempLink.href = csvURL;
				tempLink.setAttribute('download', 'Brookhaven_Bird_Data.csv');
				tempLink.click();
			});
		});
	}

	// Declare a type as an array of string arrays
	/**
	 * @type {string | any[]}
	 */
	let metrics = [];
	async function getData() {
		const response = await fetch('http://localhost:8080/api/graphing', {
			method: 'POST',
			headers: {
				'content-type': 'text/plain',
				accept: 'text/plain'
			}
		}).then((res) => {
			res.json().then((input) => {
				// Organize the metrics into different objects that have a name property and a count property, then push them into the metrics array
				input.forEach((e) => {
					const species = e.bird_species;

					// Converts the timestamptz to a date object
					const dateFormat = new Date(e.created_at);

					for (let i = 0; i < metrics.length; i++) {
						if (metrics[i].name === species) {
							metrics[i].count++;
							return;
						}
					}
					metrics.push({ name: species, date: dateFormat, count: 1 });
				});
				// Sort the metrics array alphabetically
				metrics.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});
			});
		});
	}

	let lineMetrics = [];
	async function getLineData() {
		const response = await fetch('http://localhost:8080/api/graphing', {
			method: 'POST',
			headers: {
				'content-type': 'text/plain',
				accept: 'text/plain'
			}
		}).then((res) => {
			// Create buckets for each bird species containing the date and bird species
			// Each bucket will have a date property with an array of all the dates that species was seen
			res.json().then((input) => {
				input.forEach((e) => {
					const species = e.bird_species;
					const dateFormat = new Date(e.created_at);

					for (let i = 0; i < lineMetrics.length; i++) {
						if (lineMetrics[i].name === species) {
							lineMetrics[i].date.push(dateFormat);
							return;
						}
					}

					lineMetrics.push({ name: species, date: [dateFormat] });
				});

				// Sort the metrics array alphabetically
				lineMetrics.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});

				// Loop through line metrics and print each element
				lineMetrics.forEach((e) => {
					console.log(e);
				});
			});
		});
	}

	onMount(async () => {
		await getData();
		await getLineData();
	});

	function viewData() {
		showCard = false;
	}

	// SEARCHING CODE
	let searchValue = '';
	let showResults = false;
	let searchResults = [];
	let showSingleResult = false;
	/**
	 * @type {any[]}
	 */
	let miniData = [];

	function searchForBird() {
		const query = searchValue.toUpperCase();

		if (query.length < 1) {
			showResults = false;
		} else {
			showResults = true;
		}

		// Filter the metrics
		searchResults = data.records.filter((record) => {
			return record[0].toUpperCase().includes(query);
		});

		const cutoff = 5;

		if (searchResults.length > cutoff) {
			searchResults = searchResults.slice(0, cutoff);
		}
	}

	function queriedBird(selectedText) {
		searchValue = selectedText;
		showSingleResult = true;
		showResults = false;
		// Finds the bird in the lineMetrics array and pushes it into the miniData array
		lineMetrics.forEach((e) => {
			if (e.name === selectedText) {
				miniData = [e];
			}
		});
	}
</script>

{#if showCard}
	<div class="mx-auto card w-80 sm:w-96 bg-base-100 shadow-xl">
		<figure>
			<img src="graph-bird.jpeg" alt="White Little Bird" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">Visualize Bird Data</h2>
			<p>
				View bird population metrics.<br /><b> RECOMMENDED ONLY ON DESKTOP!</b>
			</p>
			<div class="card-actions justify-end pt-5">
				<button class="btn btn-primary" on:click={viewData}>View Data</button>
				<button class="btn btn-tertiary" on:click={getCSVData}>Download CSV</button>
			</div>
		</div>
	</div>
{:else}
	<div class="mx-4 flex justify-center p-4 bg-base-200 rounded-2xl">
		<div class="dropdown">
			<label tabindex="0"
				><input
					bind:value={searchValue}
					on:input={searchForBird}
					type="text"
					placeholder="Search by Bird"
					class="input input-bordered"
				/></label
			>
			{#if showResults}
				<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
					{#each searchResults as result}
						<li on:click={queriedBird(result[0])}>
							<a>{result[0]}</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

	{#if showSingleResult}
		{#key miniData}
			<div class="px-4 sm:px-8">
				<Line records={miniData} />
			</div>
		{/key}
	{:else}
		<div class="px-4 sm:px-8">
			<div class="hidden md:contents"><Bar records={metrics} /></div>
			<div class="contents md:hidden"><HorizontalBar records={metrics} /></div>
		</div>
	{/if}
{/if}
