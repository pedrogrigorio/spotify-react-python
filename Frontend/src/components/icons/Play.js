
import { useState } from 'react';

const Play = ({size, active}) => {

    const fill = "#bababa"

    return(
        <div>
            {active ? (
                <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 1C3.22386 1 3 1.22386 3 1.5V18.5635C3 18.8396 3.22386 19.0635 3.5 19.0635H6.5C6.77614 19.0635 7 18.8396 7 18.5635V1.5C7 1.22386 6.77614 1 6.5 1H3.5ZM13.5718 1C13.2956 1 13.0718 1.22386 13.0718 1.5V18.5635C13.0718 18.8396 13.2956 19.0635 13.5718 19.0635H16.5718C16.8479 19.0635 17.0718 18.8396 17.0718 18.5635V1.5C17.0718 1.22386 16.8479 1 16.5718 1H13.5718Z" fill={fill}/>
                </svg>
            ) : (
                <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4987 10.8514C17.1325 10.4608 17.1325 9.53936 16.4987 9.14876L3.52467 1.15268C2.85842 0.742063 2 1.22137 2 2.00399V17.9961C2 18.7788 2.85842 19.2581 3.52467 18.8474L16.4987 10.8514Z" fill={fill}/>
                </svg>
            )} 
        </div>
    )
}

export default Play