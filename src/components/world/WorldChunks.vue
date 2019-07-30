<template>
    <div>
        <b-card class="text-center m-3">
            <strong>Total Chunks:</strong> {{chunks.length}}
        </b-card>

        <div class="d-flex justify-content-center">
            <b-form-group label="Visible Fields">
                <b-form-checkbox-group
                        v-model="fields"
                        :options="options"
                        name="fields"
                        stacked
                ></b-form-checkbox-group>
            </b-form-group>
        </div>

        <b-pagination
                v-model="currentPage"
                :total-rows="chunks.length"
                :per-page="rowsShown"
                align="center"
                limit="10"
        ></b-pagination>

        <b-container>
            <b-table :items="chunks" :fields="fields" striped :per-page="rowsShown" :current-page="currentPage"></b-table>
        </b-container>

    </div>
</template>

<script>
    const fieldSelection = {
        'x': true,
        'z': true,
        'in_memory': true,
        'status': true,
        'full_status': true,
        'accessible_ready': false,
        'ticking_ready': false,
        'entity_ticking_ready': false,
        'ticket': false,
        'spawning': true,
        'entity_count': true,
        'block_entity_count': true
    };

    export default {
        name: 'WorldChunks',
        data()
        {
            let defaultSelected = [];
            for(let item in fieldSelection)
            {
                if(fieldSelection[item])
                {
                    defaultSelected.push(item);
                }
            }

            return {
                fields: defaultSelected,
                currentPage: 1,
                rowsShown: 50
            };
        },
        computed: {
            chunks()
            {
                return this.$store.state.levels[this.$route.params.world].chunks;
            },
            options()
            {
                let options = [];
                for(let item in fieldSelection)
                {
                    options.push({
                        text: item,
                        value: item
                    });
                }
                return options;
            }
        }
    };
</script>

<style scoped>

</style>
