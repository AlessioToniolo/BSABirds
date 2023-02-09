<script>
	export let records;
	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	const config = {
		type: 'bar',
		data: {
			labels: records.map((record) => record.name),
			datasets: [
				{
					label: 'Number of Records',
					data: records.map((record) => record.count),
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgba(255, 99, 132, 1)',
					borderWidth: 1
				}
			]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};
</script>

<Bar {config} options={{ responsive: true }} />
