import api from './api';

export async function searchEngine(searchContent){

    let data

    await api.post('/search', {search_content: searchContent})
    .then(response => {
        data = response.data
        console.log(data)
    })

    return { data }
}
// Deprecated 
// export async function getMetadata(link){
    
//     let data

//     await api.post('/read_meta_data', {link_request: link})
//     .then(response => {
//         data = response.data
//         console.log(data)
//     })

//     return { data }
// }

export async function getSong(index){

    let audio

    await api.post('/read_music', {index_request: index}, {responseType: 'blob'})
    .then(response => {
        audio = URL.createObjectURL(response.data)
        console.log(audio)
    })

    return { audio }
}