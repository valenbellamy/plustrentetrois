import React, { useRef, useEffect, useLayoutEffect, useState } from "react"
import Img from "gatsby-image"
import { useWheel } from "react-use-gesture"
import { animated, interpolate, useSpring } from "react-spring"

const Slider = ({ data, desktop }) => {
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const [windowWidth, setWindowWidth] = useState(null)

  const sliderRef = useRef(null)

  const [{ x }, set] = useSpring(() => ({
    x: 0,
  }))

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
        set({
          x: wheelOffset.current,
        })
      }
    },
    {
      domTarget: sliderRef,
      eventOptions: { passive: false },
    }
  )

  useEffect(bind, [bind])

  return (
    <animated.div className="slider" ref={sliderRef}>
      <animated.div
        className="slider__inner"
        style={{
          transform: x.interpolate(x => `translate3d(${x}px, 0px, 0px)`),
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
    </animated.div>
  )
}

export default Slider
