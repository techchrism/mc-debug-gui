<template>
    <b-table :items="stats"></b-table>
</template>

<script>
    export default {
        name: 'WorldStats',
        computed: {
            level()
            {
                return this.$store.state.levels[this.$route.params.world];
            },
            stats()
            {
                let statObj = this.level.stats;
                let stats = [];
                for(let statName in statObj)
                {
                    if(!statObj.hasOwnProperty(statName))
                    {
                        continue;
                    }

                    stats.push({
                        name: statName,
                        value: statObj[statName]
                    });
                }

                return stats;
            }
        }
    };
</script>

<style scoped>

</style>
