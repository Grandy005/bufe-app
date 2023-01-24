<script>
import { fade } from "svelte/transition";

export let form;

let email = form?.email
let error = form?.error
let password
</script>

<main in:fade={{duration: 180}} class="font-sofia">
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
			<h2 class="mt-3 mb-1">Nincs még fiókod?</h2> <a href="/register"><button class="bg-gray-1 text-blue-1 text-lg px-8 py-2 rounded-md font-semibold">Regisztráció</button></a>
		</div>

   </div>
   
</main>

<!-- <style lang="scss">

	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
	}

   .regin-button {
      width: 100vw;
      text-align: center;
      margin-top: 5vh;
      color: white;

      button {
         background-color: rgb(20, 20, 20);
         padding: 1ch;
         border-radius: 4vw;
         color: white;
         margin-top: 1ch;
      }
   }

   .login {
      text-align: center;
      color: white;

      img {
         display: block;
         margin: 0 auto;
         margin-bottom: 10%;
      }
   }

   form {
      input {
         border: 0.2vw solid white;
         border-radius: 4vw;
         width: 50%;
         color: white;
         background-color: rgb(20, 20, 20);
         padding-top: 1vh;
         padding-bottom: 1vh;
         padding-left: 3vw;
         margin-top: 1vh;
         margin-bottom: 3vw;
      }

      #email-form-label {
         margin-right: 10ch;
      }

      #email-form {
         width: calc(50% - 10ch);
      }

      p {
         // transform: translateX(-10vw);
         display: inline-block;
      }

      button {
         border-radius: 4vw;
         width: 80%;
         padding: 3vw;
         margin-top: 2vh;
         background-color: rgb(20, 20, 20);
         color: white;
      }

      #error {
         margin-top: 1vh;
         color: var(--accent-color);
      }
   }

</style> -->
