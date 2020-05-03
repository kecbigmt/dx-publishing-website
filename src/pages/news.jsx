import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import NewsList from '../components/NewsList'
import LatestTopic from '../components/LatestTopic'
import { NewsListLink } from '../components/Button'

const NewsPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="お知らせ" />
      <main>
        <div className="container">
          <section className="section">
            <h1 className="title">
              お知らせ
            </h1>
            <NewsList items={posts.map(post => ({
              id: post.node.id,
              title: post.node.frontmatter.title,
              date: post.node.frontmatter.date,
              excerpt: post.node.excerpt,
              thumbnailImageFile: post.node.frontmatter.featuredImage.childImageSharp.fixed,
              thumbnailImageAlt: post.node.frontmatter.featuredImageAlt,
              to: `/news/${post.node.frontmatter.slug}/`,
            }))} />
          </section>
        </div>
      </main>
    </Layout>
  )
}

export const pageQuery = graphql`
  query NewsPageQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date]}
      filter: { frontmatter: { templateKey: { eq: "news" } } }
      limit: 50
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            slug
            title
            date
            featuredImage {
              childImageSharp {
                fixed(width: 80, height: 80) {
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
