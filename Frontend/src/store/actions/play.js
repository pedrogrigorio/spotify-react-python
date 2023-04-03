export function setDataMusic(image, artist, title, trackData) {
    return { 
        type : 'SET_MUSIC_DATA',
        image,
        artist,
        title,
        trackData
    }
}