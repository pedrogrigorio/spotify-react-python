import React from 'react';

const ForwardNav = ({size}) => {
    
    const fill = 'white';
    return(
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" transform="matrix(-1 0 0 1 32 0)" fill="black"/>
            <path d="M12.2603 8.23887C12.6074 7.92038 13.17 7.92038 13.5171 8.23887L20.7194 14.8471L20.7433 14.8252L22 15.9781L21.9761 16L22 16.0219L20.7433 17.1752L20.7193 17.1533L13.5171 23.7611C13.1701 24.0796 12.6074 24.0796 12.2604 23.7611C12.0362 23.5553 11.9567 23.2671 12.0222 23.0031C12.0581 22.8586 12.1375 22.7209 12.2604 22.6082L19.4626 16L12.2603 9.39179C11.9132 9.0737 11.9132 8.55735 12.2603 8.23887Z" fill={fill}/>
        </svg>



    )
}

export default ForwardNav


