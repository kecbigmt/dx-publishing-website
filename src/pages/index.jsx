import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import NewsList from '../components/NewsList'
import LatestTopic from '../components/LatestTopic'
import { NewsListLink } from '../components/Button'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Home" />
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <p className="title is-2">
              学びや探究に興味を持つ子どもたちのために
            </p>
            <p className="subtitle is-4">
            「創造的な学び」を子供たちにもたらすプログラミング学習用カードブックです。
            </p>
          </div>
        </div>
      </section>
      <main>
        <div className="container">
          <LatestTopic />
          <section className="section">
            <h1 className="title is-3">
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
            <footer className="section-footer">
              <NewsListLink color="primary" to="/news/" />
            </footer>
          </section>
        </div>
      </main>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date]}
      filter: { frontmatter: { templateKey: { eq: "news" } } }
      limit: 3
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

export default IndexPage
