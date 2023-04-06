export function setSongData(title, artist, image, trackData) {
    return { 
        type : 'SET_SONG_DATA',
        title,
        artist,
        image,
        trackData
    }
}