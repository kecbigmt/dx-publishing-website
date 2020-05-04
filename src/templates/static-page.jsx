import React from 'react'
import { graphql } from 'gatsby'

import PageLayout from '../components/PageLayout'
import ArticleBody from '../components/ArticleBody'
import PageHeader from '../components/PageHeader'

const StaticPage = ({ data, pageContext }) => {
  const { fields } = data.markdownRemark
  return (
    <PageLayout
      title={fields.frontmatter.title}
      description={fields.frontmatter.description}
      breadcrumbs={pageContext.breadcrumbs}
    >
      <article className="article">
        <PageHeader
          title={fields.frontmatter.title}
        />
        <ArticleBody html={data.markdownRemark.html} />
      </article>
      <footer>
        <hr />
      </footer>
    </PageLayout>
  )
}

export default StaticPage

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
      html
    }
  }
`