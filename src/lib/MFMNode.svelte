<script lang="ts">
	import type { MfmNode } from 'mfm-js';
	import MFMNode from './MFMNode.svelte';
	import { localUrl } from './os';

	export let node: MfmNode;
	export let emojos: { name: string; url: string }[];
</script>

{#if node.type === 'quote'}
	<blockquote>
		{#each node.children as child}
			<MFMNode {emojos} node={child} />
		{/each}
	</blockquote>
{:else if node.type === 'search'}
	{node.props.query} search
{:else if node.type === 'blockCode'}
	<pre>{node.props.code}</pre>
{:else if node.type === 'mathBlock'}
	{node.props.formula}
{:else if node.type === 'center'}
	<center>
		{#each node.children as child}
			<MFMNode {emojos} node={child} />
		{/each}
	</center>
{:else if node.type === 'unicodeEmoji'}
	{node.props.emoji}
{:else if node.type === 'emojiCode'}
	{#each emojos as emojo}
		{#if emojo.name === node.props.name}
			<img class="emojo" title={node.props.name} alt={node.props.name} src={emojo.url} />
		{/if}
	{/each}
{:else if node.type === 'bold'}
	<b>
		{#each node.children as child}
			<MFMNode {emojos} node={child} />
		{/each}
	</b>
{:else if node.type === 'small'}
	<small>
		{#each node.children as child}
			<MFMNode {emojos} node={child} />
		{/each}
	</small>
{:else if node.type === 'italic'}
	<i>
		{#each node.children as child}
			<MFMNode {emojos} node={child} />
		{/each}
	</i>
{:else if node.type === 'strike'}
	<del>
		{#each node.children as child}
			<MFMNode {emojos} node={child} />
		{/each}
	</del>
{:else if node.type === 'inlineCode'}
	{node.props.code}
{:else if node.type === 'mathInline'}
	{node.props.formula}
{:else if node.type === 'mention'}
	<a href={localUrl + '@' + node.props.username + (node.props.host ? '@' + node.props.host : '')}>
		@{node.props.username}{#if node.props.host}@{node.props.host}{/if}
	</a>
{:else if node.type === 'hashtag'}
	#{node.props.hashtag}
{:else if node.type === 'url'}
	{#if node.props.brackets}{'<'}{/if}
	<a href={node.props.url}>{node.props.url}</a>
	{#if node.props.brackets}{'>'}{/if}
{:else if node.type === 'link'}
	<a href={node.props.url}>
		{#each node.children as child}
			<MFMNode {emojos} node={child} />
		{/each}
	</a>
{:else if node.type === 'fn'}
	{JSON.stringify(node.props)}
{:else if node.type === 'text'}
	{node.props.text}
{:else}
	{JSON.stringify(node)}
{/if}

<style lang="scss">
	.emojo {
		max-width: 2em;
		max-height: 2em;
	}
</style>
