import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import SEO from "../components/seo"
import Layout from '../components/Layout'
import BreadCrumbList from '../components/BreadCrumbList'
import ArticleBody from '../components/ArticleBody'

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        // ogpImage={`https://dx-publishing.jp${frontmatter.featuredImage}`}
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
            data.file && 
              <Img fixed={data.file.childImageSharp.fixed} alt="featured" />
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

export const pageQuery = graphql`
  query($templateKey: String!, $slug: String!, $featuredImage: String!) {
    markdownRemark(frontmatter: {
      templateKey: { eq: $templateKey }
      slug: { eq: $slug }
    }) {
      html
      frontmatter {
        date
        title
        description
        featuredImage
      }
    }
    file(relativePath: { eq: $featuredImage }) {
      childImageSharp {
        fixed(width: 680) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`