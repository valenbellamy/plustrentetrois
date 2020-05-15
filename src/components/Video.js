import React, { useRef, useState } from "react"

const Video = ({ video, poster }) => {
  const [play, setPlay] = useState(false)
  const videoEl = useRef(null)

  return (
    <>
      <video
        playsInline
        loop
        muted
        poster={poster ? poster.fluid.src : ""}
        ref={videoEl}
      >
        <source src={video.file.url} type={video.file.contentType} />
        <p>Sorry, the video can't be displayed with your browser.</p>
      </video>
      <button
        onClick={() => {
          videoEl.current.play()
          setPlay(true)
        }}
        type="button"
        className={`play ${!play ? "--visible" : ""}`}
      >
        <svg
          version="1.1"
          id="Calque_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 100 125"
        >
          <path
            d="M49.8,21.2C27,21.2,8.5,39.7,8.5,62.5s18.5,41.3,41.3,41.3s41.3-18.5,41.3-41.3C91.2,39.7,72.7,21.2,49.8,21.2
	C49.9,21.2,49.9,21.2,49.8,21.2z M39.7,80.5V44.5l29.4,18L39.7,80.5z"
          />
        </svg>
      </button>
      <button
        onClick={() => {
          videoEl.current.pause()
          setPlay(false)
        }}
        type="button"
        className={`pause ${play ? "--visible" : ""}`}
      >
        <svg
          version="1.1"
          id="Calque_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 95 118.8"
        >
          <path
            d="M47.5,17.5c-23.2,0-42,18.8-42,42s18.8,42,42,42s42-18.8,42-42S70.7,17.5,47.5,17.5z M44.3,81.6h-12V37.4h12V81.6z
	 M62.8,81.6h-12V37.4h12V81.6z"
          />
        </svg>
      </button>
    </>
  )
}

export default Video
