function parseGameRules(data)
{
    const lines = data.split(/\n/);
    let rules = {};
    
    for(let line of lines)
    {
        if(line.length === 0)
        {
            continue;
        }
        let rule = line.split('=');
        rules[rule[0]] = rule[1];
    }
    return rules;
}

export default parseGameRules;
