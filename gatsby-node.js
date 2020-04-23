const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const projetTemplate = path.resolve("./src/templates/project.js")

  const res = await graphql(`
    query {
      allContentfulProjet(sort: { fields: ordre, order: DESC }) {
        edges {
          node {
            slug
            titre
          }
        }
      }
    }
  `)
  const projects = res.data.allContentfulProjet.edges
  projects.forEach((edge, index) => {
    createPage({
      component: projetTemplate,
      path: `/project/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
        titre: edge.node.titre,
      },
    })
  })
}
