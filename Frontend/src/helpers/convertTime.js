export default function convertTime(time) {

    if(!time && time !== 0){
      return
    }

    let ret;

    if (time >= 3600){
      ret = [0, 0, 0];

      ret = [
        ~~(time / 3600),      // Hours
        ~~(time % 3600 / 60), // Minutes.
        ~~(time % 60)         // Seconds.
      ];

      ret[1] = `${ret[1]}`.padStart(2, '0');
    }
    else {
      ret = [0, 0];

      ret = [
        ~~(time % 3600 / 60), // Minutes.
        ~~(time % 60)         // Seconds.
      ];
    }

    // Add paddings to the last element and convert to string.
    ret[ret.length - 1] = `${ret[ret.length - 1]}`.padStart(2, '0');
    return ret.join(':');
}