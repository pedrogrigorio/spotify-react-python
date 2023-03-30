import { useState } from 'react';
import React from 'react';

const SearchIcon = ({size, active}) => {

    //const [active, setActive] = useState(false)

    const fill = active ? '#FFF' : '#B3B3B3'
    return(
        // <div onClick={() => setActive(!active)}>
        <div>
            {active ? (
                <svg width={size} height={size} viewBox="1 -5 37 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 0C30.263 0 39 8.73746 39 19.4998C39 30.2625 30.263 39 19.5 39C8.73701 39 0 30.2625 0 19.4998C0 8.73746 8.73701 0 19.5 0ZM17.2208 11.7047C17.2208 11.2711 16.8409 10.9187 16.4294 10.9187H13.1372C12.694 10.9187 12.3458 11.2711 12.3458 11.7047V27.1994C12.3458 27.6334 12.694 27.9857 13.1372 27.9857H16.4294C16.8409 27.9857 17.2208 27.6334 17.2208 27.1994V11.7047ZM26.9708 11.7047C26.9708 11.2711 26.6226 10.9187 26.1794 10.9187H22.8872C22.444 10.9187 22.0958 11.2711 22.0958 11.7047V27.1994C22.0958 27.6334 22.444 27.9857 22.8872 27.9857H26.1794C26.6226 27.9857 26.9708 27.6334 26.9708 27.1994V11.7047Z" fill="white"/>
                </svg>
            ) : (
                <svg width={size} height={size} viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_8_4)">
                        <circle cx="28.5" cy="24.5" r="19.5" fill="white"/>
                    </g>
                    <path d="M36.4608 25.3486C37.0886 24.9571 37.0886 24.0431 36.4608 23.6515L24.5292 16.2104C23.8631 15.795 23 16.2739 23 17.0589V31.9412C23 32.7262 23.8631 33.2051 24.5292 32.7897L36.4608 25.3486Z" fill="black"/>
                    <defs>
                        <filter id="filter0_d_8_4" x="0" y="0" width="57" height="57" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_8_4"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="4"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_4"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_4" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            )}
        </div>
    )
}

export default SearchIcon