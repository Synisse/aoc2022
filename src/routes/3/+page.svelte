<script>
	import {calculateMagic} from './day3logic';

	const results = calculateMagic();
</script>

<svelte:head>
	<title>Day 3</title>
	<meta name="description" content="Day 3" />
</svelte:head>

<div class="day-wrapper">
	Solution day 3/1: {results.chunkValues}
	Solution day 3/2: {results.commonItemValues}
</div>
