import React from 'react'

import Layout from './Layout'
import BreadCrumbList from './BreadCrumbList'
import SEO from './seo'

const PageLayout = ({ title, breadcrumbs, description, children }) => (
  <Layout>
    <SEO
      title={title}
      description={description}
    />
    <section className="section">
      <BreadCrumbList
        items={breadcrumbs}
      />
      <main className="is-flex is-flex-dir-column has-flex-item-centered">
        {children}
      </main>
    </section>
  </Layout>
)

export default PageLayout