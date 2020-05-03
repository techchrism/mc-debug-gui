import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Report from './views/Report';
import Players from './components/report/Players';
import Threads from './components/report/Threads';
import Crash from './components/report/Crash';
import Classpath from './components/report/Classpath';
import Gamerules from './components/report/Gamerules';
import Overview from './components/report/Overview';
import Ticks from './components/report/Ticks';
import Fabric from './components/report/Fabric';
import EmptyRouter from './components/world/EmptyRouter';
import WorldOverview from './components/world/WorldOverview';
import WorldExampleCrash from './components/world/WorldExampleCrash';
import WorldStats from './components/world/WorldStats';
import WorldEntities from './components/world/WorldEntities';
import BlockEntities from './components/world/BlockEntities';
import WorldGlobalEntities from './components/world/WorldGlobalEntities';
import WorldChunks from './components/world/WorldChunks';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/report/:id',
            component: Report,
            children: [
                {
                    path: '/',
                    name: 'overview',
                    component: Overview
                },
                {
                    path: 'players',
                    name: 'players',
                    component: Players
                },
                {
                    path: 'threads',
                    name: 'threads',
                    component: Threads
                },
                {
                    path: 'crash',
                    name: 'crash',
                    component: Crash
                },
                {
                    path: 'classpath',
                    name: 'classpath',
                    component: Classpath
                },
                {
                    path: 'gamerules',
                    name: 'gamerules',
                    component: Gamerules
                },
                {
                    path: 'ticks',
                    name: 'ticks',
                    component: Ticks
                },
                {
                    path: 'fabric',
                    name: 'fabric',
                    component: Fabric
                },
                {
                    path: 'world/:world',
                    component: EmptyRouter,
                    children: [
                        {
                            path: '/',
                            name: 'world-overview',
                            component: WorldOverview
                        },
                        {
                            path: 'crash',
                            name: 'world-example-crash',
                            component: WorldExampleCrash
                        },
                        {
                            path: 'stats',
                            name: 'world-stats',
                            component: WorldStats
                        },
                        {
                            path: 'entities',
                            name: 'world-entities',
                            component: WorldEntities
                        },
                        {
                            path: 'entities-block',
                            name: 'world-block-entities',
                            component: BlockEntities
                        },
                        {
                            path: 'entities-global',
                            name: 'world-global-entities',
                            component: WorldGlobalEntities
                        },
                        {
                            path: 'chunks',
                            name: 'world-chunks',
                            component: WorldChunks
                        }
                    ]
                }
            ]
        }
    ]
});
