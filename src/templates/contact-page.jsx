import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { navigate } from 'gatsby-link'

import PageLayout from '../components/PageLayout'
import PageHeader from '../components/PageHeader'
import ArticleBody from '../components/ArticleBody'
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
      .then(() => {
        navigate('/contact-success/')
        setLoading(false)
      })
      .catch(err => {
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
    >
      <div className="form-content">
        <PageHeader
          title={fields.frontmatter.title}
        />
        <ArticleBody html={html} />
        <form
          className="form box"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="website-contact" />
          <div className="field">
            <label htmlFor="contact-name" className="label">お名前</label>
            <div className="control">
              <input type="text" id="contact-name" name="name" className="input" onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="contact-belonging" className="label">会社名/学校名/所属先</label>
            <div className="control">
              <input type="text" id="contact-belonging" name="belonging" className="input" onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="contact-email" className="label">メールアドレス</label>
            <div className="control">
              <input type="email" id="contact-email" name="email" className="input" onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="contact-tel" className="label">電話番号</label>
            <div className="control">
              <input type="tel" id="contact-tel" name="tel" className="input" onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="contact-message" className="label">お問い合わせ内容</label>
            <div className="control">
              <textarea id="contact-message" name="message" className="textarea" onChange={handleChange} />
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