<script lang="ts">
	import type { entities } from 'misskey-js';
	import { cli } from '$lib/os';
	import { onMount } from 'svelte';
	import Note from '$lib/Note.svelte';

	const BATCH_SIZE = 10;

	let posts: entities.Note[] = [];
	let isFetching = false;

	async function expand(constraints: { sinceId?: entities.ID; untilId?: entities.ID }) {
		isFetching = true;
		const newPosts: entities.Note[] = await cli.request('notes/timeline', {
			limit: BATCH_SIZE,
			...constraints
		});
		if (constraints.untilId !== undefined) {
			posts = posts.concat(newPosts);
		} else {
			posts = newPosts.concat(posts);
		}
		isFetching = false;
	}

	async function expandFuture() {
		expand({ sinceId: posts[0]?.id });
	}

	async function expandPast() {
		expand({ untilId: posts[posts.length - 1]?.id });
	}

	onMount(() => expand({}));
</script>

{#if posts.length < 1}
	Loading…
{:else}
	<button disabled={isFetching} on:click={expandFuture}>Load more</button>
	{#each posts as post}
		<Note note={post} />
	{/each}
	<button disabled={isFetching} on:click={expandPast}>Load more</button>
{/if}
