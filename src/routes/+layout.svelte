<script>
   import PageTransition from '$lib/components/PageTransition.svelte';
   import { page } from '$app/stores';
	import { onMount } from 'svelte';
  	import { pwaInfo } from 'virtual:pwa-info';
   import "../app.css";

	const noKeyURLs = ['/admin','/rendelesek']

	onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register')
      registerSW({
        immediate: true,
        onRegistered(r) {
          // uncomment following code if you want check for updates
          // r && setInterval(() => {
          //    console.log('Checking for sw update')
          //    r.update()
          // }, 20000 /* 20s for testing purposes */)
          console.log(`SW Registered: ${r}`)
        },
        onRegisterError(error) {
          console.log('SW registration error', error)
        }
      })
    }
  })
  
  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

{#if !noKeyURLs.includes($page.url.pathname)}
   <PageTransition url={$page.url}>
      <slot />
   </PageTransition>
{:else}
   <slot />
{/if}

<svelte:head>
    {@html webManifest}
</svelte:head>

<!--<style lang="scss">
   :global(*) {
      margin: 0;
      padding: 0;
      list-style: none;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
      font-family:  Noto Serif Telugu;
      font-size: 1.78ch;
      --main-color: #252525;
      --accent-color: #cf6100;
   }

	:global(body) {
		background-color: black;
      scrollbar-width: none;

      &::-webkit-scrollbar {
         width: 0;
         display: none;
      }
	}

   @font-face {
      font-family: Noto Serif Telugu;
      src: url(/NotoSerifTelugu-VariableFont_wght.ttf);
   }
</style>-->