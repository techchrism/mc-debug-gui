<template>
    <div class="crash">
        {{crashText}}
    </div>
</template>

<script>
    export default {
        name: 'WorldExampleCrash',
        computed: {
            level()
            {
                return this.$store.state.levels[this.$route.params.world];
            },
            crashText()
            {
                return this.level.crash.fullCrashText;
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
