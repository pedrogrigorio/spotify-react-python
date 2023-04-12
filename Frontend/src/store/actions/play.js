export function setMusicMetaData(image, artist, title) {
    return { 
        type : 'SET_MUSIC_META_DATA',
        image,
        artist,
        title,
    }
}

export function setMusicData(trackData) {
    return { 
        type : 'SET_MUSIC_DATA',
        trackData
    }
}