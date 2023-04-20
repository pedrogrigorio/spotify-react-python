import api from './api';

export async function searchEngine(searchContent){

    let data

    await api.post('/search_music', {search_content: searchContent})
    .then(response => {
        data = response.data
        console.log(data)
    })

    return { data }
}


export async function getSong(index){

    let audio

    await api.post('/read_music', {index_request: index})
    .then(response => {
        audio = response.data
        console.log(audio)
    })

    return { audio }
}