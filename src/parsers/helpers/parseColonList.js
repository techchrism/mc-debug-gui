function parseColonList(data, handlers = {})
{
    const lines = data.split(/\n/);
    let ret = {};
    for(let line of lines)
    {
        if(line.length === 0)
        {
            continue;
        }
    
        const parts = line.trimLeft().split(/\:(.+)/);
        const name = parts[0];
        const value = parts[1].trimLeft();
        
        if(handlers.hasOwnProperty(name))
        {
            ret[name] = handlers[name](value);
        }
        else
        {
            ret[name] = value;
        }
    }
    
    return ret;
}

export default parseColonList;
