<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { GameResult, Risk } from '../stores/game';

const props = defineProps<{
    risk: Risk,
    index: Number,
    key: String,
    gameResult: GameResult
}>();

const coverage = computed(() => {
    return props.gameResult.risks.find((r) => r.identifier == props.risk.identifier)?.coverage;
})
</script>

<template>
    <div class="container">
        <p>identifier: {{risk.identifier}}</p>
        <p>name: {{risk.name}}</p>
        <p>severity: {{risk.severity}}</p>
        <p>coverage: {{coverage}}%</p>
    </div>
</template>

<style scoped>
.container {
    position: relative;
    border: 1px solid black;
    border-radius: 5px;
    margin: 0.1em;
    padding: 0.5em 1em;
    background-color: inherit;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.6);
    transition: box-shadow 0.25s;
}
</style>