import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import LinkConst from './LinkConst';
import * as PlayActions from '../store/actions/play';
import axios from "axios";

export async function GetMetadata(link){
    
    let config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
      
    let payload = {
        link_request: link
    }

    let data

    await axios.post('http://127.0.0.1:8000/read_meta_data', payload, config)
    .then(response => {
        data = response.data
        console.log(data)
    })

    return { data }
}

export async function GetSong(link){
    
    let config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        },
        responseType: 'blob'
    }
      
    let payload = {
        link_request: link
    }

    let audio

    await axios.post('http://127.0.0.1:8000/read_music', payload, config)
    .then(response => {
        audio = URL.createObjectURL(response.data)
        console.log(audio)
    })

    return { audio }
}
/*
    useEffect(() => {

        if(request) {
            fetch(LinkConst.readMetaData, {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ link_request: link})
            }).
            then((response) => response.json()).
            then((data) => {
                fetch(LinkConst.readMusic, {
                    method: 'POST', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ link_request: link})
                }).
                then(response => response.blob()).
                then(blob => {
                    const url = URL.createObjectURL(blob)
                    dispatch(PlayActions.setDataMusic(data.img,data.artist,data.title,url))
                })
            })
        }
    },[request])
}*/

// function clearMusicData() {
//     return { 
//         type : 'CLEAR_MUSIC_DATA'
//     }
// }


//export default connect()(MusicConect)