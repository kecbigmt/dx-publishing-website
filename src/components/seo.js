/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import DefaultOGPImage from '../images/ogp-image.png'

function SEO({ description, lang, meta, title, ogpImage }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const helmetTitle = title ? `${title} | ${site.siteMetadata.title}` : site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description
  const metaOgpImage = ogpImage || DefaultOGPImage

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={helmetTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: metaOgpImage,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        // TODO: Twitterアカウントを作ったときに追加
        /*
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        */
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO
