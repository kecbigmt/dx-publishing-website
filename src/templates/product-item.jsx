import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import SEO from "../components/seo"
import Layout from '../components/Layout'
import BreadCrumbList from '../components/BreadCrumbList'
import ArticleBody from '../components/ArticleBody'
import BookList from '../components/BookList'

const ProductItem = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds post data
  const { fields, html } = markdownRemark
  const { slug, frontmatter } = fields
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
      />
      <section 
        className="hero with-background-image is-medium" 
        style={{
          backgroundImage: `url(${frontmatter.coverImage.childImageSharp.fluid.src})`,
        }}>
        <div className="hero-body">
          <div className="container">
            <p className="title is-2">本の紹介</p>
            <p className="subtitle is-4">{ frontmatter.title }</p>
          </div>
        </div>
      </section>
      <div className="is-flex is-flex-dir-column has-flex-item-centered">
        <article className="article">
          <header>
            <BreadCrumbList
              items={[
                { label: 'トップ', to: '/' },
                { label: '本の紹介', to: '/products' },
                { label: frontmatter.title, to: slug },
              ]}
            />
            <h1 className="title">
              { frontmatter.title }
            </h1>
          </header>
          <ArticleBody html={html} />
          <h2 className="title">
            書誌情報・通販
          </h2>
          <BookList 
            items={frontmatter.books.map(book => ({
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
      </div>
    </Layout>
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
