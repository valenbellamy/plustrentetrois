import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export const query = graphql`
  query {
    allContentfulProjet(sort: { fields: ordre, order: DESC }) {
      edges {
        node {
          titre
          id
          couverture {
            fluid(quality: 70) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
            description
          }
          couverturePortrait {
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

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {data.allContentfulProjet.edges.map(projet => (
        <h2>{projet.node.titre}</h2>
      ))}
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
