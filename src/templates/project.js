import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Menu from "../components/Menu"
import Slider from "../components/Slider"
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

const ProjectPage = ({ data }) => {
  const [desktop, setDesktop] = useState(true)

  useEffect(() => {
    if (typeof window.orientation !== "undefined") {
      setDesktop(false)
    }
  }, [])

  return (
    <Layout>
      <SEO title="Acronyme" />
      <section className={`project ${desktop ? "" : "--not-desktop"}`}>
        <div className="project__info">
          <h1>{data.contentfulProjet.titre}</h1>
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
        <Slider data={data.contentfulProjet.slider} desktop={desktop} />
        <Menu />
      </section>
    </Layout>
  )
}

export default ProjectPage
