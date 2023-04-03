import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import LinkConst from './LinkConst';
import * as PlayActions from '../store/actions/play';

function MusicConect({link, request}) {

    const dispatch = useDispatch()
    
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
}

// function clearMusicData() {
//     return { 
//         type : 'CLEAR_MUSIC_DATA'
//     }
// }


export default connect()(MusicConect)