import React from 'react'
import SearchIcon from '../icons/SearchIcon'
import HomeIcon from '../icons/HomeIcon'
import LibraryIcon from '../icons/LibraryIcon'

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

