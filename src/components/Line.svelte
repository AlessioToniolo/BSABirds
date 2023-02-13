<script>
	/**
	 * @type {any[]}
	 */
	export let records;
	import { Line } from 'svelte-chartjs';

	let noData = false;

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	import { onMount } from 'svelte';

	let data = {};
	let loading = true;
	onMount(() => {
		const labels = ['Before 2 Years Ago', '1 Year Ago', 'This Year'];
		/**
		 * @type {{ label: any; data: never[]; backgroundColor: string; borderColor: string; }[]}
		 */
		let datasets = [];

		function random_rgb() {
			const r = Math.floor(Math.random() * 255);
			const g = Math.floor(Math.random() * 255);
			const b = Math.floor(Math.random() * 255);
			return [r, g, b];
		}

		records.forEach((record) => {
			const speciesName = record.name;
			let outData = [];
			const color = random_rgb();
			let out = {
				label: speciesName,
				data: [],
				backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.4)`,
				borderColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`
			};

			let twoYearsAgoData = 0;
			let oneYearAgoData = 0;
			let thisYearData = 0;

			for (let i = 0; i < record.date.length; i++) {
				const date = new Date(record.date[i]);
				const year = date.getFullYear();
				const month = date.getMonth();
				const day = date.getDate();
				const today = new Date();
				const todayYear = today.getFullYear();
				const todayMonth = today.getMonth();
				const todayDay = today.getDate();
				const twoYearsAgo = new Date(todayYear - 2, todayMonth, todayDay);
				const oneYearAgo = new Date(todayYear - 1, todayMonth, todayDay);

				if (date >= oneYearAgo && date <= today) {
					thisYearData++;
				} else if (date >= twoYearsAgo && date < oneYearAgo) {
					oneYearAgoData++;
				} else if (date < twoYearsAgo) {
					twoYearsAgoData++;
				}
			}
			outData = [twoYearsAgoData, oneYearAgoData, thisYearData];

			out.data = outData;

			datasets.push(out);
		});

		if (datasets.length === 0) noData = true;

		data = {
			labels: labels,
			datasets: datasets
		};

		loading = false;
	});

	const config = {
		type: 'line',
		data: data,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top'
				}
			}
		}
	};
</script>

{#if noData}
	<div class="mt-6 max-w-xs sm:max-w-sm md:max-w-md mx-auto alert alert-info shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-current flex-shrink-0 w-6 h-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>No Avaliable Data</span>
		</div>
	</div>
{:else if loading}
	<h1>Loading...</h1>
{:else}
	<div class="mt-12">
		<Line {data} options={config} />
	</div>
{/if}
