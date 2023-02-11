<script>
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
</script>

<div class="container max-w-screen-lg flex-col flex h-screen justify-between">
	<Navbar />
	<div><slot /></div>
	<Footer />
</div>
