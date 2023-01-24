import adapter from '@sveltejs/adapter-node';
import preprocessor from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocessor(),

	onwarn: (warning, handler) => {
		// disable a11y onclick warning
		if (warning.code.startsWith('a11y-click-events-have-key-events')) return;
		handler(warning);
	},

	kit: {
		adapter: adapter({ out: 'bufe-app' })
	},

	preprocess: vitePreprocess()
};

export default config;
