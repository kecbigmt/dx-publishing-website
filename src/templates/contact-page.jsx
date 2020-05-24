import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { navigate } from 'gatsby-link'

import PageLayout from '../components/PageLayout'
import ArticleBody from '../components/ArticleBody'
import { RequiredBadge, OptionalBadge } from '../components/TextBadge'
import { SubmitButton } from '../components/Button'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ContactPage = ({ data, pageContext }) => {
  const { fields, html } = data.markdownRemark
  const [state, setState] = useState({})
  const [loading, setLoading] = useState(false)

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
          navigate('/contact-success/')
        } else {
          alert('エラーが発生しました')
        }
        setLoading(false)
      })
      .catch(() => {
        alert('送信に失敗しました')
        setLoading(false)
      })
    setLoading(true)
  }

  return (
    <PageLayout
      title={fields.frontmatter.title}
      description={fields.frontmatter.description}
      breadcrumbs={pageContext.breadcrumbs}
      localeSet={pageContext.localeSet}
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
              <label htmlFor="contact-name" className="label">お名前</label>
              <RequiredBadge />
            </div>
            <div className="control">
              <input type="text" id="contact-name" name="name" className="input" onChange={handleChange} required />
            </div>
          </div>
          <div className="field">
            <div className="field-header">
              <label htmlFor="contact-email" className="label">メールアドレス</label>
              <RequiredBadge />
            </div>
            <div className="control">
              <input type="email" id="contact-email" name="email" className="input" onChange={handleChange} required />
            </div>
          </div>
          <div className="field">
            <div className="field-header">
              <label htmlFor="contact-tel" className="label">電話番号</label>
              <OptionalBadge />
            </div>
            <div className="control">
              <input type="tel" id="contact-tel" name="tel" className="input" onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <div className="field-header">
              <label htmlFor="contact-belonging" className="label">会社名/学校名/所属先</label>
              <OptionalBadge />
            </div>
            <div className="control">
              <input type="text" id="contact-belonging" name="belonging" className="input" onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <div className="field-header">
              <label htmlFor="contact-message" className="label">お問い合わせ内容</label>
              <RequiredBadge />
            </div>
            <div className="control">
              <textarea id="contact-message" name="message" className="textarea" onChange={handleChange} required />
            </div>
          </div>
          <div className="control">
            <SubmitButton color="primary" className={loading ? 'is-fullwidth is-loading' : 'is-fullwidth'} />
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