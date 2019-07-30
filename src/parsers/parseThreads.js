function parseThreads(data)
{
    const lines = data.split(/\n/);
    let currentThread = '';
    let threads = [];
    
    for(let line of lines)
    {
        if(line.length === 0)
        {
            if(currentThread.length !== 0)
            {
                threads.push(currentThread.slice(0, -1));
                currentThread = '';
            }
        }
        else
        {
            currentThread += line + '\n';
        }
    }
    
    if(currentThread.length !== 0)
    {
        threads.push(currentThread.slice(0, -1));
    }
    
    return threads;
}

export default parseThreads;
