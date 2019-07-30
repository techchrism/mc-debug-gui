function parseClasspath(data)
{
    return data.split(/\n/).filter((v) =>
    {
        return v.length > 0;
    });
}

export default parseClasspath;
