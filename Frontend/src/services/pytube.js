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
    })

    return { audio }
}

export async function getTopContent() {
    let content
    
    await api.get('/get_top_trends')
    .then(response => {
        content = response.data
    })

    return { content }
}

export async function getRecentSearch() {
    let recent
    
    await api.get('/get_recents_search')
    .then(response => {
        recent = response.data
    })

    return { recent }
}