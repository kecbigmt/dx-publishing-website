import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'

/**
 * @callback onClick
 * @param {Object} MouseEvent
 */

/**
 * Button component
 * @param {Object} props
 * @param {('button'|'a'|'Link')} props.tag
 * @param {('primary'|'secondary')} props.color 'primary' or 'secondary'
 * @param {string} [props.label]
 * @param {('external'|'more')} [props.icon]
 * @param {string} [props.url] only for 'a' tag
 * @param {string} [props.to] only for 'Link' tag
 * @param {onClick} [props.onClick]
 * 
 */

const Button = ({ tag, color, label, icon, url, to, onClick }) => {
  const Tag = tag === 'Link' ? Link : tag
  return (
    <Tag className={['button is-rounded', color === 'secondary' ? 'is-secondary' : 'is-primary'].join(' ')} href={url} onClick={onClick} to={to}>
      {
        label && <span>{ label }</span>
      }
      {
        icon === 'external' ? <span className="icon"><FontAwesomeIcon icon={faExternalLinkAlt} /></span>
          : icon === 'more' ? <span className="icon"><FontAwesomeIcon icon={faChevronRight} /></span>
          : ''
      }
    </Tag>
  )
}

/**
 * PurchaseLink
 * @param {Object} props
 * @param {('primary'|'secondary')} props.color
 * @param {url} props.url
 */
export const PurchaseLink = (props) => (
  <Button tag='a' label='通販サイト' icon='external' {...props}/>
)

/**
 * MoreDetailLink
 * @param {Object} props
 * @param {('primary'|'secondary')} props.color
 * @param {to} props.to
 */
export const MoreDetailLink = (props) => (
  <Button tag='Link' label='もっと詳しく' icon='more' {...props}/>
)

/**
 * NewsListLink
 * @param {Object} props
 * @param {('primary'|'secondary')} props.color
 * @param {to} props.to
 */
export const NewsListLink = (props) => (
  <Button tag='Link' label='お知らせ一覧' icon='more' {...props}/>
)

