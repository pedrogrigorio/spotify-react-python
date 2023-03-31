import React from 'react';

const BackwardNav = ({size}) => {
    
    const fill = 'white';
    return(
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="black"/>
            <path d="M19.7397 8.23887C19.3926 7.92038 18.83 7.92038 18.4829 8.23887L11.2806 14.8471L11.2567 14.8252L10 15.9781L10.0239 16L10 16.0219L11.2567 17.1752L11.2807 17.1533L18.4829 23.7611C18.8299 24.0796 19.3926 24.0796 19.7396 23.7611C19.9638 23.5553 20.0433 23.2671 19.9778 23.0031C19.9419 22.8586 19.8625 22.7209 19.7396 22.6082L12.5374 16L19.7397 9.39179C20.0868 9.0737 20.0868 8.55735 19.7397 8.23887Z" fill={fill}/>
        </svg>
    )
}

export default BackwardNav


