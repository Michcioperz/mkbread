<script lang="ts">
	import { parse } from 'mfm-js';
	import MFMNode from './MFMNode.svelte';

	export let content: string;
	export let emojos: { name: string; url: string }[];

	$: parsed = parse(content);
</script>

<span class="content">
	{#each parsed as node}
		<MFMNode {node} {emojos} />
	{/each}
</span>

<style lang="scss">
	.content {
		white-space: pre-wrap;
	}
</style>
