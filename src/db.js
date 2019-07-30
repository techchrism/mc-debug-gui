import { openDB, deleteDB, wrap, unwrap } from 'idb';
let db = null;
let store = null;

export async function loadDB(vStore)
{
    store = vStore;
    
    db = await openDB('mcdebuggui', 1, {
        upgrade(database, oldVersion, newVersion, transaction)
        {
            database.createObjectStore('meta', {
                keyPath: 'id'
            });
            
            database.createObjectStore('files', {
                autoIncrement: true
            });
        }
    });
    
    const meta = await db.getAll('meta');
    store.commit('setPrevious', meta);
}

export async function addZip(name, givenName, file)
{
    const tx = db.transaction(['files', 'meta'], 'readwrite');
    const files = tx.objectStore('files');
    const meta = tx.objectStore('meta');
    
    const key = await files.add(file);
    const metaData = {
        id: key,
        filename: name,
        starred: false,
        givenName: givenName,
        color: '',
        dateAdded: (new Date())
    };
    meta.add(metaData);
    await tx.done;
    
    store.commit('addPrevious', metaData);
    return key;
}

export async function removeZip(id)
{
    const tx = db.transaction(['files', 'meta'], 'readwrite');
    const files = tx.objectStore('files');
    const meta = tx.objectStore('meta');
    
    files.delete(id);
    meta.delete(id);
    
    await tx.done;
    
    store.commit('removePrevious', id);
}

export async function getZip(id)
{
    return await db.get('files', id);
}

export async function starZip(id, starred)
{
    const tx = db.transaction('meta', 'readwrite');
    const item = await tx.store.get(id);
    item.starred = starred;
    tx.store.put(item);
    
    await tx.done;
    
    store.commit('starPrevious', {id, starred});
}

export async function renameZip(id, name)
{
    const tx = db.transaction('meta', 'readwrite');
    const item = await tx.store.get(id);
    item.givenName = name;
    tx.store.put(item);
    
    await tx.done;
    
    store.commit('renamePrevious', {id, name});
}

export async function setZipColor(id, color)
{
    const tx = db.transaction('meta', 'readwrite');
    const item = await tx.store.get(id);
    item.color = color;
    tx.store.put(item);
    
    await tx.done;
    
    store.commit('setPreviousColor', {id, color});
}
