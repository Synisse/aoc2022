<script>
	import {calculateMagic} from './day2logic';

	const results = calculateMagic();
</script>

<svelte:head>
	<title>Day 2</title>
	<meta name="description" content="Day 2" />
</svelte:head>

<div class="day-wrapper">
	Solution day 2/1: {results.sumOfScores}
	Solution day 2/2: {results.sumOfExtendedScores}
</div>
