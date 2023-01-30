<script>
   import { fade } from "svelte/transition";

   export let form;

   let name = form?.name;
   let email = form?.email.replace('@kkszki.hu', '')
   let error = form?.error;
   let password;
   let passwordConfirm;
</script>

<main in:fade={{duration: 180}} class="font-sofia">
   <div class="login flex flex-col items-center mt-24">
      <h1 class="text-blue-1 text-5xl font-extrabold">Kandó Büfé</h1>
      <h2 class="text-blue-1 text-2xl font-bold mt-12 mb-6">Regisztráció</h2>
      <form method="post" class="flex flex-col items-center">
         <input placeholder="Teljes név" name='name' bind:value={name} id="name-form" type="name" class="border-gray bg-gray-1 p-2 rounded-md mb-6"/>
         <input placeholder="Kandós e-mail" name='email' bind:value={email} id="email-form" type="text" class="border-gray bg-gray-1 p-2 rounded-md mb-6"/>
         <input placeholder="Jelszó" name='password' bind:value={password} id="password-form" type="password" class="border-gray bg-gray-1 p-2 rounded-md mb-6"/>
         <input placeholder="Jelszó újra" name='passwordConfirm' bind:value={passwordConfirm} id="password-confirm-form" type="password" class="border-gray bg-gray-1 p-2 rounded-md"/>
         
         {#if name && email && password && passwordConfirm && password == passwordConfirm}
            <button in:fade={{duration: 400}} class="bg-blue-1 text-white text-lg px-8 py-2 mt-6 rounded-md font-semibold">Regisztrálás</button>          
         {/if}
         <br>
         {#if error && !password || error && !password && !email}
            <p id="error" class="text-red-1 text-lg text-center px-2 font-semibold">{form?.error}</p>
         {/if}
      </form>

		<div class="regin-button">
			<h2 class="text-center mt-3 mb-1">Van már fiókod?</h2>
         <a href="/login"><button class="text-blue-1 bg-gray-1 text-lg px-8 py-2 rounded-md font-semibold">Belépés</button></a>
		</div>

   </div>

</main>