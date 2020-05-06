import React, { useEffect } from "react"
import anime from "animejs/lib/anime.es.js"

const Anim = ({ loading }) => {
  useEffect(() => {
    if (loading === null) {
      noAnim()
    } else {
      const timer = setTimeout(() => anim(), 20)
      return () => clearTimeout(timer)
    }
  }, [loading])

  const noAnim = () => {
    if (window.innerWidth > 767) {
      anime
        .timeline()
        .add({
          targets: "h1",
          opacity: [0, 1],
          easing: "linear",
          duration: 0,
          loop: false,
        })
        .add({
          targets: "h1 span",
          opacity: [0, 1],
          easing: "linear",
          duration: 0,
          loop: false,
        })
    } else {
      anime
        .timeline()
        .add({
          targets: "h1",
          opacity: [0, 1],
          easing: "linear",
          duration: 0,
          loop: false,
        })
        .add({
          targets: "h1 div",
          opacity: [0, 1],
          easing: "linear",
          duration: 0,
          loop: false,
        })
    }
  }

  const anim = () => {
    if (window.innerWidth > 767) {
      anime
        .timeline()
        .add({
          targets: ".path",
          opacity: [0, 1],

          easing: "easeInOutQuad",
          duration: 600,
          delay: anime.stagger(150),
          loop: false,
        })
        .add(
          {
            targets: ".path",
            opacity: [1, 0],
            easing: "easeOutExpo",
            duration: 600,
            delay: anime.stagger(150),
            loop: false,
          },
          "+=300"
        )
        .add(
          {
            targets: "h1",
            opacity: [0, 1],
            easing: "linear",
            duration: 0,
            loop: false,
          },
          "-=600"
        )
        .add(
          {
            targets: "h1 span",
            opacity: [0, 1],
            easing: "linear",
            duration: 300,
            delay: anime.stagger(80),
            loop: false,
          },
          "-=600"
        )
    } else {
      anime
        .timeline()
        .add({
          targets: ".path",
          opacity: [0, 1],
          // scale: [0.9, 1],
          easing: "easeInOutQuad",
          duration: 600,
          delay: anime.stagger(150),
          loop: false,
        })
        .add(
          {
            targets: ".path",
            opacity: 0,
            easing: "easeOutExpo",
            duration: 600,
            delay: anime.stagger(150),
            loop: false,
          },
          "+=300"
        )
        .add(
          {
            targets: "h1",
            opacity: [0, 1],
            easing: "linear",
            duration: 0,
            loop: false,
          },
          "-=600"
        )
        .add(
          {
            targets: "h1 div",
            opacity: [0, 1],
            easing: "linear",
            duration: 600,
            loop: false,
          },
          "-=200"
        )
    }
  }
  return (
    <section className="anim">
      <div className="anim__logo">
        <svg
          version="1.1"
          id="Calque_2"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 503.63 120.04"
        >
          <g>
            <path
              className="path"
              d="M49.08,69.39H4V49.08h45.08V9.37h20.31v39.71h45.08v20.31H69.39v39.63H49.08V69.39z"
            />
            <path
              className="path"
              d="M236.23,43.21h-32.69c-0.06-3.96-0.08-6.41-0.08-7.35c0-10.24,1.82-17.53,5.45-21.88c3.25-3.91,8.12-6.63,14.61-8.17
		c8.75-2.14,25.95-3.22,51.6-3.22c17.12,0,29.03,0.47,35.75,1.41c7.43,0.99,12.99,2.97,16.68,5.94c3.58,2.81,5.86,6.3,6.85,10.49
		c1.05,4.18,1.57,8.75,1.57,13.7c0,7.27-1.02,12.61-3.06,16.02c-2.48,4.13-7.57,7.02-15.27,8.67c6.49,1.49,10.92,3.06,13.29,4.71
		c2.81,1.93,4.73,4.76,5.78,8.5c0.93,3.36,1.4,8.07,1.4,14.12c0,8.86-1.49,15.36-4.46,19.49c-3.03,4.13-7.79,7.07-14.28,8.83
		c-8.75,2.42-29.47,3.63-62.17,3.63c-13.05,0-22.65-0.52-28.81-1.57c-8.31-1.49-14.23-3.85-17.75-7.1
		c-3.47-3.19-5.61-7.51-6.44-12.96c-0.72-4.57-1.07-11.34-1.07-20.31h32.69c0.05,1.05,0.08,1.73,0.08,2.06
		c0.05,4.79,0.49,7.92,1.32,9.41c0.71,1.32,1.79,2.22,3.22,2.68c1.43,0.47,3.93,0.76,7.51,0.87c2.59,0.11,9.99,0.25,22.21,0.41
		c14.53-0.33,22.73-0.6,24.6-0.83c4.68-0.38,7.65-1.65,8.92-3.8c0.77-1.21,1.16-3.11,1.16-5.7c0-4.68-1.62-7.48-4.87-8.42
		c-2.64-0.77-10.76-1.15-24.36-1.15h-19.9V47.43h26.01c9.3,0,15.14-0.72,17.5-2.15c2.31-1.43,3.47-3.93,3.47-7.51
		c0-4.13-1.43-6.71-4.29-7.76c-2.81-0.99-11.2-1.49-25.18-1.49c-17.23,0-27.55,0.33-30.96,0.99c-3.3,0.61-5.17,2.42-5.61,5.45
		C236.53,35.57,236.39,38.32,236.23,43.21z"
            />
            <path
              className="path"
              d="M397.99,43.21H365.3c-0.06-3.96-0.08-6.41-0.08-7.35c0-10.24,1.82-17.53,5.45-21.88c3.25-3.91,8.12-6.63,14.61-8.17
		c8.75-2.14,25.95-3.22,51.6-3.22c17.12,0,29.03,0.47,35.75,1.41c7.43,0.99,12.99,2.97,16.68,5.94c3.58,2.81,5.86,6.3,6.85,10.49
		c1.05,4.18,1.57,8.75,1.57,13.7c0,7.27-1.02,12.61-3.06,16.02c-2.48,4.13-7.57,7.02-15.27,8.67c6.49,1.49,10.92,3.06,13.29,4.71
		c2.81,1.93,4.73,4.76,5.78,8.5c0.93,3.36,1.4,8.07,1.4,14.12c0,8.86-1.49,15.36-4.46,19.49c-3.03,4.13-7.79,7.07-14.28,8.83
		c-8.75,2.42-29.47,3.63-62.17,3.63c-13.05,0-22.65-0.52-28.81-1.57c-8.31-1.49-14.23-3.85-17.75-7.1
		c-3.47-3.19-5.61-7.51-6.44-12.96c-0.72-4.57-1.07-11.34-1.07-20.31h32.69c0.05,1.05,0.08,1.73,0.08,2.06
		c0.05,4.79,0.49,7.92,1.32,9.41c0.71,1.32,1.79,2.22,3.22,2.68c1.43,0.47,3.93,0.76,7.51,0.87c2.59,0.11,9.99,0.25,22.21,0.41
		c14.53-0.33,22.73-0.6,24.6-0.83c4.68-0.38,7.65-1.65,8.92-3.8c0.77-1.21,1.16-3.11,1.16-5.7c0-4.68-1.62-7.48-4.87-8.42
		c-2.64-0.77-10.76-1.15-24.36-1.15h-19.9V47.43h26.01c9.3,0,15.14-0.72,17.5-2.15c2.31-1.43,3.47-3.93,3.47-7.51
		c0-4.13-1.43-6.71-4.29-7.76c-2.81-0.99-11.2-1.49-25.18-1.49c-17.23,0-27.55,0.33-30.96,0.99c-3.3,0.61-5.17,2.42-5.61,5.45
		C398.3,35.57,398.16,38.32,397.99,43.21z"
            />
          </g>
        </svg>
      </div>
      <div className="anim__text">
        <h1>
          <span>Plus</span>
          <span>Trente</span>
          <span>Trois</span>
          <span>is</span>
          <span>a</span>
          <span>creative</span>
          <span>studio</span>
          <span>based</span>
          <span>in</span>
          <span>Paris,</span>
          <span>founded</span>
          <span>in</span>
          <span>2019.</span>
          <div>
            Trente Trois is a creative studio based in Paris, founded in 2019.
          </div>
        </h1>
      </div>
    </section>
  )
}

export default Anim
