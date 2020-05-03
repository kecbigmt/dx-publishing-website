import React from 'react'

import BookCarousel from './BookCarousel'
import FeaturedTextList from './FeaturedTextList'
import { MoreDetailLink } from './Button'
import BookDummyImage from '../images/book_dummy.png'

const LatestTopic = () => (
  <section className="section">
    <h1 className="title is-3">
      Scratchアクティビティ カードブック・シリーズ
    </h1>
    <p>
    「創造的な学び」を子供たちにもたらすプログラミング学習用カードブックです。手元に置いておくだけで、子供たちがプログラミングに集中して取り組むのを手助けしてくれます。
    </p>
    <div className="is-flex is-flex-dir-column has-flex-item-centered">
      <BookCarousel
        items={[
          { key: '001', src: BookDummyImage, alt: 'book' },
          { key: '002', src: BookDummyImage, alt: 'book' },
          { key: '003', src: BookDummyImage, alt: 'book' },
          { key: '004', src: BookDummyImage, alt: 'book' },
          { key: '005', src: BookDummyImage, alt: 'book' },
        ]}
      />
      <FeaturedTextList
        items={[
          { text: 'MITのScratchチームが開発した最先端のプログラミング学習教材を収録' },
          { text: '待望のScratch3.0対応版コーディングカード' },
          { text: '家庭学習だけでなく小学校の教育現場、放課後プログラムの教材にも最適' },
        ]}
      />
    </div>
    <footer className="section-footer">
      <MoreDetailLink color="primary" to="/products/" />
    </footer>
  </section>
)

export default LatestTopic