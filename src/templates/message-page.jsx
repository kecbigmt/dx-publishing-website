import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { ToTopButton } from '../components/Button'

const MessagePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || undefined}
      />
      <section className={['hero', 'is-fullheight', frontmatter.color ? `is-${frontmatter.color}` : 'is-light'].join(' ')}>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              {frontmatter.message.title}
            </h1>
            {
              frontmatter.message.subtitle &&
                <p className="subtitle">
                  {frontmatter.message.subtitle}
                </p>
            }
            <ToTopButton />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default MessagePage

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        frontmatter {
          message
        }
      }
      frontmatter {
        title
        description
        message {
          title
          description
        }
      }
    }
  }
`