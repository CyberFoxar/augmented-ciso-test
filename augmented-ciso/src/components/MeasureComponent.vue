<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { Measure, useGameStore } from '../stores/game';

const props = defineProps<{
    measure: Measure,
    index: number,
    key: String,
    modelSelectedMeasures: Measure[],
    currentBudget: number;
}>();
const emit = defineEmits(['update:modelSelectedMeasures']);

const game = useGameStore();

const selected = computed(() => {
    return props.modelSelectedMeasures.includes(props.measure);
});

// A measure is available to selection if:
// it does not exceed current budget
// AND
// we can actually add more measures
const available = computed(() => {
    return ((props.currentBudget - props.measure.cost) > 0) && !(props.modelSelectedMeasures.length >= game.maxMeasures);
});


function clicked() {
    // Copy current measures
    const currentMeasure = props.modelSelectedMeasures.slice();
    // Find if our measure is in the selected ones and remove/add it
    const index = currentMeasure.findIndex((m, i) => m.identifier == props.measure.identifier);
    if (index >= 0) {
        currentMeasure.splice(index, 1);
    } else if (available.value) {
        currentMeasure.push(props.measure);
    }
    emit('update:modelSelectedMeasures', currentMeasure);
}

</script>
    
<template>
    <div @click="clicked" class="container" :class="{selected: selected, available: available}">
        <p>identifier: {{measure.identifier}}</p>
        <p>name: {{measure.name}}</p>
        <p>cost: {{measure.cost}}</p>
        <span class="icon">✓</span>
    </div>
    <!-- ✗ -->
</template>
    
<style scoped>
.container {
    position: relative;
    border: 1px solid black;
    border-radius: 5px;
    margin: 0.1em;
    padding: 0.5em 1em;
    background-color: inherit;
    cursor: not-allowed;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.6);
    transition: box-shadow 0.25s;
}

.container.available {
    cursor: pointer;
    background-color: #2F5236;
}

.container.available:hover {
    box-shadow: 1px 1px 10px rgba(0,0,0,0.6);
    background-color: #35663f;
}

.container.selected {
    cursor: pointer;
    background-color: #43754d;
}

.container .icon {
    display: none;
    position: absolute;
    right: 1em;
    top: 0.5em;
}
.container.selected .icon {
    display: inline;
}
</style>