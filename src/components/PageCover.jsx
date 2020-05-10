import React from 'react'

/**
 * 
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {string} props.backgroundType
 * @param {string} [props.backgroundImageSrc]
 */
const PageCover = ({ title, subtitle, backgroundType, backgroundImageSrc }) => (
  <section
    className={[
      'page-cover hero is-medium',
      backgroundImageSrc ? 'with-background-image' : 'is-primary',
      backgroundType === 'image-dark' ? 'background-image-dark' : '',
    ].join(' ')}
    style={
      backgroundImageSrc ? {
        backgroundImage: `url(${backgroundImageSrc})`,
      }
      : undefined
    }
  >
    <div className="hero-body">
      {
        title &&
          <div className="container is-flex is-flex-dir-column has-flex-item-centered">
            <p className="title">{ title }</p>
            {
              subtitle &&
                <p className="subtitle">{ subtitle }</p>
            }
          </div>
      }
    </div>
  </section>
)

export default PageCover
