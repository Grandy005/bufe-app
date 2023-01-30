<script>
   import { fade } from 'svelte/transition';

   export let data;
</script>

<main in:fade={{duration: 200}} class="font-sofia">
	<div class="mt-20 flex flex-col items-center">
		<h1 class="text-blue-1 font-extrabold text-5xl text-center">Jónapot {data.name}!</h1>
		<a href="/list" class="bg-blue-1 text-white text-lg py-4 rounded-md font-semibold mt-12 w-60">
			<p class="text-center">Termékek</p>
		</a>
		<a href="/profil" class="bg-blue-1 text-white text-lg py-4 rounded-md font-semibold mt-6 w-60">
			<p class="text-center">Profil</p>
		</a>
		<a href="/rendelesek" class="bg-blue-1 text-white text-lg py-4 rounded-md font-semibold mt-6 w-60">
			<p class="text-center">Rendelések</p>
		</a>
		<a href="/kosar?referrer=/" class="text-blue-1 bg-gray-1 text-lg py-4 rounded-md font-semibold mt-6 w-60">
			<p class="text-center">Kosár</p>
		</a>
		<!--<a href="/{data.randomTermek}?referrer=/" class="bg-blue-1 text-white text-lg py-4 rounded-md font-semibold mt-6 w-60">
			<p class="text-center">Random</p>
		</a>-->
		<h2 class="bottom-0 absolute mb-2">{data.splash}</h2>
	</div>
</main>