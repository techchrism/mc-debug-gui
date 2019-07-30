<template>
    <div class="margin">
        <b-card class="playercount">
            <h5 class="text-center">Players: <strong>{{online}} / {{max}}</strong></h5>
        </b-card>

        <b-table striped :items="players" :fields="fields">
            <template slot="icon" slot-scope="data">
                <img :src="'https://crafatar.com/avatars/' + data.item.uuid + '?size=27'">
            </template>
        </b-table>

        <div class="font-weight-light text-center">
            Thank you to <b-link href="https://crafatar.com" target="_blank" rel="noopener">Crafatar</b-link> for providing avatars
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Players',
        data()
        {
            return {
                fields: {
                    icon: {
                        label: ''
                    },
                    name: {
                        label: 'Name',
                        key: 'name',
                        sortable: true
                    },
                    uuid: {
                        label: 'UUID',
                        key: 'uuid',
                        sortable: true
                    },
                    world: {
                        label: 'World',
                        key: 'world',
                        sortable: true
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
            online()
            {
                return this.$store.state.details.playercount.current;
            },
            max()
            {
                return this.$store.state.details.playercount.max;
            },
            players()
            {
                return this.$store.state.players.map((v) =>
                {
                    if(typeof v.x === 'string')
                    {
                        return v;
                    }

                    v.x = v.x.toFixed(1);
                    v.y = v.y.toFixed(1);
                    v.z = v.z.toFixed(1);
                    return v;
                });
            }
        }
    };
</script>

<style scoped>
    .margin
    {
        margin: 25px;
    }

    .playercount
    {
        margin-bottom: 15px;
    }
</style>
