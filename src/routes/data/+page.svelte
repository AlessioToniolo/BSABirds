<script>
	/** @type {import('./$types').PageData} */
	export let info;
	import Bar from '../../components/Bar.svelte';
	import Pie from '../../components/Pie.svelte';
	// Import papaparse
	import Papa from 'papaparse';
	// Import onmount from svelte
	import { onMount } from 'svelte';
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
				// Organize the data into different objects that have a name property and a count property, then push them into the data array
				input.forEach((e) => {
					// Push raw data into csvData array
					csvData.push([e.id, e.created_at, e.bird_species]);
				});

				// TODO test download the data
				const csv = Papa.unparse(csvData);
				var dat = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
				var csvURL = null;
				if (navigator.msSaveBlob) {
					csvURL = navigator.msSaveBlob(dat, 'download.csv');
				} else {
					csvURL = window.URL.createObjectURL(dat);
				}

				var tempLink = document.createElement('a');
				tempLink.href = csvURL;
				tempLink.setAttribute('download', 'download.csv');
				tempLink.click();
			});
		});
	}

	// Declare a type as an array of string arrays
	/**
	 * @type {string | any[]}
	 */
	let data = [];
	async function getData() {
		const response = await fetch('http://localhost:8080/api/graphing', {
			method: 'POST',
			headers: {
				'content-type': 'text/plain',
				accept: 'text/plain'
			}
		}).then((res) => {
			res.json().then((input) => {
				// Organize the data into different objects that have a name property and a count property, then push them into the data array
				input.forEach((e) => {
					const species = e.bird_species;
					for (let i = 0; i < data.length; i++) {
						if (data[i].name === species) {
							data[i].count++;
							return;
						}
					}
					data.push({ name: species, count: 1 });
				});

				// Sort the data array alphabetically
				data.sort((a, b) => {
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

	onMount(() => {
		getData();
	});

	function viewData() {
		showCard = false;
	}
</script>

{#if showCard}
	<div class="mx-auto mt-12 card w-96 bg-base-100 shadow-xl">
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
{/if}

{#if !showCard}
	<div class="mt-5 navbar bg-base-200 rounded-2xl">
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl">Reset Charts</a>
		</div>
		<div class="flex-none gap-2">
			<div class="form-control">
				<input type="text" placeholder="Search" class="input input-bordered" />
			</div>
		</div>
	</div>

	<Bar records={data} />
	<div class="divider" />
	<div class="w-1/2 mx-auto pb-12">
		<Pie records={data} />
	</div>
{/if}
