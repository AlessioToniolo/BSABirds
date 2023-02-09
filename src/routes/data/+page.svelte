<script>
	import { get } from 'svelte/store';
	import Bar from '../../components/Bar.svelte';
	// Import papaparse
	import Papa from 'papaparse';

	let showCard = true;

	// Declare a type as an array of string arrays
	/**
	 * @type {string | any[]}
	 */
	let data = [];
	let csvData = [];
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
					// First push raw data into csvData array
					csvData.push([e.id, e.created_at, e.bird_species]);

					const species = e.bird_species;
					for (let i = 0; i < data.length; i++) {
						if (data[i].name === species) {
							data[i].count++;
							return;
						}
					}
					data.push({ name: species, count: 1 });
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

	getData();

	function viewData() {
		showCard = false;
	}

	function getCSVData() {
		const csv = Papa.unparse(csvData);

		var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		var csvURL = null;
		if (navigator.msSaveBlob) {
			csvURL = navigator.msSaveBlob(csvData, 'download.csv');
		} else {
			csvURL = window.URL.createObjectURL(csvData);
		}

		var tempLink = document.createElement('a');
		tempLink.href = csvURL;
		tempLink.setAttribute('download', 'download.csv');
		tempLink.click();
	}
</script>

{#if showCard}
	<div class="mx-auto mt-12 card w-96 bg-base-100 shadow-xl">
		<figure>
			<img src="graph-bird.jpeg" alt="White Little Bird" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">Visualize Bird Data</h2>
			<p>View bird population metrics or download all historical recorded data.</p>
			<div class="card-actions justify-end pt-5">
				<button class="btn btn-primary" on:click={viewData}>View Data</button>
				<button class="btn btn-secondary" on:click={getCSVData}>Download CSV</button>
			</div>
		</div>
	</div>
{/if}

{#if !showCard}
	<Bar records={data} />
{/if}
