import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query {
    allContentfulProjet(sort: { fields: ordre, order: DESC }) {
      edges {
        node {
          id
          titre
          photo {
            fluid(quality: 70) {
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

const ProjectsPage = ({ data }) => {
  useEffect(() => {
    if (document.body.classList.contains("--hidden")) {
      document.body.classList.remove("--hidden") // do some stuff
    }
  }, [])

  return (
    <Layout>
      <SEO title="Projects" />
      {/* <section className="projects">
        <ul className="project__list">
          {data.allContentfulProjet.edges.map(projet => (
            <li key={projet.node.id} className="project__item">
              <Link to={`/project/${projet.node.slug}`}>
                {projet.node.titre}
                <div className="project__img">
                  <Img
                    fluid={projet.node.photo.fluid}
                    alt={projet.node.photo.description}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section> */}
      <section className="projects">
        <div className="project__list">
          {data.allContentfulProjet.edges.map(projet => (
            <div key={projet.node.id} className="project__item">
              <Link to={`/project/${projet.node.slug}`}>
                <div className="project__img">
                  <Img
                    fluid={projet.node.photo.fluid}
                    alt={projet.node.photo.description}
                    backgroundColor="#c08081"
                  />
                </div>
                <h2>{projet.node.titre}</h2>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default ProjectsPage
