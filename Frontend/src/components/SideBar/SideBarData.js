import React from 'react'
import SearchIcon from '../buttons/SearchIcon'
import HomeIcon from '../buttons/HomeIcon'
import LibraryIcon from '../buttons/LibraryIcon'

export const SidebarData = [
    {
        title: "Início",
        icon: <HomeIcon active={window.location.pathname === "/" ? true : false} size='22' />,
        link: "/"
    },
    {
        title: "Buscar",
        icon: <SearchIcon active={window.location.pathname === "/search" ? true : false} size='22' />,
        link: "/search"
    },
    {
        title: "Sua Biblioteca",
        icon: <LibraryIcon active={window.location.pathname === "/library" ? true : false} size='20' />,
        link: "/library"
    },
];