<script>
   import { fly, slide } from 'svelte/transition';
   import { Swiper, SwiperSlide } from 'swiper/svelte';
   import 'swiper/css';
   import { browser } from '$app/environment';
   import { cart, total } from '$lib/stores/Cart.js';
   import { navigation } from '$lib/stores/Navigation.js';
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;

	console.log(data.termekek);

	let swiper;
   let cartshow = 0;

   if (browser) {
      if (localStorage.getItem('CartContent') != null) {
         cartshow = 1;
         $cart = JSON.parse(localStorage.getItem('CartContent'));
			$total = JSON.parse(localStorage.getItem('Total'));
      };
   };

	function navigate(i) {
		swiper.slideTo(i);
		$navigation = i
	}

	// Search Bar
	const originalData = structuredClone(data);
	let searchWord;

	function search() {
		data.termekek = originalData.termekek.filter(termek => termek.termek.toLowerCase().includes(searchWord.toLowerCase()))

		// Navigáljon arra a kategoriara amiben az a termek talalhato ahol a keresett szo a legtobbet elofordul.
		if (searchWord.length > 0) { // ha nincs itt ez az if, akkor mindig visszaugrik az Etel kategoriara, mivel ott fordul elo a legtobbet empty string.
			let kategoria = {
				'Étel': 0,
				'Ital': 0,
				'Nasi': 0
			}

			data.termekek.forEach(termek => {
				kategoria[termek.kategoria] += termek.termek.toLowerCase().split(searchWord.toLowerCase()).length - 1
			});

			switch (Object.values(kategoria).sort().reverse()[0]) {
				case kategoria.Étel:
					navigate(0)
					break;
				case kategoria.Ital:
					navigate(1)
					break;
				case kategoria.Nasi:
					navigate(2)
			}
		}
		
	}
</script>

<main class="font-sofia">

   <Topbar
      target={'Menü'}
      targeturl={'/'}
      text={'Termékek'}
      background={'#4BB1DE'}
      flyin={{y: -200}}
      hideProfile={0}
   ></Topbar>

	<div class="flex justify-center">
		<div class="flex items-center">
			<input class="bg-gray-1 rounded-md my-2 mr-2 p-1"  placeholder=" Keresés" type="text" bind:value={searchWord} on:input={search}>
			<button on:click={() => {searchWord = ''; search()}}><i class="fa-solid fa-xmark fa-2x text-red-1"></i></button>
		</div>
	</div>

	<Swiper
	initialSlide={$navigation}
	resistanceRatio={0.5}
	speed={370}
	spaceBetween={20}
	slidesPerView={1}
	on:slideChange={e => {$navigation = e.detail[0].activeIndex}}
	on:swiper={e => {swiper = e.detail[0]}}
 	>
		<SwiperSlide>
			<div in:slide={{duration: 800}} class='flex flex-col items-center'>
				{#each data.termekek as termek}
					{#if termek.kategoria == 'Étel'}
						<div class="flex flex-row items-center w-80 flex-wrap justify-between bg-blue-1 px-2 py-2 rounded-md my-2 text-white" class:opacity-30={termek.darab == 0}>
							
							<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'><img src="/api/termekKepek/?termek={termek.id}" alt=""></a>
							<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.termek}</a>
							<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.ar} Ft</a>
						</div>
					{/if}
				{/each}
			</div>
		</SwiperSlide>

		<SwiperSlide>
			<div in:slide={{duration: 800}} class='flex flex-col items-center'>
				{#each data.termekek as termek}
					{#if termek.kategoria == 'Ital'}
						<div class="flex flex-row items-center w-80 flex-wrap justify-between bg-blue-1 px-2 py-2 rounded-md my-2 text-white" class:elfogyott={termek.darab == 0}>
							<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.kep}</a>
							<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.termek}</a>
							<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.ar} Ft</a>
						</div>
					{/if}
				{/each}
			</div>
		</SwiperSlide>

		<SwiperSlide>
			<div in:slide={{duration: 800}} class='flex flex-col items-center'>
				{#each data.termekek as termek}
					{#if termek.kategoria == 'Nasi'}
						<div class="flex flex-row items-center w-80 flex-wrap justify-between bg-blue-1 px-2 py-2 rounded-md my-2 text-white" class:elfogyott={termek.darab == 0}>
							<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.kep}</a>
							<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.termek}</a>
							<a data-sveltekit-noscroll href="{termek.termek}?referrer=/list" class='grid-cell'>{termek.ar} Ft</a>
						</div>
					{/if}
				{/each}
			</div>
		</SwiperSlide>
 	</Swiper>

 {#if cartshow}
 <div in:fly={{y: 100}} style='margin-bottom: 6.5vh;' class='nav'>
	 <div class='Étel' on:click={() => {navigate(0)}}><p class:active='{$navigation == 0}'>Étel</p></div>
	 <div class='Ital' on:click={() => {navigate(1)}}><p class:active='{$navigation == 1}'>Ital</p></div>
	 <div class='Nasi' on:click={() => {navigate(2)}}><p class:active='{$navigation == 2}'>Nasi</p></div>
 </div>
 
 <a data-sveltekit-noscroll href="kosar?referrer=/list">
	 <div in:fly={{y: 100, delay: 100}} class='cart'>
		 <div class="cart-grid">
			 <div class="cart-cell">
				 <img src="shopping-basket.png" alt=""> <b>{$total.ar} Ft</b><p>({$total.darab} db termék a kosárban.)</p>
			 </div>
		 </div>
	 </div>
 </a>
 
 {:else}
 <div in:fly={{y: 200}} class='nav'>
	 <div class='Étel' on:click={() => {navigate(0)}}><p class:active='{$navigation == 0}'>Étel</p></div>
	 <div class='Ital' on:click={() => {navigate(1)}}><p class:active='{$navigation == 1}'>Ital</p></div>
	 <div class='Nasi' on:click={() => {navigate(2)}}><p class:active='{$navigation == 2}'>Nasi</p></div>
 </div>
 {/if}

</main>