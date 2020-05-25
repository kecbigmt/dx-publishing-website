import React, { useState, useContext } from 'react'
import { graphql } from 'gatsby'
import { navigate } from 'gatsby-link'

import PageLayout from '../components/PageLayout'
import ArticleBody from '../components/ArticleBody'
import { RequiredBadge, OptionalBadge } from '../components/TextBadge'
import { SubmitButton } from '../components/Button'
import LocaleContext from '../context/LocaleContext'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ContactPage = ({ data, pageContext }) => {
  const { fields, html } = data.markdownRemark
  const [state, setState] = useState({})
  const [loading, setLoading] = useState(false)
  const { locale } = useContext(LocaleContext)
  const { localeSet } = pageContext

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'website-contact',
        ...state,
      }),
    })
      .then(res => {
        if (res.ok) {
          navigate(`/${locale}/contact-success/`)
        } else {
          alert(localeSet[locale].label.alert.error)
        }
        setLoading(false)
      })
      .catch(() => {
        alert(localeSet[locale].label.alert.failToSubmit)
        setLoading(false)
      })
    setLoading(true)
  }
  const LabeledRequiredBadge = () => <RequiredBadge label={localeSet[locale].label.badge.required}/>
  const LabeledOptionalBadge = () => <OptionalBadge label={localeSet[locale].label.badge.optional}/>

  return (
    <PageLayout
      title={fields.frontmatter.title}
      description={fields.frontmatter.description}
      breadcrumbs={pageContext.breadcrumbs}
      localeSet={localeSet}
    >
      <div className="container">
        <div className="box bc-background">
          <h1 className="title has-text-centered">
            {fields.frontmatter.title}
          </h1>
          <ArticleBody html={html} />
        </div>
        <form
          name="website-contact"
          className="form box"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="website-contact" />
          <div className="field">
            <div className="field-header">
              <label htmlFor="contact-name" className="label">
                { localeSet[locale].label.contactForm.name }
              </label>
              <LabeledRequiredBadge />
            </div>
            <div className="control">
              <input type="text" id="contact-name" name="name" className="input" onChange={handleChange} required />
            </div>
          </div>
          <div className="field">
            <div className="field-header">
              <label htmlFor="contact-email" className="label">
                { localeSet[locale].label.contactForm.email }
              </label>
              <LabeledRequiredBadge />
            </div>
            <div className="control">
              <input type="email" id="contact-email" name="email" className="input" onChange={handleChange} required />
            </div>
          </div>
          <div className="field">
            <div className="field-header">
              <label htmlFor="contact-tel" className="label">
                { localeSet[locale].label.contactForm.tel }
              </label>
              <LabeledOptionalBadge />
            </div>
            <div className="control">
              <input type="tel" id="contact-tel" name="tel" className="input" onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <div className="field-header">
              <label htmlFor="contact-belonging" className="label">
                { localeSet[locale].label.contactForm.company }
              </label>
              <LabeledOptionalBadge />
            </div>
            <div className="control">
              <input type="text" id="contact-belonging" name="belonging" className="input" onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <div className="field-header">
              <label htmlFor="contact-message" className="label">
                { localeSet[locale].label.contactForm.message }
              </label>
              <LabeledRequiredBadge />
            </div>
            <div className="control">
              <textarea id="contact-message" name="message" className="textarea" onChange={handleChange} required />
            </div>
          </div>
          <div className="control">
            <SubmitButton
              label={localeSet[locale].label.button.submit}
              color="primary"
              className={loading ? 'is-fullwidth is-loading' : 'is-fullwidth'}
            />
          </div>
        </form>
      </div>
    </PageLayout>
  )
}

export default ContactPage

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        frontmatter {
          title
          description
        }
      }
    }
  }
`