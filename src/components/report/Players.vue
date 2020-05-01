<template>
    <div class="margin">
        <b-card class="playercount">
            <h5 class="text-center">Players: <strong>{{online}} / {{max}}</strong></h5>
        </b-card>

        <b-table striped :items="players" :fields="fields">
            <template v-slot:cell(icon)="data">
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
                fields: [
                    {
                        key: 'icon',
                        label: ''
                    },
                    {
                        label: 'Name',
                        key: 'name',
                        sortable: true
                    },
                    {
                        label: 'UUID',
                        key: 'uuid',
                        sortable: true
                    },
                    {
                        label: 'World',
                        key: 'world',
                        sortable: true
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
