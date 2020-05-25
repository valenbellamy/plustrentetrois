import React, { useState, useEffect, useLayoutEffect, Fragment } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Anim from "../components/Anim"

export const query = graphql`
  query {
    allContentfulProjet(
      filter: { isHomepage: { eq: true } }
      sort: { fields: ordre, order: DESC }
    ) {
      edges {
        node {
          titre
          id
          couverture {
            fluid(quality: 90) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
            description
          }
          couverturePortrait {
            fluid(quality: 90) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
            description
          }
          slug
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  const [nocursor, setNoCursor] = useState(false)
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)
  const [cursorText, setCursorText] = useState("")
  const [mobile, setMobile] = useState(false)
  const [width, setWidth] = useState(null)
  const [play, setPlay] = useState(false) // to avoid e.Client issue ...
  const [loadingIndicator, setLoadingIndicator] = useState(false)
  const [cssClass, setCssClass] = useState("project-home")

  useEffect(() => {
    setLoadingIndicator(localStorage.getItem("loader"))
    if (loadingIndicator === null) {
      setCssClass("project-home --visible")
      setPlay(true)
    } else {
      const timer = setTimeout(() => {
        localStorage.removeItem("loader")
        setCssClass("project-home --play")
        setPlay(true)
      }, 2200)
      return () => clearTimeout(timer)
    }
  }, [loadingIndicator])

  useEffect(() => {
    var device = navigator.userAgent.match(
      /(iPhone|iPod|iPad|Android|BlackBerry)/
    )
    setMobile(device !== null ? true : false)
    if (document.body.classList.contains("--hidden")) {
      document.body.classList.remove("--hidden")
    }
  }, [])

  // useEffect(() => {
  //   const timer = setTimeout(() => setPlay(true), 2200)
  //   return () => clearTimeout(timer)
  // }, [])

  useLayoutEffect(() => {
    computeWidth()
    window.addEventListener("resize", computeWidth)
    return () => window.removeEventListener("resize", computeWidth)
  }, [])

  const computeWidth = () => {
    let windowWidth = window.innerWidth
    setWidth(windowWidth)
  }

  const initCursor = (e, title) => {
    setNoCursor(nocursor => !nocursor)
    setCursorText(title)
    const targetX = e.clientX + 10
    const targetY = e.clientY
    setX(targetX)
    setY(targetY)
  }

  const setCursor = e => {
    const targetX = e.clientX + 10
    const targetY = e.clientY
    setX(targetX)
    setY(targetY)
  }

  const deleteCursor = () => {
    setNoCursor(nocursor => !nocursor)
    setX(null)
    setY(null)
  }

  return (
    <Layout cursor={nocursor} anim={true}>
      <SEO title="Home" />
      <Anim loading={loadingIndicator} />
      <section
        className={cssClass}
        // className={`project-home ${play ? "--play" : ""}`}
        // style={{
        //   transition: `opacity ${loadingIndicator === true ? "1" : "0"}s`,
        // }}
      >
        <div
          className={`cursor ${nocursor ? "--active" : ""}`}
          style={{ transform: `translate(${x}px, ${y}px)` }}
        >
          {cursorText}
        </div>
        {data.allContentfulProjet.edges.map(projet => (
          <Fragment key={projet.node.id}>
            {width < 992 ? (
              <Fragment>
                {projet.node.couverturePortrait && (
                  <Link
                    to={`/project/${projet.node.slug}`}
                    className="project__img"
                    aria-label={`${projet.node.titre}`}
                  >
                    <Img
                      fluid={projet.node.couverturePortrait.fluid}
                      alt={projet.node.couverturePortrait.description}
                    />
                  </Link>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {projet.node.couverture && (
                  <Link
                    key={projet.node.id}
                    to={`/project/${projet.node.slug}`}
                    aria-label={`${projet.node.titre}`}
                    onMouseEnter={e => {
                      if (!mobile && play) {
                        initCursor(e, `${projet.node.titre}`)
                      }
                    }}
                    onMouseMove={e => {
                      if (!mobile && play) {
                        e.persist()
                        setCursor(e)
                      }
                    }}
                    onMouseLeave={() => {
                      if (!mobile && play) {
                        deleteCursor()
                      }
                    }}
                    className="project__img"
                  >
                    <Img
                      fluid={projet.node.couverture.fluid}
                      alt={projet.node.couverture.description}
                    />
                  </Link>
                )}
              </Fragment>
            )}
          </Fragment>
        ))}
      </section>
    </Layout>
  )
}

export default IndexPage
