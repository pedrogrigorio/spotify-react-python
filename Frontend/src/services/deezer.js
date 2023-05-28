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

export async function getTopAlbums() {
    let content
    
    await api.get('/get_top_albums')
    .then(response => {
        content = response.data
    })

    return { content }
}

export async function getTopSongs() {
    let content
    
    await api.get('/get_top_songs')
    .then(response => {
        content = response.data
    })

    return { content }
}


export async function getRecentSearch() {
    let content
    
    await api.get('/get_recents_search')
    .then(response => {
        content = response.data
    })

    return { content }
}

export async function getGenres() {

    const genres = await api.get('/genres')
    
    const response = genres.data

    return response
}