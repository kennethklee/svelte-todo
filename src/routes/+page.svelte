<script>
    import EditableTask from "./EditableTask.svelte"
    import { load, persist } from "../lib/localStorage"
    import { browser } from "$app/environment"
    import { flip } from "svelte/animate"

    // state
    let newTask = $state({})
    let tasks = $state([])
    if (browser) {
        tasks.push(...(load('tasks') ?? []))
    }

    // manipulations
    function save() {
        tasks.sort((a, b) => a.done - b.done)
        if (browser) {
            persist('tasks', tasks)
        }
    }
    function add() {
        tasks.push({...newTask})
        newTask = {}
        save()
    }
    function remove(index) {
        tasks.splice(index, 1)
        save()
    }

    // drag and drop
    /** @type {{item: any, index: number} | null}*/
    let dragState = null
    const drag = (item, index) => {
        dragState = { item, index }
    }
    const dropTo = targetIndex => {
        if (!dragState) return
        const { item, index } = dragState
        tasks.splice(index, 1)
        tasks.splice(targetIndex, 0, item)
        save()
        dragState = null
    }
</script>

<form onsubmit={add}>
    <input type="text" bind:value={newTask.text} />
    <button>Add</button>
</form>

<fieldset>
    <legend>To Do List</legend>
    <ul>
        {#each tasks as task, i (task)}
            <li
                animate:flip
                draggable="true"
                ondragstart={ev => drag(task, i)}
                ondrop={ev => dropTo(i)}
                ondragover={ev => ev.preventDefault()}
            >
                <EditableTask bind:task={tasks[i]} onchange={save} onremove={remove(i)} />
            </li>
        {/each}
    </ul>
</fieldset>

<style>
    li {
        user-select: none;
    }
</style>