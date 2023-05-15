export function setSongMetaData(title, artist, image, index) {
    return { 
        type : 'SET_SONG_META_DATA',
        title,
        artist,
        image,
        index,
    }
}

export function setSongTrackData(trackData) {
    return { 
        type : 'SET_SONG_TRACK',
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