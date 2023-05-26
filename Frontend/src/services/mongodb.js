import api from './api';

export async function get_all_playlists() {

    let data

    await api.get('/playlists')
    .then(response => {
        data = response.data
        console.log(data)
    })

    return data
}

export async function get_one_playlist(id) {

    let data

    await api.get(`/playlist/${id}`)
    .then(response => {
        data = response.data
        console.log(data)
    })

    return data
}

export async function create_playlist() {

    let data

    await api.post('/playlists')
    .then(response => {
        data = response.data
        console.log(data)
    })

    return data
}

export async function delete_playlist(id) {

    await api.delete(`/playlist/${id}`)
    .then(response => {
        console.log(response.data)
    })
}

export async function add_song(id, song) {

    await api.put(`/playlist/${id}`, { song_to_be_added: song })
    .then(response => {
        console.log(response.data)
    })
}

export async function remove_song(id, index) {

    console.log(index)
    await api.put(`/playlist/${id}`, { song_to_be_removed: index })
    .then(response => {
        console.log(response.data)
    })
}

export async function rename_playlist(id, name) {

    await api.put(`/playlist/${id}`, { name: name })
    .then(response => {
        console.log(response.data)
    })
}

export async function get_liked_songs_playlist() {
    let data

    await api.get(`/liked-songs`)
    .then(response => {
        data = response.data
        console.log(data)
    })

    return data
}

export async function like_song(song) {

    await api.post(`/liked-songs`, { song: song })
    .then(response => {
        console.log(response.data)
    })
}

export async function unlike_song(id) {

    await api.delete(`/liked-songs/${id}`)
    .then(response => {
        console.log(response.data)
    })
}

export async function get_one_liked_song(id) {

    let data

    console.log(id)
    
    await api.get(`/liked-song-id/`, {
        params: {
            id: id
        }
    })
    .then(response => {
        data = response.data
        console.log(data)
    })

    return data
}