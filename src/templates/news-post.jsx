import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import SEO from "../components/seo"
import Layout from '../components/Layout'
import BreadCrumbList from '../components/BreadCrumbList'
import ArticleBody from '../components/ArticleBody'

const NewsPost = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
      />
      <div className="is-flex is-flex-dir-column has-flex-item-centered">
        <article className="article">
        <header className="news-header">
            <BreadCrumbList
              items={[
                { label: 'トップ', to: '/' },
                { label: 'ニュース', to: '/news' },
                { label: frontmatter.title, to: '/news/my-first-post' },
              ]}
            />
            <h1 className="title">
              { frontmatter.title }
            </h1>
            <p className="subtitle">
              { new Date(frontmatter.date).toLocaleDateString() }
            </p>
          </header>
          {
            frontmatter.featuredImage && 
              <Img fixed={frontmatter.featuredImage.childImageSharp.fixed} alt={frontmatter.featuredImageAlt} />
          }
          <ArticleBody html={html} />
          <footer className="news-footer">
            <hr />
          </footer>
        </article>
      </div>
    </Layout>
  )
}

export default NewsPost

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date
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
      }
    }
  }
`