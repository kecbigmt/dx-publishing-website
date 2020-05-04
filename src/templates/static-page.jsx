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
      hero={
        fields.frontmatter.coverImage &&
        <section 
          className="hero with-background-image is-medium" 
          style={{
            backgroundImage: `url(${fields.frontmatter.coverImage.childImageSharp.fluid.src})`,
          }}>
          <div className="hero-body">
            <div className="container">
              <p className="title is-1">{ fields.frontmatter.title }</p>
            </div>
          </div>
        </section>
      }
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
          coverImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      html
    }
  }
`