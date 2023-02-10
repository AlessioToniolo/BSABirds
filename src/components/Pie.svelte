<script>
	export let records;
	import { Pie } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
	Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
	// Import onmount from svelte
	import { onMount } from 'svelte';

	let data = {};
	let loading = true;
	onMount(() => {
		/*
		 * records.map((record) => record.count)
		 */
		const names = records.map((record) => record.name);
		const counts = records.map((record) => record.count);

		// Generate a random color for each bar
		const backgroundColors = [];
		const borderColors = [];
		for (let i = 0; i < names.length; i++) {
			const r = Math.floor(Math.random() * 255);
			const g = Math.floor(Math.random() * 255);
			const b = Math.floor(Math.random() * 255);
			backgroundColors.push(`rgba(${r}, ${g}, ${b}, 0.4)`);
			borderColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
		}

		data = {
			labels: names,
			datasets: [
				{
					label: 'Total Recorded Sightings',
					data: counts,
					backgroundColor: backgroundColors,
					hoverBackgroundColor: borderColors
				}
			]
		};
		loading = false;
	});
</script>

{#if loading}
	<h1>Loading...</h1>
{:else}
	<div class="mt-12">
		<Pie {data} options={{ responsive: true }} />
	</div>
{/if}
