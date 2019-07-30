import parseGameRules from './parseGameRules';
import parseCrash from './parseCrash';
import parseClasspath from './parseClasspath';
import parseThreads from './parseThreads';
import parseStats from './parseStats';
import parseCSV from './parseCSV';
const JSZip = require("jszip");

function checkZip(zip)
{
    // Set up required files array and object
    const requiredFiles = ['gamerules.txt', 'classpath.txt', 'example_crash.txt', 'stats.txt', 'threads.txt'];
    let check = {};
    for(let requiredFile of requiredFiles)
    {
        check[requiredFile] = false;
    }
    
    // Iterate through all files in zip
    zip.forEach((relativePath, zipEntry) =>
    {
        if(check.hasOwnProperty(zipEntry.name))
        {
            check[zipEntry.name] = true;
        }
    });
    
    // Check if all required files are present
    for(let requiredFile of requiredFiles)
    {
        if(!check[requiredFile])
        {
            throw new Error('Missing required file!');
        }
    }
}

async function parseZip(file, store)
{
    let zip = new JSZip();
    await zip.loadAsync(file);
    
    checkZip(zip);
    
    store.commit('setGameRules', parseGameRules(await zip.file('gamerules.txt').async('string')));
    const crashData = parseCrash(await zip.file('example_crash.txt').async('string'));
    store.commit('setCrashData', crashData);
    if(crashData.details.players.length > 0)
    {
        store.commit('setWorldName', crashData.details.players[0].world);
    }
    
    store.commit('setClasspath', parseClasspath(await zip.file('classpath.txt').async('string')));
    store.commit('setThreads', parseThreads(await zip.file('threads.txt').async('string')));
    store.commit('setStats', parseStats(await zip.file('stats.txt').async('string')));
    
    // Get level data
    const levelFiles = ['block_entities.csv', 'chunks.csv', 'entities.csv', 'example_crash.txt', 'global_entities.csv', 'stats.txt'];
    let levels = {};
    let players = [];
    
    for(let fullfilename in zip.files)
    {
        if(!zip.files.hasOwnProperty(fullfilename))
        {
            continue;
        }
        let file = zip.files[fullfilename];
    
        let pathParts = fullfilename.split('/');
        // Make sure this is a level file
        if(pathParts.length === 4 && pathParts[0] === 'levels' && levelFiles.indexOf(pathParts[3]) !== -1)
        {
            const namespace = pathParts[1];
            const world = pathParts[2];
            const fileName = pathParts[3];
        
            if(!levels.hasOwnProperty(world))
            {
                levels[world] = {
                    namespace: namespace
                };
            }
            
            switch(fileName)
            {
                case 'stats.txt':
                {
                    levels[world].stats = parseStats(await file.async('string'));
                    break;
                }
                case 'example_crash.txt':
                {
                    levels[world].crash = parseCrash(await file.async('string'));
                    break;
                }
                case 'block_entities.csv':
                {
                    levels[world].blockEntities = parseCSV(await file.async('string'));
                    break;
                }
                case 'global_entities.csv':
                {
                    levels[world].globalEntities = parseCSV(await file.async('string'));
                    break;
                }
                case 'entities.csv':
                {
                    let entities = parseCSV(await file.async('string'));
                    
                    levels[world].entities = entities;

                    for(let entity of levels[world].entities)
                    {
                        if(entity.type === 'minecraft:player')
                        {
                            players.push({
                                name: entity['display_name'],
                                uuid: entity.uuid,
                                world: world,
                                x: entity.x,
                                y: entity.y,
                                z: entity.z
                            });
                        }
                    }
                    
                    break;
                }
                case 'chunks.csv':
                {
                    //TODO notify if chunks file is deemed too large
                    levels[world].chunks = parseCSV(await file.async('string'));
                    break;
                }
            }
        }
    }
    
    store.commit('setPlayers', players);
    store.commit('setLevels', levels);
}

export default parseZip;
