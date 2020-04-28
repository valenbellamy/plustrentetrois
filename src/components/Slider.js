import React, { useRef, useEffect, useState } from "react"
import Img from "gatsby-image"
import { useWheel } from "react-use-gesture"

const Slider = ({ data, desktop }) => {
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const [windowWidth, setWindowWidth] = useState(null)
  const [x, setX] = useState(0)
  const [opacityLeft, setOpacityLeft] = useState(0)
  const [opacityRight, setOpacityRight] = useState(1)
  const sliderRef = useRef(null)

  useEffect(() => {
    if (!desktop) {
      //setSlideWidth(window.innerWidth - 0)
    } else {
      computeSize()
      window.addEventListener("resize", computeSize)
      return () => window.removeEventListener("resize", computeSize)
    }
  }, [])

  const computeSize = () => {
    let sliderHeight = sliderRef.current.clientHeight
    setHeight(sliderHeight)
    let currentWindowWidth = window.innerWidth
    setWindowWidth(currentWindowWidth)
    let acc = 0
    data.map(photo => {
      var currentWidth = photo.fluid.aspectRatio * sliderHeight
      acc += currentWidth
    })
    acc += (data.length - 1) * 5
    setWidth(Math.floor(acc))
  }

  const isFirefox = useRef(typeof InstallTrigger !== "undefined")
  let wheelOffset = useRef(0)
  let currentOpacityLeft
  let currentOpacityRight
  const bind = useWheel(
    ({ delta: [, dy] }) => {
      if (desktop) {
        if (isFirefox.current) {
          dy *= 20
        }
        wheelOffset.current -= dy
        if (wheelOffset.current > 0) {
          wheelOffset.current = 0
        }
        if (wheelOffset.current < -(width - windowWidth)) {
          wheelOffset.current = -(width - windowWidth)
        }
        currentOpacityLeft = -wheelOffset.current / 400
        if (currentOpacityLeft > 1) {
          currentOpacityLeft = 1
        }
        currentOpacityRight = 1 + wheelOffset.current / (width - windowWidth)
        if (currentOpacityRight < 0) {
          currentOpacityRight = 0
        }
        setX(wheelOffset.current)
        setOpacityLeft(currentOpacityLeft)
        setOpacityRight(currentOpacityRight)
      }
    },
    {
      domTarget: sliderRef,
      eventOptions: { passive: false },
    }
  )

  useEffect(bind, [bind])

  return (
    <div className="slider" ref={sliderRef}>
      <div
        className="slider__inner"
        style={{ transform: `translateX(${x}px)` }}
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
      </div>
      <div
        className={`arrow arrow--left ${desktop ? "" : "--hidden"}`}
        style={{ opacity: opacityLeft }}
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
      </div>
      <div
        className={`arrow arrow--right ${desktop ? "" : "--hidden"}`}
        style={{ opacity: opacityRight }}
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
      </div>
    </div>
  )
}

export default Slider
