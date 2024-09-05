<script>
    const { task = $bindable({}), onchange, onremove } = $props()
</script>

<input type="checkbox" bind:checked={task.done} {onchange} />
<input type="text" bind:value={task.text} {onchange} />
<button onclick={onremove}>❌</button>