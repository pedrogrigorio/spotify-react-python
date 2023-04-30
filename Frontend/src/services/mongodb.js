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