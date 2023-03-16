import React from 'react'
import CreatePlaylist from '../buttons/CreatePlaylist'
import LikedSongsIcon from '../buttons/LikedSongsIcon'
import {BsPlusSquareFill} from 'react-icons/bs'

export const SidebarData2 = [
    {
        title: "Criar playlist",
        /*icon: <CreatePlaylist active={window.location.pathname === "/" ? true : false} size='24' />,*/
        icon: <BsPlusSquareFill />,
        link: null
    },
    {
        title: "Músicas Curtidas",
        icon: <LikedSongsIcon active={window.location.pathname === "/liked-songs" ? true : false} size='24' />,
        link: "/liked-songs"
    },
];