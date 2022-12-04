<script>
	import {calculateMagic} from './day4logic';

	const results = calculateMagic();
</script>

<svelte:head>
	<title>Day 4</title>
	<meta name="description" content="Day 4" />
</svelte:head>

<div class="day-wrapper">
	Solution day 4/1: {results.fullIntersections}
	Solution day 4/2: {results.generalIntersections}
</div>
