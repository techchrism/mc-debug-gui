<template>
    <div>
        <b-card class="text-center m-4">
            <strong>Pending Tasks</strong> - {{stats['pending_tasks']}}<br>
            <strong>Average Tick Time</strong> - {{stats['average_tick_time']}}<br>
            <strong>Queue</strong> - <br>
            {{stats['queue']}}
        </b-card>

        <tick-graph></tick-graph>
        <b-alert class="text-center tick-alert" show>
            Note: There should be 20 ticks per second so spending more than 50ms per tick is not ideal
        </b-alert>

    </div>
</template>

<script>
    import TickGraph from './TickGraph';
    export default {
        name: 'Ticks',
        components: {TickGraph},
        computed: {
            stats()
            {
                return this.$store.state.stats;
            }
        }
    };
</script>

<style scoped>
    .tick-alert
    {
        margin-left: 25px;
        margin-right: 25px;
    }
</style>
