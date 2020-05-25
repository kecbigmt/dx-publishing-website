import React from 'react'
import { graphql } from 'gatsby'

import PageLayout from '../components/PageLayout'
import ArticleList from '../components/ArticleList'

const ProductsPage = ({ data, pageContext }) => {
  const { fields } = data.markdownRemark
  const { edges: posts } = data.allMarkdownRemark
  return (
    <PageLayout
      title={fields.frontmatter.title}
      description={fields.frontmatter.description}
      breadcrumbs={pageContext.breadcrumbs}
      localeSet={pageContext.localeSet}
    >
      <div className="container">
        <h1 className="title has-text-centered">
          {fields.frontmatter.title}
        </h1>
        <ArticleList items={posts.map(post => ({
          id: post.node.id,
          title: post.node.fields.frontmatter.title,
          excerpt: post.node.excerpt,
          imageFile: post.node.fields.frontmatter.thumbnailImage && post.node.fields.frontmatter.thumbnailImage.childImageSharp.fixed,
          imageAlt: post.node.fields.frontmatter.thumbnailImageAlt,
          to: post.node.fields.slug,
        }))} />
      </div>
    </PageLayout>
  )
}

export const pageQuery = graphql`
  query($id: String!, $localeRegex: String!) {
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
      filter: { fileAbsolutePath: { regex: $localeRegex }, frontmatter: { templateKey: { eq: "product-item" } } }
      limit: 50
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            slug
            frontmatter {
              title
              description
              thumbnailImage {
                childImageSharp {
                  fixed(width: 120, height: 120) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
              thumbnailImageAlt
            }
          }
        }
      }
    }
  }
`

export default ProductsPage
