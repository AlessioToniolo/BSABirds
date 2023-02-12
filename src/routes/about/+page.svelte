<script>
	import { marked } from 'marked';
	import { md } from '../../components/about';
</script>

<div class="flex flex-wrap justify-center p-12 sm:px-4">
	<article class="prose">
		{@html marked.parse(md)}
	</article>
</div>
