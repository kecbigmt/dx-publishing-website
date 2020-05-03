import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import BreadCrumbList from '../components/BreadCrumbList'

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <div className="blog-post">
        <BreadCrumbList
          items={[
            { label: 'トップ', to: '/' },
            { label: 'ニュース', to: '/news' },
            { label: frontmatter.title, to: '/news/my-first-post' },
          ]}
        />
        <h1>{ frontmatter.title }</h1>
        <h2>{ frontmatter.date }</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        >
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`