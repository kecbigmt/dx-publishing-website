import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import NewsList from '../components/NewsList'
import LatestTopic from '../components/LatestTopic'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <section className="hero is-medium is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <p className="title is-2">
            キャッチコピーがここに
          </p>
          <p className="subtitle is-4">
          「創造的な学び」を子供たちにもたらすプログラミング学習用カードブックです。
          </p>
        </div>
      </div>
    </section>
    <main>
      <div className="container">
        <LatestTopic />
        <section className="section">
          <h1 className="title is-3">
            お知らせ
          </h1>
          <NewsList items={[
            {
              title: '「Scratchアクティビティ カードブック・シリーズ」を発売しましたアクティビティ カードブック・シリーズを発売しましたアクティビティ カードブック',
              timestamp: 1588294198,
            },
          ]} />
          <footer className="section-footer">
            <Link to="/info/" className="button is-primary is-rounded">
              お知らせ一覧
            </Link>
          </footer>
        </section>
      </div>
    </main>
  </Layout>
)

export default IndexPage
