import React, { useState, useEffect, useLayoutEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Menu from "../components/Menu"
import Slider from "../components/Slider"
import Slider2 from "../components/Slider2"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    contentfulProjet(slug: { eq: $slug }) {
      titre
      description {
        description
      }
      date
      categorie
      slider {
        id
        description
        fluid {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
    }
  }
`

const ProjectPage = ({ data, pageContext }) => {
  const [desktop, setDesktop] = useState(true)

  useEffect(() => {
    var device = navigator.userAgent.match(
      /(iPhone|iPod|iPad|Android|BlackBerry)/
    )
    setDesktop(device !== null ? false : true)
    if (desktop) {
      document.body.classList.add("--hidden")
    } else {
      document.body.classList.remove("--hidden")
    }
  }, [desktop])

  useLayoutEffect(() => {
    bodyClass()
    window.addEventListener("resize", bodyClass)
    return () => window.removeEventListener("resize", bodyClass)
  }, [])

  const bodyClass = () => {
    if (window.innerWidth < 768) {
      document.body.classList.remove("--hidden")
    } else {
      document.body.classList.add("--hidden")
    }
  }

  return (
    <Layout>
      <SEO title={pageContext.titre} />
      <section className={`project ${desktop ? "" : "--not-desktop"}`}>
        <div className="project__info">
          <h1>{data.contentfulProjet.titre}</h1>
          <div>
            <h2>{data.contentfulProjet.categorie}</h2>
            {/* <ul>
            <li>
              <h2>{data.contentfulProjet.categorie}</h2>
            </li>
            <li>
              <h2>Categorie 2</h2>
            </li>
          </ul> */}
            <p>{data.contentfulProjet.description.description}</p>
            <span>{data.contentfulProjet.date}</span>
          </div>
        </div>
        <Slider2 data={data.contentfulProjet.slider} desktop={desktop} />
        <Menu />
      </section>
    </Layout>
  )
}

export default ProjectPage
