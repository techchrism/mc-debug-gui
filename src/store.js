import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        gamerules: {},
        stats: {},
        classpath: [],
        examplecrash: '',
        fabric: undefined,
        details: {},
        threads: [],
        players: [],
        levels: {},
        worldname: '',
        loadedID: -1,
        
        previous: null
    },
    mutations: {
        setLoadedID(state, id)
        {
            this.state.loadedID = id;
        },
        setGameRules(state, rules)
        {
            state.gamerules = rules;
        },
        setCrashData(state, data)
        {
            state.examplecrash = data.fullCrashText;
            state.details = data.details;
            if(data.fabric.length > 0)
            {
                state.fabric = data.fabric;
            }
            else
            {
                state.fabric = undefined;
            }
        },
        setClasspath(state, classpath)
        {
            state.classpath = classpath;
        },
        setWorldName(state, name)
        {
            state.worldname = name;
        },
        setThreads(state, threads)
        {
            state.threads = threads;
        },
        setStats(state, stats)
        {
            state.stats = stats;
        },
        setPlayers(state, players)
        {
            state.players = players;
        },
        setLevels(state, levels)
        {
            state.levels = levels;
        },
        
        // Previous Items
        setPrevious(state, previous)
        {
            state.previous = previous;
        },
        addPrevious(state, item)
        {
            state.previous.push(item);
        },
        removePrevious(state, id)
        {
            state.previous = state.previous.filter((item) =>
            {
                return item.id !== id;
            });
        },
        starPrevious(state, {id, starred})
        {
            for(let item of state.previous)
            {
                if(item.id === id)
                {
                    item.starred = starred;
                }
            }
        },
        setPreviousColor(state, {id, color})
        {
            for(let item of state.previous)
            {
                if(item.id === id)
                {
                    item.color = color;
                }
            }
        },
        renamePrevious(state, {id, name})
        {
            for(let item of state.previous)
            {
                if(item.id === id)
                {
                    item.givenName = name;
                }
            }
        }
    },
    actions: {
    
    }
});
