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

export function clearSettingSong() {
    return {
        type : 'CLEAR_SETTING_SONG',
    }
}

export function setPlaylist(playlist) {
    return {
        type : 'SET_PLAYLIST',
        playlist
    }
}

export function setSongIndex(index) {
    return {
        type : 'SET_SONG_INDEX',
        index
    }
}

export function setSettingSong(status) {
    return {
        type : 'SET_SETTING_SONG',
        status
    }
}