import React from 'react'
import { graphql } from 'gatsby'

import PageLayout from '../components/PageLayout'
import PageHeader from '../components/PageHeader'
import ProductList from '../components/ProductList'

const ProductsPage = ({ data, pageContext }) => {
  const { fields } = data.markdownRemark
  const { edges: posts } = data.allMarkdownRemark
  return (
    <PageLayout
      title={fields.frontmatter.title}
      description={fields.frontmatter.description}
      breadcrumbs={pageContext.breadcrumbs}
    >
      <PageHeader
        title={fields.frontmatter.title}
        breadcrumbs={[
          { label: 'トップ', to: '/' },
          { label: '本の紹介', to: '/products' },
        ]}
      />
      <ProductList items={posts.map(post => ({
        id: post.node.id,
        title: post.node.fields.frontmatter.title,
        description: post.node.fields.frontmatter.description,
        imageFile: post.node.fields.frontmatter.coverImage.childImageSharp.fixed,
        imageAlt: post.node.fields.frontmatter.title,
        to: post.node.fields.slug,
      }))} />
    </PageLayout>
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
                  fixed(width: 120, height: 120) {
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
