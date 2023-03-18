import { forwardRef } from "react"

const Audio = forwardRef((props,ref) => {
    return (
        <audio
            ref={ref}
            onLoadedMetadata={(e) => props.handleDuration(e.target.duration)}
            onTimeUpdate={(e) => props.handleCurrentTime(e.target.currentTime)}
            src={props.trackData}
        />
    )
})

export default Audio