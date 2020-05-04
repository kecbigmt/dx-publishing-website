import React from 'react'
import { graphql } from 'gatsby'

import PageLayout from '../components/PageLayout'
import PageHeader from '../components/PageHeader'
import ArticleBody from '../components/ArticleBody'
import BookList from '../components/BookList'

const ProductItem = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds post data
  const { fields, html } = markdownRemark
  return (
    <PageLayout
      title={fields.frontmatter.title}
      description={fields.frontmatter.description}
      breadcrumbs={pageContext.breadcrumbs}
    >
      <article className="article">
        <PageHeader
          title={fields.frontmatter.title}
          breadcrumbs={[
            { label: 'トップ', to: '/' },
            { label: '本の紹介', to: '/products' },
            { label: fields.frontmatter.title, to: fields.slug },
          ]}
        />
        <ArticleBody html={html} />
        <h2 className="title">
          書誌情報・通販
            </h2>
        <BookList
          items={fields.frontmatter.books.map(book => ({
            title: book.title,
            description: book.description,
            meta: book.meta,
            url: book.purchaseUrl,
            imageFile: book.image.childImageSharp.fixed,
            imageAlt: book.title,
          }))}
        />
        <footer>
          <hr />
        </footer>
      </article>
    </PageLayout>
  )
}

export default ProductItem

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
        frontmatter {
          title
          description
          books {
            title
            description
            meta
            purchaseUrl
            image {
              childImageSharp {
                fixed(width: 150, height: 212) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          coverImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
