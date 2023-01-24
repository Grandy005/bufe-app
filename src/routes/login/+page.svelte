<script>
import { fade } from "svelte/transition";

export let form;

let email = form?.email
let error = form?.error
let password
</script>

<main in:fade={{duration: 180}}>
   <div class="login flex flex-col items-center mt-24">
      <h1 class="font-extrablack text-5xl text-blue-1">Kandó Büfé</h1>
      <h2 class="text-blue-1 text-2xl font-bold mt-12 mb-6">Bejelentkezés</h2>

      <form method="post" class="flex flex-col items-center">
         <div class="flex flex-row mb-6">
            <input placeholder="Kandós e-mail" name='email' bind:value={email} id="email-form" type="text" class="border-gray bg-gray-1 p-2 rounded-md" />
         </div>
         <div class="flex flex-row mb-6">
            <label for="password-form"></label><br />
            <input placeholder="Jelszó" name='password' bind:value={password} id="password-form" type="password" class="border-gray bg-gray-1 p-2 rounded-md" />
         </div>
         <div class="flex flex-col justify-center">
            {#if email && password}
               <button in:fade={{duration: 300}} class="bg-blue-1 text-white text-lg px-8 py-2 rounded-md font-semibold">Belépés</button>
            {/if}
         </div>
         {#if error && !email || !password && error != undefined}
            <p id="error" class="text-red-1 text-lg font-semibold">{error}</p>
         {/if}
      </form>

		<div class="regin-button flex flex-col items-center">
			<h2 class="mt-3 mb-1">Nincs még fiókod?</h2>
         <a href="/register"><button class="bg-gray-1 text-blue-1 text-lg px-8 py-2 rounded-md font-semibold">Regisztráció</button></a>
		</div>

   </div>
   
</main>