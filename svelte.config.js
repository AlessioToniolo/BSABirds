import preprocess from 'svelte-preprocess';
import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	],

	// TODO: remove this block if you want warning messages
	onwarn: (warning, handler) => {
		if (warning.code.startsWith('a11y-')) {
		  return;
		}
		handler(warning);
	  },
};

export default config;
