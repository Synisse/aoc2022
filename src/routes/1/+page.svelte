<script>
	import {calculateMagic} from './day1logic';

	const results = calculateMagic();
</script>

<svelte:head>
	<title>Day 1</title>
	<meta name="description" content="Day 1" />
</svelte:head>

<div class="day-wrapper">
	Solution day 1/1: {results.maxCalories}
	Solution day 1/2: {results.topThree}
</div>
