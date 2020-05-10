import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import PageLayout from '../components/PageLayout'
import PageHeader from '../components/PageHeader'
import ArticleBody from '../components/ArticleBody'

const NewsPost = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds post data
  const { fields, html } = markdownRemark
  return (
    <PageLayout
      title={fields.frontmatter.title}
      description={fields.frontmatter.description}
      ogpImage={fields.frontmatter.featuredImage.childImageSharp.fluid.src}
      breadcrumbs={pageContext.breadcrumbs}
    >
      <article className="box article">
        <PageHeader
          title={fields.frontmatter.title}
          subtitle={new Date(fields.frontmatter.date).toLocaleDateString()}
        />
        {
          fields.frontmatter.featuredImage && 
          <figure className="image article-featured-image">
            <Img fluid={fields.frontmatter.featuredImage.childImageSharp.fluid} alt={fields.frontmatter.featuredImageAlt} />
          </figure>
        }
        <ArticleBody html={html} />
      </article>
    </PageLayout>
  )
}

export default NewsPost

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
        frontmatter {
          date
          title
          description
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          featuredImageAlt
        }
      }
    }
  }
`