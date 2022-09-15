<script setup>
import { useGameStore, Risk, Measure, GameResult } from '../stores/game';
import { useAuthStore } from '../stores/userAuth';
import { reactive } from "vue"
import RiskComponent from '../components/RiskComponent.vue';
import MeasureComponent from '../components/MeasureComponent.vue';
import { computed } from '@vue/reactivity';


const game = useGameStore()

/** @type {Risk[]} */
const risks = [];
/** @type {Measure[]} */
const measures = [];
/** @type {Measure[]} */
const selectedMeasures = [];
/** @Type {GameResult} */
const starterGameResult = {
    score: 0,
    risks: [{
        identifier: '',
        coverage: 0,
        severity: 0
    }]
}


const state = reactive({
    risks: risks,
    measures: measures,
    selectedMeasures: selectedMeasures,
    lastGameResult: starterGameResult,
})

const currentCart = computed(() => {
    return state.selectedMeasures.reduce((prev, curr, index) => { return prev + curr.cost }, 0)
})

const currentBudget = computed(() => { return game.budget - currentCart.value })

game.fetchRisks().then((o) => {
    state.risks = o;
})

game.fetchMeasures().then((o) => {
    state.measures = o;
})

function submit() {
    const selectedMeasuresIdentifiers = state.selectedMeasures.map((m) => m.identifier);
    const auth = useAuthStore()
    if (!auth.authToken) {
        throw new Error("user not authenticated")
    }

    fetch(
        "https://tt.augmentedciso.com/play",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Bearer ${auth.authToken}`
            },
            body: JSON.stringify({
                measures: selectedMeasuresIdentifiers
            })
        }
    ).then(async (response) => {
        /** @type {GameResult} */
        const body = await response.json();
        console.log(body)
        state.lastGameResult = body;
    })
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

    <p>Budget: {{currentBudget}}/{{game.budget}}K€</p>
    <p>Selected measures: {{state.selectedMeasures.length}}/{{game.maxMeasures}}</p>
    <button style="max-width: fit-content;" @click.prevent="submit" type="submit">Submit selected measures</button>
    <span>Score: {{state.lastGameResult.score}}</span>

    <div class="column-container">
        <div class="column">
            Available Measures Column
            <MeasureComponent
                              v-for="(measure, index) in state.measures"
                              :measure="measure"
                              :index="index"
                              :key="measure.identifier"
                              :currentBudget="currentBudget"
                              v-model:model-selected-measures="state.selectedMeasures"
                              class="entry">
            </MeasureComponent>
        </div>

        <div class="column">
            Risk Column
            <RiskComponent
                           v-for="(risk, index) in state.risks"
                           :risk="risk"
                           :index="index"
                           :key="risk.identifier"
                           :game-result="state.lastGameResult"
                           class="entry">
            </RiskComponent>
        </div>
    </div>


</template>

<style scoped>
.column-container {
    display: flex;
    flex-direction: row;
}

.column {
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    height: 600px;
    min-height: 300px;
    resize: vertical;
}
</style>