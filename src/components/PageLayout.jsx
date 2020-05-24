import React, { useContext } from 'react'

import Layout from './Layout'
import BreadCrumbList from './BreadCrumbList'
import SEO from './seo'
import LocaleContext from '../context/LocaleContext'

const PageLayout = ({ title, ogpImage, breadcrumbs, description, hero, localeSet, children }) => (
  <Layout
    localeSet={localeSet}
  >
    <SEO
      title={title}
      description={description}
      ogpImage={ogpImage}
      lang={useContext(LocaleContext).locale}
    />
    { hero }
    <section className="section bc-background">
      <div className="container has-breadcrumb">
        <div className="box bc-background">
          <BreadCrumbList
            items={breadcrumbs}
          />
      </div>
      </div>
      <main className="is-flex is-flex-dir-column has-flex-item-centered">
        {children}
      </main>
    </section>
  </Layout>
)

export default PageLayout