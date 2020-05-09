import React from 'react'
import { graphql } from 'gatsby'

import PageLayout from '../components/PageLayout'
import PageCover from '../components/PageCover'
import PageHeader from '../components/PageHeader'
import ArticleBody from '../components/ArticleBody'
import BookList from '../components/BookList'

const ProductItem = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds post data
  const { fields, frontmatter, html } = markdownRemark
  const backgroundImageSrc = frontmatter.cover 
                              && frontmatter.cover.backgroundImage
                                && frontmatter.cover.backgroundImage.childImageSharp.fluid.src
  return (
    <PageLayout
      title={fields.frontmatter.title}
      description={fields.frontmatter.description}
      ogpImage={frontmatter.ogpImage.childImageSharp.fluid.src}
      breadcrumbs={pageContext.breadcrumbs}
      hero={
        frontmatter.hasCover &&
        <PageCover
          title="本の紹介"
          subtitle={frontmatter.title}
          backgroundType={backgroundImageSrc ? 'image-dark' : undefined}
          backgroundImageSrc={backgroundImageSrc}
        />
      }
    >
      <article className="article">
        <PageHeader
          title={fields.frontmatter.title}
        />
        <ArticleBody html={html} />
        <div className="content">
          <h2>
            書誌情報・通販
          </h2>
        </div>
        <BookList
          items={fields.frontmatter.books.map(book => ({
            title: book.title,
            description: book.description,
            meta: book.meta,
            url: book.purchaseUrl,
            altLabel: book.purchaseAltLabel,
            imageFile: book.image.childImageSharp.fixed,
            imageAlt: book.title,
          }))}
        />
        {
          fields.frontmatter.footnote &&
          <footer>
              <div className="content footnote" dangerouslySetInnerHTML={{ __html: fields.frontmatter.footnote }}/>
          </footer>
        }
      </article>
    </PageLayout>
  )
}

export default ProductItem

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
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
        ogpImage {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
        frontmatter {
          title
          description
          footnote
          books {
            title
            description
            meta
            purchaseUrl
            purchaseAltLabel
            image {
              childImageSharp {
                fixed(width: 150, height: 212) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
