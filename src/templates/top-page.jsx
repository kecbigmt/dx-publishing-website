import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import NewsList from '../components/NewsList'
import BookCarousel from '../components/BookCarousel'
import FeaturedTextList from '../components/FeaturedTextList'
import { MoreDetailLink } from '../components/Button'
import { NewsListLink } from '../components/Button'

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <p className="title is-2">{ frontmatter.catchCopy }</p>
            <p className="subtitle is-4">{ frontmatter.catchDescription }</p>
          </div>
        </div>
      </section>
      <main>
        <div className="container">
        <section className="section">
          <h1 className="title is-3">
            { frontmatter.featured.title }
          </h1>
          <p>{ frontmatter.featured.description }</p>
          <div className="is-flex is-flex-dir-column has-flex-item-centered">
            <BookCarousel
              items={frontmatter.featured.books.map(book => (
                { 
                  key: book.title, 
                  title: book.title,
                  imageFile: book.image.childImageSharp.fixed, 
                  imageAlt: book.title, 
                  price: book.price,
                  url: book.url,
                }
              ))}
            />
            <FeaturedTextList
              items={frontmatter.featured.features.map(feature => (
                { text: feature }
              ))}
            />
          </div>
          <footer className="section-footer">
            <MoreDetailLink color="primary" to="/products/" />
          </footer>
        </section>
          <section className="section">
            <h1 className="title is-3">
              お知らせ
            </h1>
            <NewsList items={posts.slice(0, 3).map(post => ({
              id: post.node.id,
              title: post.node.frontmatter.title,
              date: post.node.frontmatter.date,
              excerpt: post.node.excerpt,
              thumbnailImageFile: post.node.frontmatter.featuredImage.childImageSharp.fixed,
              thumbnailImageAlt: post.node.frontmatter.featuredImageAlt,
              to: post.node.fields.slug,
            }))} />
            {
              posts.length > 3 &&
                <footer className="section-footer">
                  <NewsListLink color="primary" to="/news/" />
                </footer>
            }
          </section>
        </div>
      </main>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        catchCopy
        catchDescription
        featured {
          title
          description
          features
          books {
            title
            price
            url
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
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date]}
      filter: { frontmatter: { templateKey: { eq: "news-post" } } }
      limit: 4
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            featuredImage {
              childImageSharp {
                fixed(width: 80, height: 80) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            featuredImageAlt
          }
        }
      }
    }
  }
`

export default IndexPage
