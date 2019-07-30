<template>
    <div class="m-2">
        <!-- Only show the world name if one exists -->
        <div v-if="worldName !== ''" class="text-center bottom-margin">
            <h2>{{worldName}}</h2>
        </div>

        <b-card header="Information" class="bottom-margin">
            <b-table :items="info" thead-class="hidden-header" small>
                <template slot="name" slot-scope="data">
                    <strong>{{data.item.name}}</strong>
                </template>
            </b-table>
        </b-card>

        <b-card header="Memory" class="bottom-margin">
            <b-progress :max="details.memory.allocated.amount" height="25px" class="bottom-margin">
                <b-progress-bar :value="details.memory.current.amount">
                    {{details.memory.current.friendly}} Current / {{details.memory.allocated.friendly}} Allocated
                </b-progress-bar>
            </b-progress>

            <b-progress :max="details.memory.max.amount" height="25px" class="">
                <b-progress-bar :value="details.memory.allocated.amount" variant="info">
                    {{details.memory.allocated.friendly}} Allocated / {{details.memory.max.friendly}} Max
                </b-progress-bar>
            </b-progress>
        </b-card>

        <b-card header="Java Flags">
            <ul>
                <li v-for="flag in details.flags">
                    {{flag}}
                </li>
            </ul>
        </b-card>
    </div>
</template>

<script>
    const removeDetails = ['flags', 'playerCount', 'players', 'memory', 'playercount'];

    export default {
        name: 'Overview',
        computed: {
            worldName()
            {
                return this.$store.state.worldname;
            },
            details()
            {
                return this.$store.state.details;
            },
            info()
            {
                let rows = [];
                for(let name in this.details)
                {
                    if(this.details.hasOwnProperty(name) && removeDetails.indexOf(name) === -1)
                    {
                        rows.push({
                            name: name,
                            value: this.details[name]
                        });
                    }
                }
                return rows;
            }
        }
    };
</script>

<style scoped>
    .bottom-margin
    {
        margin-bottom: 10px;
    }
</style>
