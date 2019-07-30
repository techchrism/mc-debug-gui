<template>
    <div>
        <template v-if="loading">
            <b-card class="text-center m-5">
                <template v-if="!error">
                    <b-spinner/><br>
                    {{status}}
                </template>
                <b-alert v-else variant="danger" show>
                    <strong>{{error}}</strong><br>
                    <b-link :to="{name: 'home'}">Home</b-link>
                </b-alert>
            </b-card>
        </template>
        <template v-else>
            <sidebar :menu="menu">
                <router-view/>
                <template slot="footer-if-open">
                    <b-button :to="{name: 'home'}" variant="outline-light" style="margin: 15px">
                        <fa-icon icon="arrow-circle-up"/>
                        Upload Another
                    </b-button>
                </template>
            </sidebar>
        </template>
    </div>
</template>

<script>
    import {getZip} from '../db';

    function icon(name)
    {
        return {
            element: 'fa-icon',
            attributes: {
                icon: name
            }
        };
    }

    import Sidebar from './Sidebar';
    import parseZip from '../parsers/parseZip';
    export default {
        name: 'Report',
        components: {Sidebar},
        data()
        {
            return {
                loading: false,
                error: '',
                status: ''
            }
        },
        created()
        {
            this.load();
        },
        watch: {
            '$route'()
            {
                this.load();
            },
            previous(newPrevious)
            {
                if(newPrevious !== null)
                {
                    this.loadWhenPrevious();
                }
            }
        },
        methods: {
            load()
            {
                if(this.$store.state.loadedID === -1 || this.$store.state.loadedID !== Number(this.$route.params.id))
                {
                    this.status = 'Searching...';
                    this.loading = true;
                    if(this.$store.state.previous !== null)
                    {
                        this.loadWhenPrevious();
                    }
                }
            },
            async loadWhenPrevious()
            {
                let found = false;
                for(let item of this.previous)
                {
                    if(item.id === Number(this.$route.params.id))
                    {
                        found = true;
                        this.status = 'Loading...';

                        parseZip(await getZip(item.id), this.$store).then(() =>
                        {
                            this.$store.commit('setLoadedID', item.id);
                        }, (err) =>
                        {
                            this.error = err.message;
                        }).finally(() =>
                        {
                            this.loading = false;
                        });
                    }
                }

                if(!found)
                {
                    this.error = 'Zip by id "' + this.$route.params.id + '" not found'
                }
            }
        },
        computed: {
            previous()
            {
                return this.$store.state.previous;
            },
            menu()
            {
                let menu = [];
                menu.push({
                    href: {name: 'overview'},
                    title: 'Overview',
                    icon: icon('columns')
                });
                menu.push({
                    href: {name: 'players'},
                    title: 'Players',
                    icon: icon('users')
                });
                menu.push({
                    href: {name: 'gamerules'},
                    title: 'Gamerules',
                    icon: icon('cogs')
                });

                if(this.$store.state.fabric)
                {
                    menu.push({
                        href: {name: 'fabric'},
                        title: 'Fabric',
                        icon: icon('scroll')
                    });
                }

                menu.push({
                    title: 'Internal',
                    icon: icon('flask'),
                    child: [
                        {
                            href: {name: 'threads'},
                            title: 'Threads',
                            icon: icon('stream')
                        },
                        {
                            href: {name: 'crash'},
                            title: 'Example Crash',
                            icon: icon('car-crash')
                        },
                        {
                            href: {name: 'classpath'},
                            title: 'Classpath',
                            icon: icon('book')
                        },
                        {
                            href: {name: 'ticks'},
                            title: 'Ticks',
                            icon: icon('stopwatch')
                        }
                    ]
                });

                //globe-americas

                menu.push({
                    header: true,
                    title: 'Worlds'
                });

                let commonWorlds = ['overworld', 'the_nether', 'the_end'];
                let worldNames = [];
                for(let worldName in this.$store.state.levels)
                {
                    if(!this.$store.state.levels.hasOwnProperty(worldName))
                    {
                        continue;
                    }

                    worldNames.push(worldName);
                }

                worldNames.sort((a, b) =>
                {
                    let aCommon = commonWorlds.indexOf(a) !== -1;
                    let bCommon = commonWorlds.indexOf(b) !== -1;

                    if(aCommon && bCommon)
                    {
                        // Compare based on placement in commonWorlds
                        return ((commonWorlds.indexOf(a) < commonWorlds.indexOf(b)) ? -1 : 1);
                    }
                    else if(!aCommon && !bCommon)
                    {
                        // Compare alphabetically
                        return ((a < b) ? -1 : 1);
                    }
                    else
                    {
                        // Compare based on which is in commonWorlds
                        return (aCommon ? -1 : 1);
                    }
                });

                for(let worldName of worldNames)
                {
                    let iconName = '';
                    switch(worldName)
                    {
                        case 'overworld':
                        {
                            iconName = 'sun';
                            break;
                        }
                        case 'the_nether':
                        {
                            iconName = 'fire-alt';
                            break;
                        }
                        case 'the_end':
                        {
                            iconName = 'dragon';
                            break;
                        }
                        default:
                        {
                            iconName = 'cube';
                        }
                    }

                    menu.push({
                        title: worldName,
                        icon: icon(iconName),
                        child: [
                            {
                                href: {name: 'world-overview', params: {world: worldName}},
                                title: 'General',
                                icon: icon('info-circle')
                            },
                            {
                                href: {name: 'world-example-crash', params: {world: worldName}},
                                title: 'Example World Crash',
                                icon: icon('car-crash')
                            },
                            {
                                href: {name: 'world-stats', params: {world: worldName}},
                                title: 'Statistics',
                                icon: icon('list')
                            },
                            {
                                href: {name: 'world-entities', params: {world: worldName}},
                                title: 'Entities',
                                icon: icon('cloud')
                            },
                            {
                                href: {name: 'world-block-entities', params: {world: worldName}},
                                title: 'Block Entities',
                                icon: icon('cube')
                            },
                            {
                                href: {name: 'world-global-entities', params: {world: worldName}},
                                title: 'Global Entities',
                                icon: icon('globe')
                            },
                            {
                                href: {name: 'world-chunks', params: {world: worldName}},
                                title: 'Chunks',
                                icon: icon('th-large')
                            }
                        ]
                    });
                }

                return menu;
            }
        }
    };
</script>

<style scoped>

</style>
