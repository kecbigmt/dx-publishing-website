import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faChevronRight, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

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
 * @param {('external'|'more'|'submit')} [props.icon]
 * @param {string} [props.url] only for 'a' tag
 * @param {string} [props.to] only for 'Link' tag
 * @param {onClick} [props.onClick]
 * @param {'normal'|'small'} [props.size] default: normal
 * @param {('button'|'submit'|'reset')} [props.type] default: button (only when tag is 'button')
 * @param {string} [props.className] 
 * 
 */

const Button = ({ tag, color, label, icon, url, to, onClick, size, type = 'button', className }) => {
  const Tag = tag === 'Link' ? Link : tag
  return (
    <Tag 
      className={[
          'button is-rounded', 
          color === 'secondary' ? 'is-secondary' : 'is-primary',
          size === 'small' ? 'is-small' : 'is-normal',
          className,
        ].join(' ')} 
        href={url} 
        onClick={onClick} 
        to={to}
        target={ tag === 'a' ? '_blank' : undefined}
        rel={ tag === 'a' ? 'noopener noreferrer' : undefined}
        type={ tag === 'button' ? type : undefined }
    >
      {
        label && <span>{ label }</span>
      }
      {
        icon === 'external' ? <span className="icon"><FontAwesomeIcon icon={faExternalLinkAlt} /></span>
          : icon === 'more' ? <span className="icon"><FontAwesomeIcon icon={faChevronRight} /></span>
          : icon === 'submit' ? <span className="icon"><FontAwesomeIcon icon={faPaperPlane} /></span>
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
 * @param {'normal'|'small'} [props.size] default: normal
 * @param {string} [props.className] 
 */
export const PurchaseLink = (props) => (
  <Button tag='a' label='通販サイト' icon='external' {...props}/>
)

/**
 * MoreDetailLink
 * @param {Object} props
 * @param {('primary'|'secondary')} props.color
 * @param {to} props.to
 * @param {'normal'|'small'} [props.size] default: normal
 * @param {string} [props.className] 
 */
export const MoreDetailLink = (props) => (
  <Button tag="Link" label="もっと詳しく" icon="more" {...props}/>
)

/**
 * NewsListLink
 * @param {Object} props
 * @param {('primary'|'secondary')} props.color
 * @param {to} props.to
 * @param {'normal'|'small'} [props.size] default: normal
 * @param {string} [props.className] 
 */
export const NewsListLink = (props) => (
  <Button tag="Link" label="お知らせ一覧" icon="more" {...props}/>
)

/**
 * SubmitButton
 * @param {Object} props
 * @param {('primary'|'secondary')} props.color
 * @param {to} props.to
 * @param {'normal'|'small'} [props.size] default: normal
 * @param {string} [props.className] 
 */
export const SubmitButton = (props) => (
  <Button tag="button" type="submit" label="送信" icon="submit" {...props}/>
)

