import React from 'react';

const Search = ({size, active, searchBox}) => {

    let fill = active ? '#FFF' : '#B3B3B3'
    if(searchBox){
        fill = 'black'
    }
    
    return(
        <>
            {active ? (
                <svg role="img" height={size} width={size} aria-hidden="true" class="Svg-sc-ytk21e-0 gQUQL search-active-icon" viewBox="0 0 24 24" data-encore-id="icon">
                    <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z" fill={fill}></path>
                    <path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z" fill={fill}></path>
                </svg>
            ) : (
                <svg role="img" height={size} width={size} aria-hidden="true" class="Svg-sc-ytk21e-0 gQUQL search-icon" viewBox="0 0 24 24" data-encore-id="icon">
                    <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z" fill={fill}></path>
                </svg>
            )}
        </>
    )
}

export default Search