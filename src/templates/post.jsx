import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import BreadCrumbList from '../components/BreadCrumbList'
import NewsHeader from '../components/NewsHeader'

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <BreadCrumbList
        items={[
          { label: 'トップ', to: '/' },
          { label: 'ニュース', to: '/news' },
          { label: frontmatter.title, to: '/news/my-first-post' },
        ]}
      />
      <article className="blog-post">
        <NewsHeader title={frontmatter.title} date={frontmatter.date} />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        >
        </div>
      </article>
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