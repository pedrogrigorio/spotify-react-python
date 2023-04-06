export function setSongData(title, artist, image, trackData) {
    return { 
        type : 'SET_SONG_DATA',
        title,
        artist,
        image,
        trackData
    }
}

export function setIsPlaying(status) {
    return {
        type : 'SET_IS_PLAYING',
        status
    }
}

export function clearSettingSong(bool) {
    return {
        type : 'CLEAR_SETTING_SONG',
    }
}