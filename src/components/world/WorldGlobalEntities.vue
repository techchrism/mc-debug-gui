<template>
    <b-table :items="entities" :fields="fields" striped></b-table>
</template>

<script>
    export default {
        name: 'WorldGlobalEntities',
        data()
        {
            return {
                fields: {
                    type: {
                        label: 'Type',
                        key: 'type',
                        sortable: true
                    },
                    displayName: {
                        label: 'Display Name',
                        key: 'display_name',
                        sortable: true
                    },
                    customName: {
                        label: 'Custom Name',
                        key: 'custom_name',
                        sortable: true
                    },
                    alive: {
                        label: 'Alive',
                        key: 'alive'
                    },
                    uuid: {
                        label: 'UUID',
                        key: 'uuid'
                    },
                    x: {
                        label: 'X',
                        key: 'x'
                    },
                    y: {
                        label: 'Y',
                        key: 'y'
                    },
                    z: {
                        label: 'Z',
                        key: 'z'
                    }
                }
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
