import React, { useRef, useEffect, useState } from "react"
import Img from "gatsby-image"
import { useWheel } from "react-use-gesture"
import { animated, useSpring } from "react-spring"

const Slider = ({ data, desktop }) => {
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const [windowWidth, setWindowWidth] = useState(null)

  const sliderRef = useRef(null)

  const [{ x, arrowOpacityLeft, arrowOpacityRight }, set] = useSpring(() => ({
    x: 0,
    arrowOpacityLeft: 0,
    arrowOpacityRight: 1,
  }))

  useEffect(() => {
    if (!desktop) {
      //setSlideWidth(window.innerWidth - 0)
    } else {
      computeSize()
      window.addEventListener("resize", computeSize)
      return () => window.removeEventListener("resize", computeSize)
    }
  }, [desktop])

  const computeSize = () => {
    let sliderHeight = sliderRef.current.clientHeight
    setHeight(sliderHeight)
    let currentWindowWidth = window.innerWidth
    setWindowWidth(currentWindowWidth)
    let acc = 0
    data.map(photo => {
      var currentWidth = photo.fluid.aspectRatio * sliderHeight
      return (acc += currentWidth)
    })
    acc += (data.length - 1) * 5
    setWidth(Math.floor(acc))
  }

  const isFirefox = useRef(typeof InstallTrigger !== "undefined")
  let wheelOffset = useRef(0)
  let opacityLeft
  let opacityRight
  const bind = useWheel(
    ({ delta: [, dy] }) => {
      if (desktop) {
        if (isFirefox.current) {
          dy *= 20
        }
        computeX(dy)
      }
    },
    {
      domTarget: sliderRef,
      eventOptions: { passive: false },
    }
  )

  const slideLeft = () => {
    computeX(-500)
  }

  const slideRight = () => {
    computeX(500)
  }

  const computeX = delta => {
    wheelOffset.current -= delta
    if (wheelOffset.current > 0) {
      wheelOffset.current = 0
    }
    if (wheelOffset.current < -(width - windowWidth)) {
      wheelOffset.current = -(width - windowWidth)
    }
    opacityLeft = -wheelOffset.current / 400
    if (opacityLeft > 1) {
      opacityLeft = 1
    }
    opacityRight = 1 + wheelOffset.current / (width - windowWidth)
    if (opacityRight < 0) {
      opacityRight = 0
    }
    set({
      x: wheelOffset.current,
      arrowOpacityLeft: opacityLeft,
      arrowOpacityRight: opacityRight,
    })
  }

  useEffect(bind, [bind])

  return (
    <animated.div className="slider" ref={sliderRef}>
      <animated.div
        className="slider__inner"
        style={{
          transform: x.interpolate(x => `translateX(${x}px)`),
        }}
      >
        {data.map(photo => (
          <div
            className="slider__item"
            key={photo.id}
            style={{
              width: `${height * photo.fluid.aspectRatio}px`,
            }}
          >
            <Img
              fluid={photo.fluid}
              alt={photo.description}
              backgroundColor="#c08081"
            />
          </div>
        ))}
      </animated.div>
      <animated.button
        className={`arrow arrow--left ${desktop ? "" : "--hidden"}`}
        style={{ opacity: arrowOpacityLeft }}
        aria-label="Slide left"
        type="button"
        onClick={() => slideLeft()}
      >
        <svg
          width="118"
          height="119"
          viewBox="0 0 118 119"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 61.3897V57.5082H110.631L55.8786 2.55365L58.6418 0L118 59.6532L58.4371 119L55.8786 116.242L110.631 61.3897H0Z"
            fill="black"
            stroke="black"
          />
        </svg>
      </animated.button>
      <animated.button
        className={`arrow arrow--right ${desktop ? "" : "--hidden"}`}
        style={{ opacity: arrowOpacityRight }}
        aria-label="Slide right"
        type="button"
        onClick={() => slideRight()}
      >
        <svg
          width="118"
          height="119"
          viewBox="0 0 118 119"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 61.3897V57.5082H110.631L55.8786 2.55365L58.6418 0L118 59.6532L58.4371 119L55.8786 116.242L110.631 61.3897H0Z"
            fill="black"
            stroke="black"
          />
        </svg>
      </animated.button>
    </animated.div>
  )
}

export default Slider
