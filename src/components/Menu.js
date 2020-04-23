import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Menu = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulProjet(sort: { fields: ordre, order: DESC }) {
        edges {
          node {
            titre
            id
            slug
          }
        }
      }
    }
  `)

  return (
    <div className="project__footer">
      <span>projects: </span>
      <ul>
        {data.allContentfulProjet.edges.map(projet => (
          <li key={projet.node.id}>
            <Link
              activeClassName="--active"
              to={`/project/${projet.node.slug}`}
            >
              <h3>{projet.node.titre}</h3>
            </Link>
            <span>/</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Menu
