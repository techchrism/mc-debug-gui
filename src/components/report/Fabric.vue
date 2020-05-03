<template>
    <b-table striped :items="mods" :fields="fields"/>
</template>

<script>
    export default {
        name: 'Fabric',
        data()
        {
            return {
                fields: [
                    {
                        key: 'name',
                        label: 'Name',
                        sortable: true
                    },
                    {
                        key: 'version',
                        label: 'Version'
                    },
                    {
                        key: 'id',
                        label: 'ID',
                        sortable: true
                    }
                ]
            }
        },
        computed: {
            mods()
            {
                return this.$store.state.fabric;
            }
        }
    };
</script>

<style scoped>

</style>
