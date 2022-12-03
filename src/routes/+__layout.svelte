<script>
	import '../app.css';

	// Import font-awesome icons
	//import Fa from 'svelte-fa';
	//import { faDove } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="container max-w-screen-lg mx-auto">
	<div class="flex flex-col justify-between py-none lg:py-8 min-h-screen">
		<div class="navbar bg-neutral text-neutral-content lg:rounded-xl rounded-none">
			<div class="navbar-start">
				<div class="dropdown">
					<label tabindex="0" class="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/></svg
						>
					</label>
					<ul
						tabindex="0"
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
					>
						<li><a href="https://google.com">Item 1</a></li>
						<li tabindex="0">
							<a href="https://google.com" class="justify-between">
								Parent
								<svg
									class="fill-current"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<svg><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
									>
								</svg></a
							>
							<ul class="p-2">
								<li><a href="https://google.com">Submenu 1</a></li>
								<li><a href="https://google.com">Submenu 2</a></li>
							</ul>
						</li>
						<li><a href="https://google.com">Item 3</a></li>
					</ul>
				</div>
				<a href="https://google.com" class="btn btn-ghost normal-case text-xl">BSABirds</a>
				<!--<Fa icon={faDove} class="" />
					-->
			</div>
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal p-0">
					<li><a href="https://google.com">Item 1</a></li>
					<li tabindex="0">
						<a href="https://google.com">
							Parent
							<svg
								class="fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
							>
						</a>
						<ul class="p-2">
							<li><a>Submenu 1</a></li>
							<li><a>Submenu 2</a></li>
						</ul>
					</li>
					<li><a href="https://google.com">Item 3</a></li>
				</ul>
			</div>
			<div class="navbar-end">
				<a href="https://google.com" class="btn btn-primary">Get started</a>
			</div>
		</div>

		<div class="flex-grow"><slot /></div>

		<footer
			class="footer p-4 items-center bg-neutral text-neutral-content lg:rounded-xl rounded-none"
		>
			<div class="items-center grid-flow-col">
				<p class="text-lg">
					An Eagle Scout Project by <a
						class="underline hover:text-primary"
						href="https://github.com/AlessioToniolo">Alessio Toniolo</a
					>
				</p>
			</div>

			<!--
					<div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
						<!--<a
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								class="fill-current"
								><path
									d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
								/></svg
							>
						</a>
						<a
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								class="fill-current"
								><path
									d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
								/></svg
							></a
						>
						<a
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								class="fill-current"
								><path
									d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
								/></svg
							></a
						>
					</div>
				-->
		</footer>
	</div>
</div>
