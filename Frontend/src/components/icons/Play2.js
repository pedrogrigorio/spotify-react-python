const Play2 = ({size, active, fill='#bababa'}) => {

    return(
        <>
            {active ? (
                <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 1C3.22386 1 3 1.22386 3 1.5V18.5635C3 18.8396 3.22386 19.0635 3.5 19.0635H6.5C6.77614 19.0635 7 18.8396 7 18.5635V1.5C7 1.22386 6.77614 1 6.5 1H3.5ZM13.5718 1C13.2956 1 13.0718 1.22386 13.0718 1.5V18.5635C13.0718 18.8396 13.2956 19.0635 13.5718 19.0635H16.5718C16.8479 19.0635 17.0718 18.8396 17.0718 18.5635V1.5C17.0718 1.22386 16.8479 1 16.5718 1H13.5718Z" fill={fill}/>
                </svg>
            ) : (
                <svg role="img" height={size} width={size} aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL">
                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" fill={fill}></path>
                </svg>
            )} 
        </>
    )
}

export default Play2