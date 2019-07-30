import parseColonList from './helpers/parseColonList';

function parseStats(data)
{
    return parseColonList(data, {
        'tick_times': (value) =>
        {
            let times = value.substr(1, value.length - 1).split(', ');
            return times.map((v) =>
            {
                return Number(v);
            })
        }
    });
}

export default parseStats;
