import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PageCover from '../components/PageCover'
import BookCarousel from '../components/BookCarousel'
import FeaturedTextList from '../components/FeaturedTextList'
import { MoreDetailLink } from '../components/Button'
import { NewsListLink } from '../components/Button'
import ArticleList from "../components/ArticleList"

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO />
      <PageCover
        title={frontmatter.cover.title}
        subtitle={frontmatter.cover.subtitle}
        backgroundType="image-dark"
        backgroundImageSrc={frontmatter.cover.backgroundImage.childImageSharp.fluid.src}
      />
      <section className="section bc-surface">
        <div className="container">
          <header className="box featured-header">
            <h1 className="title is-3 has-text-centered">
              { frontmatter.featured.title }
            </h1>
            <p className="description">{ frontmatter.featured.description }</p>
          </header>
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
          <div className="box">
            <FeaturedTextList
              items={frontmatter.featured.features.map(feature => (
                { text: feature }
              ))}
            />
            <footer className="section-footer">
              <MoreDetailLink color="primary" to="/products/scratch-activity-card-book" />
            </footer>
          </div>
        </div>
      </section>
      <section className="section bc-background">
        <div className="container">
          <h1 className="title is-3 has-text-centered">
            お知らせ
          </h1>
          <ArticleList items={posts.slice(0, 3).map(post => ({
            id: post.node.id,
            title: post.node.frontmatter.title,
            date: post.node.frontmatter.date,
            excerpt: post.node.excerpt,
            imageFile: post.node.frontmatter.featuredImage.childImageSharp.fixed,
            imageAlt: post.node.frontmatter.featuredImageAlt,
            to: post.node.fields.slug,
          }))} />
          {
            posts.length > 3 &&
              <footer className="section-footer">
                <NewsListLink color="primary" to="/news/" />
              </footer>
          }
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        cover {
          title
          subtitle
          backgroundImage {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
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
                fixed(width: 120, height: 120) {
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
