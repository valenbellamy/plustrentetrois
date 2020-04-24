import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "../static/fonts/fonts.css"
import "../static/style/index.scss"

const Layout = ({ children, inverse, cursor, anim }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      className={`site ${cursor ? "--no-cursor" : ""} ${
        inverse ? "--inverse" : ""
      }`}
    >
      <Header inverse={inverse} anim={anim} />
      <div>
        <main>{children}</main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  inverse: PropTypes.bool,
  cursor: PropTypes.bool,
  ainm: PropTypes.bool,
}

Header.defaultProps = {
  inverse: false,
  cursor: false,
  anim: false,
}

export default Layout
