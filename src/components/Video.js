import React, { useRef, useState } from "react"

const Video = ({ video, poster }) => {
  const [play, setPlay] = useState(false)
  const videoEl = useRef(null)

  return (
    <>
      <video playsInline loop muted poster={poster.fluid.src} ref={videoEl}>
        <source src={video.file.url} type={video.file.contentType} />
        <p>Sorry, the video can't be displayed with your browser.</p>
      </video>
      <button
        onClick={() => {
          videoEl.current.play()
          setPlay(true)
        }}
        type="button"
        className={!play ? "--visible" : ""}
      >
        Play
      </button>
      <button
        onClick={() => {
          videoEl.current.pause()
          setPlay(false)
        }}
        type="button"
        className={play ? "--visible" : ""}
      >
        Pause
      </button>
    </>
  )
}

export default Video
