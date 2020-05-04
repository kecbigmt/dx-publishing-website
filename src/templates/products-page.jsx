import React from 'react'
import { graphql } from 'gatsby'

import Layout from "../components/Layout"
import SEO from "../components/seo"
import ProductList from '../components/ProductList'

const ProductsPage = ({ data }) => {
  const { fields } = data.markdownRemark
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO
        title={ fields.frontmatter.title }
        description={ fields.frontmatter.description }
      />
      <main>
        <div className="container">
          <section className="section">
            <h1 className="title">
              { fields.frontmatter.title }
            </h1>
            <ProductList items={posts.map(post => ({
              id: post.node.id,
              title: post.node.fields.frontmatter.title,
              description: post.node.fields.frontmatter.description,
              imageFile: post.node.fields.frontmatter.coverImage.childImageSharp.fixed,
              imageAlt: post.node.fields.frontmatter.title,
              to: post.node.fields.slug,
            }))} />
          </section>
        </div>
      </main>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
        frontmatter {
          title
          description
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date]}
      filter: { frontmatter: { templateKey: { eq: "product-item" } } }
      limit: 50
    ) {
      edges {
        node {
          id
          fields {
            slug
            frontmatter {
              title
              description
              coverImage {
                childImageSharp {
                  fixed(width: 160, height: 160) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default ProductsPage
