<script setup>
import { useGameStore, Risk, Measure } from '../stores/game';
import { reactive } from "vue"


const game = useGameStore()

/** @type {Risk[]} */
const risks = [];
/** @type {Measure[]} */
const measures = [];
/** @type {Measure[]} */
const selectedMeasures = [];

const state = reactive({
    risks: risks,
    measures: measures,
    selectedMeasures: selectedMeasures
})

game.fetchRisks().then((o) => {
    state.risks = o;
})

game.fetchMeasures().then((o) => {
    state.measures = o;
})

function submit() {

}

/*
  Rules I want for my game UI:
  Checkboxes for measures / selection
  Dynamic check of remaining budget, coloring measure background that are not available (or disabling them)
  Once submitted, coloring Risks ?
 */

</script>

<template>

    Hello from game
    <p>Budget: {{game.budget}}K€</p>
    <button @click.prevent="submit" type="submit">Submit selected measures</button>

    <div class="column-container">
        <div class="column">
            Available Measures Column
            <div v-for="measure in state.measures" :key="measure.identifier" class="measure-entry entry">
                <p>identifier: {{measure.identifier}}</p>
                <p>name: {{measure.name}}</p>
                <p>cost: {{measure.cost}}</p>
            </div>
        </div>

        <div class="column">
            Risk Column
            <div v-for="risk in state.risks" :key="risk.identifier" class="risk-entry entry">
                <p>identifier: {{risk.identifier}}</p>
                <p>name: {{risk.name}}</p>
                <p>severity: {{risk.severity}}</p>
            </div>
        </div>
    </div>


</template>

<style scoped>
.column-container {
    display: flex;
    flex-direction: row;
}

.column {
    display: flex;
    flex-direction: column;
    padding: 0.5em;
}
.entry {
    padding-left: 0.2em;
    padding-top: 0.3em;
}
</style>