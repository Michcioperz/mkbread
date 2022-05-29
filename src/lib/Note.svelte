<script lang="ts">
	import type { entities } from 'misskey-js';
	import { cli, localUrl } from '$lib/os';
	import Note from './Note.svelte';
	import { Lightbox } from 'svelte-lightbox';
	import MfmContent from './MFMContent.svelte';
	//import Time from 'svelte-time';
	export let note: entities.Note;
	export let condensed: boolean = false;
	let translation: { sourceLang: string; text: string } | undefined = undefined;

	const VISIBILITY: Record<entities.Note['visibility'], string> = {
		public: '📢',
		home: '🏠',
		followers: '🔒',
		specified: '🧑'
	};

	async function translate() {
		translation = await cli.request('notes/translate', { noteId: note.id, targetLang: 'en-US' });
	}
</script>

<article class="note" class:condensed>
	<header class="meta">
		<img class="pfp" src={note.user.avatarUrl} />
		<MfmContent content={note.user.name} emojos={note.user.emojis} /> (@{note.user.username}@{note
			.user.host})
		<span style:float="right">
			{VISIBILITY[note.visibility]}
			<a href={note.uri}>📩</a>
			{#if translation === undefined}
				<button on:click={translate}>🏳️‍⚧️</button>
			{/if}
			<a href={localUrl + '/notes/' + note.id}>
				{note.createdAt}
			</a>
		</span>
	</header>
	<details open={note.cw === null}>
		<summary>
			{#if note.cw !== null}
				<MfmContent content={note.cw} emojos={note.emojis} />
			{/if}
		</summary>
		{#if note.reply !== undefined}
			<small>
				<Note note={note.reply} condensed />
			</small>
		{/if}
		{#if note.text !== null}
			<MfmContent content={note.text} emojos={note.emojis} />
		{/if}
		{#if translation !== undefined}
			<blockquote class="translation">
				<strong>Translated from {translation.sourceLang}</strong>: {translation.text}
			</blockquote>
		{/if}
		{#if note.renote}
			<small>
				<Note note={note.renote} condensed />
			</small>
		{/if}
		<aside class="attachments">
			{#each note.files as file (file.id)}
				<Lightbox imagePreset="fullscreen" thumbnail transitionDuration={50}>
					<img
						slot="thumbnail"
						class="attachment"
						src={file.thumbnailUrl}
						alt={file.comment || file.name}
					/>
					<img slot="image" src={file.url} alt={file.comment || file.name} />
				</Lightbox>
			{/each}
		</aside>
		{#each Object.entries(note.reactions) as [emojo, count]}
			{#if emojo.startsWith(':')}
				{#each note.emojis as emoji}
					{#if emojo === ':' + emoji.name + ':'}
						<img class="emojo" title={emoji.name} alt={emoji.name} src={emoji.url} />
					{/if}
				{/each}
			{:else}
				{emojo}
			{/if}
			{count}
		{/each}
	</details>
</article>

<style lang="scss">
	.note {
		border: 0.2em dashed darksalmon;
		padding: 1em;
	}
	.pfp {
		height: 4em;
	}
	.content,
	.translation {
		white-space: pre-wrap;
	}
	.translation {
		border-width: 0.1em;
		border-style: solid;
		border-image: linear-gradient(to right, turquoise, pink, white, pink, turquoise) 1;
	}
	.attachment {
		max-width: 100%;
		max-height: 50vh;
	}
	.condensed {
		.pfp {
			height: 2em;
		}
		.attachment {
			max-width: 50%;
			max-height: 25vh;
		}
	}
	.attachments {
		display: flex;
	}
</style>
