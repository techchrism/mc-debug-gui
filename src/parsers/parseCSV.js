import Papa from 'papaparse';

function parseCSV(data)
{
    let cleanData = data;
    cleanData.replace(/(^[ \t]*\n)/gm, '');
    cleanData = cleanData.trim();
    return Papa.parse(cleanData, {
        header: true,
        dynamicTyping: true
    }).data;
}

export default parseCSV;
