<script>
   import { fly } from "svelte/transition";

   export let targeturl;
   export let target;
   export let text;
   export let flyin;
   export let hideProfile;
   export let hideCart;
</script>

<div in:fly={flyin} class=" font-sofia flex flex-row justify-between items-center w-screen h-20 bg-blue-1 text-white rounded-b-2xl">
   <a data-sveltekit-noscroll href="{targeturl}"><i class="fas fa-angle-left correct-align"></i> {target}</a>
   <h1 class="font-bold text-lg w-min text-center">{text}</h1>
   <div class="flex flex-row">
      <a data-sveltekit-noscroll class:hideCart id="" href='/kosar'><i class="fa-solid fa-basket-shopping fa-2xl more-correct-align mr-4"></i></a>
      <a data-sveltekit-noscroll class:hideProfile id="" href='/profil'><img class="w-12 h-12 mr-2 rounded-full" src="/api/avatar" alt="img"></a>
   </div>
</div>

<style>
   /*fontawesome szeretlek :)*/
   .correct-align {
      transform: translateY(1px);
   }
   .more-correct-align {
      transform: translateY(13px);
   }
   .hideProfile {
      display: none;
   }
   .hideCart {
      display: none;
   }
</style>