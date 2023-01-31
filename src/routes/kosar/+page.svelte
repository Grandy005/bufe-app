<script>
   import { slide, fade } from "svelte/transition";
	import { page } from '$app/stores';
   import { goto } from "$app/navigation"
   import { deserialize } from '$app/forms';
   import { cart, total } from "$lib/stores/Cart.js";
   import Topbar from '$lib/components/Topbar.svelte';

   export let data;

   if (localStorage.getItem('CartContent') != null) {
      $cart = JSON.parse(localStorage.getItem('CartContent'));
      $total = JSON.parse(localStorage.getItem('Total'));
   }

   function recalculate() {
      $total = { 'ar': 0, 'darab': 0 };
		Object.keys($cart).forEach(termek => {
			$total.ar += $cart[termek].ar
			$total.darab += $cart[termek].darab
         localStorage.setItem('CartContent', JSON.stringify($cart));
			localStorage.setItem('Total', JSON.stringify($total))
		});
   };

   function urites() {
      localStorage.clear();
      $cart = {};
      $total = { 'ar': 0, 'darab': 0, 'feltet': [] };
   };

   function subtractAmount(termek) {
      if ($cart[termek].darab > 1) {
         let price = $cart[termek].ar / $cart[termek].darab;

         $cart[termek].ar -= price;
         $cart[termek].darab--;
         recalculate();
      } else {
         delete $cart[termek];
         $cart = $cart; // Muszaj reactivity miatt
         recalculate();
         if (Object.keys($cart).length === 0) {
            localStorage.removeItem('CartContent');
            history.back()
         }
      }
   };

   function addAmount(termek) {
      // * Elegge gusztustalan megoldas vegig loopolni es megtalalni a darabszamat a termeknek
      let darab;
      data.termekek.forEach(record => {
         if (record.termek == termek) darab = record.darab
      });

      if ($cart[termek].darab < darab) {
         let price = $cart[termek].ar / $cart[termek].darab;

         $cart[termek].ar += price;
         $cart[termek].darab++;
         recalculate();
      };
   };

   async function handleSubmit(event) {
      const data = new FormData(this);
      const response = await fetch(this.action, {
         method: 'POST',
         body: data
      })

      const result = deserialize(await response.text());

      if (result.type == 'success') {
         urites();
         goto('/rendelesek')
      } else {
			alert(result.data.error);
			delete $cart[result.data.sok];
			$cart = $cart; // kell reactivity miatt
			recalculate();
		}
   }
</script>

<main in:fade={{duration: 180}}>

   <Topbar
   target={'Vissza'}
   targeturl={$page.url.searchParams.get('referrer')}
   text={'Kosár'}
   hideProfile={0}
   hideCart={0}
   flyin={0}
   ></Topbar>

   <div class="urites">
      <button on:click={() => {urites(); goto('/')}}>Űrités</button>
   </div>

	{#key $total}
   <h1 in:fade="{{duration: 200}}" style="color: white; margin-bottom: 5%;">{$total.darab} db termék, összesen: {$total.ar} Ft</h1>
   {/key}
   
	{#each Object.keys($cart) as termek, i (i)}
		{#key termek.ar}
			<h2 class="title">{termek}: <span in:fade="{{duration: 200}}">{$cart[termek].ar}</span> Ft</h2>
		{/key}

		<div class="grid-container">
			<div class="grid-cell">
				<img src="favicon.png" alt="">
			</div>
			<div class="grid-cell">
				<div class="picker-container">
					<div class="inner-grid">
						<div class="button-cell">
							{#if $cart[termek].darab > 1}
								<button on:click="{() => {subtractAmount(termek)}}"><span in:fade="{{duration: 200}}">➖</span></button>
							{:else} 
								<button on:click="{() => {subtractAmount(termek)}}"><span in:fade="{{duration: 200}}">❌</span></button>
							{/if}
						</div>
							{#key $cart[termek].ar}<div in:fade="{{duration: 200}}" class="amount-cell">{$cart[termek].darab}</div>{/key}
						<div class="button-cell">
							<button on:click="{() => {addAmount(termek)}}">➕</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/each}

	{#if Object.keys($cart).length != 0}
		<form method="POST" on:submit|preventDefault={handleSubmit}>
			<input hidden type="text" name="rendeles" value="{JSON.stringify($cart)}">
			<button class="bottom-button">Vásárlás!</button>
		</form>
	{/if}


</main>

<style lang="scss">

   main {
      width: 100vw;
      height: 100vh;

      h1 {
         text-align: center;
         margin-top: 5%;
      }

		.title {
			color: white;
			text-align: center;
		}

		.grid-container {
			display: grid;
			grid-template-columns: 1fr 2fr;
			background-color: var(--main-color);
			border-radius: 1em;
			margin: 0 3%;
			margin-bottom: 5%;
			margin-top: 1%;

			&:last-of-type {
				margin-bottom: 30%;
			}

			.grid-cell {
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					height: 90px;
				}
			}
		}

      .urites {
         width: 100vw;

         button {
            display: block;
            border-radius: 50em;
            padding: 2em;
            color: white;
            background-color: #222222;
            margin: 0 auto;
            font-weight: bolder;
            margin-top: 5%;
         }
      }

      .bottom-button {
         position: fixed;
         bottom: 0;
         left: 0;
         height: 3.5em;
         background-color: var(--accent-color);
         border-top-left-radius: 2.8em;
         border-top-right-radius: 2.8em;
         width: calc(98% - 2%); // * NAAAAGYON HACKY, de nem megy mashogy. Utálom a css-t
         margin-left: 2%;
         padding: .5ch 0;
         border: none;
      }

		.picker-container {
			width: 100%;
			display: grid;
			justify-items: center;

			.inner-grid {
				width: 85%;
				display: grid;
				grid-template-columns: auto 10% auto;
				align-items: center;
				justify-items: center;
				background-color: rgb(20, 20, 20);
				color: white;
				border-radius: 2em;

				button {
					border: 0;
					margin: 20% 0;
					padding: 1em;
					border-radius: 2em;
				}

				.amount-cell {
					font-size: xx-large;
				}
			}
		}
   }
</style>
