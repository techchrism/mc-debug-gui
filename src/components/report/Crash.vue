<template>
    <div class="crash">
        {{crashText}}
    </div>
</template>

<script>
    export default {
        name: 'Crash',
        computed: {
            crashText()
            {
                return this.$store.state.examplecrash;
            }
        }
    };
</script>

<style scoped>
    .crash
    {
        margin-left: 25px;
        margin-right: 25px;
        white-space: pre-wrap;
    }
</style>
