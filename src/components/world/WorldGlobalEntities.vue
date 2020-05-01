<template>
    <b-table :items="entities" :fields="fields" striped></b-table>
</template>

<script>
    export default {
        name: 'WorldGlobalEntities',
        data()
        {
            return {
                fields: [
                    {
                        label: 'Type',
                        key: 'type',
                        sortable: true
                    },
                    {
                        label: 'Display Name',
                        key: 'display_name',
                        sortable: true
                    },
                    {
                        label: 'Custom Name',
                        key: 'custom_name',
                        sortable: true
                    },
                    {
                        label: 'Alive',
                        key: 'alive'
                    },
                    {
                        label: 'UUID',
                        key: 'uuid'
                    },
                    {
                        label: 'X',
                        key: 'x'
                    },
                    {
                        label: 'Y',
                        key: 'y'
                    },
                    {
                        label: 'Z',
                        key: 'z'
                    }
                ]
            }
        },
        computed: {
            level()
            {
                return this.$store.state.levels[this.$route.params.world];
            },
            entities()
            {
                return this.level.globalEntities.map((v) =>
                {
                    v.x = Number(v.x).toFixed(1);
                    v.y = Number(v.y).toFixed(1);
                    v.z = Number(v.z).toFixed(1);
                    return v;
                });
            }
        }
    };
</script>

<style scoped>

</style>
