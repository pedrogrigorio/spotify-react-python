import convertTime from "./convertTime"

export default function getMeanDuration(data) {

    let duration = 0
    data.songs.map(song => {
        duration += song.duration
    })

    let duration_converted = convertTime(duration).split(":")
    console.log(duration_converted)

    if (duration_converted.length == 2) {
        return `${duration_converted[0]}min ${duration_converted[1]} s`
    }
    else if (duration_converted.length == 3) {
        if (duration_converted[1] < '15') {
            return `cerca de ${duration_converted[0]}h`
        }
        else if (duration_converted[1] < '45') {
            return `cerca de ${duration_converted[0]}h 30min`
        }
        else if (duration_converted[1] < '60') {
            return`cerca de ${+duration_converted[0]+1}h`
        }
    }
}