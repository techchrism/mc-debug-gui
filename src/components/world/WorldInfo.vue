<template>
    <b-card header="Information">
        <b-table :items="info" thead-class="hidden-header" small>
            <template slot="name" slot-scope="data">
                <strong>{{data.item.name}}</strong>
            </template>
        </b-table>
    </b-card>
</template>

<script>
    const blocked = ['Level seed'];

    export default {
        name: 'WorldInfo',
        computed: {
            level()
            {
                return this.$store.state.levels[this.$route.params.world];
            },
            info()
            {
                let rows = [];
                for(let name in this.level.crash.leveldetail)
                {
                    if(this.level.crash.leveldetail.hasOwnProperty(name) && blocked.indexOf(name) === -1)
                    {
                        rows.push({
                            name: name,
                            value: this.level.crash.leveldetail[name]
                        });
                    }
                }
                return rows;
            }
        }
    };
</script>

<style>
    .hidden-header
    {
        display: none;
    }
</style>
