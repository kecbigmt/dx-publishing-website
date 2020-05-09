import React from "react"
import { graphql } from 'gatsby'

import PageLayout from '../components/PageLayout'
import PageHeader from '../components/PageHeader'
import ArticleList from '../components/ArticleList'

const NewsPage = ({ data, pageContext }) => {
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
      />
      <ArticleList items={posts.map(post => ({
        id: post.node.id,
        title: post.node.frontmatter.title,
        excerpt: post.node.excerpt,
        date: post.node.frontmatter.date,
        imageFile: post.node.frontmatter.featuredImage.childImageSharp.fixed,
        imageAlt: post.node.frontmatter.featuredImageAlt,
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
      filter: { frontmatter: { templateKey: { eq: "news-post" } } }
      limit: 50
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            featuredImage {
              childImageSharp {
                fixed(width: 120, height: 120) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            featuredImageAlt
          }
        }
      }
    }
  }
`

export default NewsPage
