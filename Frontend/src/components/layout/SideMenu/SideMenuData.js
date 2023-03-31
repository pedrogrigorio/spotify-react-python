import React from 'react'
import Search from '../../icons/Search'
import Home from '../../icons/Home'
import Library from '../../icons/Library'

export const SidebarData = [
    {
        title: "Início",
        icon: <Home active={window.location.pathname === "/" ? true : false} size='22' />,
        link: "/"
    },
    {
        title: "Buscar",
        icon: <Search active={window.location.pathname === "/search" ? true : false} size='22' />,
        link: "/search"
    },
    {
        title: "Sua Biblioteca",
        icon: <Library active={window.location.pathname === "/library" ? true : false} size='20' />,
        link: "/library"
    },
];

