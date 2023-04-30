import React, { useState, useEffect } from 'react';
import styles from './Yotube.module.css'

/*global YT */
let player;
function YoutubeApi({youtubeRef, handleDuration, handleCurrentTime, trackData}) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
        player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: String(trackData),
      });
    }
  }, []);

  useEffect(()=> {
    handleCurrentTime(currentTime)
  },[currentTime])

  useEffect(() => {
    if (player) {
      youtubeRef(player)
      player.loadVideoById(String(trackData));
      player.playVideo();

      player.addEventListener('onStateChange', (event) => {
        if (event.data === YT.PlayerState.PLAYING) {
          handleDuration(player.getDuration());
          setInterval(() => {
            setCurrentTime(player.getCurrentTime())
          },1000)
        }
      });
    }

  }, [trackData])


  return (
    <>
    <div id='player' className={styles.hide}></div>
    </>
  );
}

export default YoutubeApi;