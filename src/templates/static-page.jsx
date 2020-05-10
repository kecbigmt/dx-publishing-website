import React from 'react'
import { graphql } from 'gatsby'

import PageLayout from '../components/PageLayout'
import PageCover from '../components/PageCover'
import ArticleBody from '../components/ArticleBody'
import PageHeader from '../components/PageHeader'

const StaticPage = ({ data, pageContext }) => {
  const { frontmatter } = data.markdownRemark
  const backgroundImageSrc = frontmatter.cover 
                              && frontmatter.cover.backgroundImage
                                && frontmatter.cover.backgroundImage.childImageSharp.fluid.src
  return (
    <PageLayout
      title={frontmatter.title}
      description={frontmatter.description}
      breadcrumbs={pageContext.breadcrumbs}
      hero={
        frontmatter.hasCover &&
        <PageCover
          title={frontmatter.title}
          subtitle={frontmatter.subtitle ? frontmatter.subtitle : undefined}
          backgroundType={backgroundImageSrc ? 'image-dark' : 'color'}
          backgroundColor={backgroundImageSrc === 'color' ? frontmatter.cover.backgroundColor : undefined}
          backgroundImageSrc={backgroundImageSrc}
        />
      }
    >
      <article className="box article">
        <PageHeader
          title={frontmatter.title}
        />
        <ArticleBody html={data.markdownRemark.html} />
      </article>
    </PageLayout>
  )
}

export default StaticPage

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        hasCover
        cover {
          backgroundImage {
            childImageSharp {
              fluid(maxWidth: 1920) {
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