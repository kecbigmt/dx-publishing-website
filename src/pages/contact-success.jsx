import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'

const ContactSuccessPage = ({ data }) => {
  return (
    <Layout>
      <SEO
        title="お問い合わせ"
        description="お問い合わせです"
      />
      <section className="hero is-light is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              送信成功しました。
            </h1>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ContactSuccessPage