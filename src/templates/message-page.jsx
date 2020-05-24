import React, { useContext } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { ToTopButton } from '../components/Button'
import LocaleContext from '../context/LocaleContext'

const MessagePage = ({ data, pageContext }) => {
  const { frontmatter } = data.markdownRemark
  const { localeSet } = pageContext
  const { locale } = useContext(LocaleContext)
  return (
    <Layout
      localeSet={localeSet}
    >
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || undefined}
        lang={locale}
      />
      <section className={['hero', 'is-fullheight', frontmatter.color ? `is-${frontmatter.color}` : 'is-light'].join(' ')}>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              {frontmatter.message.title}
            </h1>
            {
              frontmatter.message.description &&
                <div className="content">
                  <p className="has-text-gray">
                    {frontmatter.message.description}
                  </p>
                </div>
            }
            <ToTopButton label={localeSet[locale].label.button.toTop} />
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