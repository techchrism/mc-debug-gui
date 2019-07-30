<template>
    <b-table striped :items="mods" :fields="fields">

    </b-table>
</template>

<script>
    export default {
        name: 'Fabric',
        data()
        {
            return {
                fields: {
                    'name': {
                        key: 'name',
                        label: 'Name',
                        sortable: true
                    },
                    'version': {
                        key: 'version',
                        label: 'Version'
                    },
                    'id': {
                        key: 'id',
                        label: 'ID',
                        sortable: true
                    }
                }
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
