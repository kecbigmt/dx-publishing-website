import React from 'react'
import Img from 'gatsby-image'

import SEO from "../components/seo"
import Layout from '../components/Layout'
import BreadCrumbList from '../components/BreadCrumbList'
import ArticleBody from '../components/ArticleBody'

const ProductItem = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds post data
  const { fields, frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
      />
      <div className="is-flex is-flex-dir-column has-flex-item-centered">
        <article className="article">
          <header>
            <BreadCrumbList
              items={[
                { label: 'トップ', to: '/' },
                { label: '本の紹介', to: '/products' },
                { label: frontmatter.title, to: fields.slug },
              ]}
            />
            <h1 className="title">
              { frontmatter.title }
            </h1>
          </header>
          {
            frontmatter.featuredImage && 
              <Img fixed={frontmatter.featuredImage.childImageSharp.fixed} alt={frontmatter.featuredImageAlt} />
          }
          <ArticleBody html={html} />
          <footer>
            <hr />
          </footer>
        </article>
      </div>
    </Layout>
  )
}

export default ProductItem

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        featuredImage {
          childImageSharp {
            fixed(width: 680) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        featuredImageAlt
        books {
          title
          description
          meta
          purchaseUrl
        }
      }
    }
  }
`

/**
 * 
 *         <ul>
        {
          allFile.edges.map(edge => (
            <li key={edge.node.frontmatter.title}>{edge.node.frontmatter.title}</li>
          ))
        }
        </ul>
    allFile(filter: { frontmatter: { productId: { eq: $slug } } }) {
        edges {
          node {
            frontmatter {
              title
            }
          }
        }
      }
 */