import React from 'react'

import Layout from '../components/Layout'
import ArticleBody from '../components/ArticleBody'
import BreadCrumbList from '../components/BreadCrumbList'
import SEO from '../components/SEO'

const StaticPage = ({ data }) => {
  const { fields, frontmatter } = data.markdownRemark
  return (
    <Layout>
      <SEO 
        title={frontmatter.title}
        description={frontmatter.description}
      />
      <div className="is-flex is-flex-dir-column has-flex-item-centered">
        <article className="article">
          <header>
            <BreadCrumbList
              items={[
                { label: 'トップ', to: '/' },
                { label: frontmatter.title, to: fields.slug },
              ]}
            />
            <h1 className="title">
              { frontmatter.title }
            </h1>
          </header>
          <ArticleBody html={data.markdownRemark.html} />
        </article>
        <footer>
          <hr />
        </footer>
      </div>
    </Layout>
  )
}

export default StaticPage

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      html
      frontmatter {
        title
        description
      }
    }
  }
`