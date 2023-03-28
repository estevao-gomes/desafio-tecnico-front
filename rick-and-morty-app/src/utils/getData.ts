export async function getData(){
    const res = await fetch("https://rickandmortyapi.com/api/character");

    console.log(res.json())

    if(res.ok!){
        throw new Error('Failed to get server data')
    }
    
    return res.json()
}