<template>
    <div>
        <world-seed class="m-3"/>
        <world-info class="m-3"/>
    </div>
</template>

<script>
    import WorldSeed from './WorldSeed';
    import WorldInfo from './WorldInfo';
    export default {
        name: 'WorldOverview',
        components: {WorldInfo, WorldSeed},
        computed: {
            level()
            {
                return this.$store.state.levels[this.$route.params.world];
            }
        }
    };
</script>

<style scoped>

</style>
