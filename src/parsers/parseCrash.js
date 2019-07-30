function parseCrash(data)
{
    let retData = {
        fullCrashText: data,
        details: {},
        fabric: [],
        leveldetail: {}
    };
    
    const lines = data.split(/\n/);
    let flags = {
        details: false,
        fabric: false,
        leveldetail: false
    };
    
    for(let line of lines)
    {
        if((flags.details || flags.leveldetail) && line !== 'Details:')
        {
            if(flags.fabric && !line.startsWith('\t\t'))
            {
                flags.fabric = false;
            }
            
            if(flags.leveldetail && !line.startsWith('\t'))
            {
                flags.leveldetail = false;
            }
            
            const trimmed = line.trimLeft();
            const split = trimmed.split(/\:(.+)/);
            const name = split[0];
            const value = (split[1] || '').trimLeft();
            
            switch(name)
            {
                case 'Player Count':
                {
                    const parts = value.split('; ');
                    retData.details.playercount = {
                        max: Number(parts[0].split(' / ')[1]),
                        current: Number(parts[0].split(' / ')[0])
                    };
                    
                    retData.details.players = [];
                    
                    // Using sketchy regex on a data source I don't own (or even understand)? What could go wrong?
                    let players = parts[1].match(/(?:\[([^\[\]]+?)\])+/);
                    players.splice(0, 1);
                    for(let player of players)
                    {
                        let entity = player.match(/'(.+?)'\/(\d+)/);
                        let world = player.match(/l='(.+?)'/)[1];
                        let x = Number(player.match(/x=(.+?)(?:$|,)/)[1]);
                        let y = Number(player.match(/y=(.+?)(?:$|,)/)[1]);
                        let z = Number(player.match(/z=(.+?)(?:$|,)/)[1]);
    
                        retData.details.players.push({
                            name: entity[1],
                            id: entity[2],
                            world: world,
                            x: x,
                            y: y,
                            z: z
                        });
                    }
                    break;
                }
                case 'JVM Flags':
                {
                    retData.details.flags = value.substring(value.indexOf('total; ') + 'total; '.length).split(' ');
                    break;
                }
                case 'Memory':
                {
                    let parts = value.match(/(\d+) bytes \((.+?)\) \/ (\d+) bytes \((.+?)\) up to (\d+) bytes \((.+?)\)/);
                    retData.details.memory = {
                        current: {
                            amount: Number(parts[1]),
                            friendly: parts[2]
                        },
                        allocated: {
                            amount: Number(parts[3]),
                            friendly: parts[4]
                        },
                        max: {
                            amount: Number(parts[5]),
                            friendly: parts[6]
                        }
                    };
                    break;
                }
                default:
                {
                    if(flags.fabric)
                    {
                        let version = value.match(/(\d+\.\d+\.\d+(?:\+.+)?)/g)[0];
                        let fullname = value.substr(0, value.indexOf(version) - 1);
                        retData.fabric.push({
                            id: name,
                            name: fullname,
                            version: version
                        });
                    }
                    else if(name === 'Fabric Mods')
                    {
                        flags.fabric = true;
                    }
                    else if(flags.leveldetail)
                    {
                        retData.leveldetail[name] = value;
                    }
                    else
                    {
                        retData.details[name] = value;
                    }
                    
                    break;
                }
            }
        }
    
        if(line === '-- System Details --')
        {
            flags.details = true;
        }
        else if(line === '-- Affected level --')
        {
            flags.leveldetail = true;
        }
    }
    
    return retData;
}

export default parseCrash;
