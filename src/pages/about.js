import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES } from "@contentful/rich-text-types"

export const query = graphql`
  query {
    contentfulAbout(titre: { eq: "About" }) {
      titre
      description {
        description
      }
      credits {
        json
      }
      contact {
        json
      }
      client {
        json
      }
    }
  }
`

const AboutPage = ({ data }) => {
  const description = data.contentfulAbout.description.description
  const credits = data.contentfulAbout.credits
  const contact = data.contentfulAbout.contact
  const client = data.contentfulAbout.client
  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: node => {
        return (
          <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
            {node.content[0].value}
          </a>
        )
      },
    },
  }
  return (
    <Layout inverse={true}>
      <SEO title="About" />
      <section className="about">
        <div className="content">{description}</div>
        <div className="about__footer">
          <div>{documentToReactComponents(contact.json, options)}</div>
          <div>{documentToReactComponents(client.json, options)}</div>
          <div>{documentToReactComponents(credits.json, options)}</div>
        </div>
      </section>
    </Layout>
  )
}

export default AboutPage
