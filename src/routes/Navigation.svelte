<script>
	import {page} from '$app/stores';

    import {range} from 'lodash';

    const days = range(1, 25);
</script>

<ul>
    <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
        <a href="/">Home</a>
    </li>

    {#each days as day}
        <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
            <a href={`/${day}`}>{day}</a>
        </li>
    {/each}
</ul>

<style lang="scss">
    ul {
        display: flex;

        li {
            flex: 1;
        }
    }
</style>