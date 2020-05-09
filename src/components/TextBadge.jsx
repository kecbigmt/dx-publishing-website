import React from 'react'

/**
 * TextBadge component
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.className
 * @return {JSX.Element}
 */
const TextBadge = ({ label, className }) => (
  <span className={['text-badge', className].join(' ')}>{label}</span>
)

/**
 * RequiredBadge component
 * @param {Object} props
 * @param {string} [props.className]
 * @return {JSX.Element}
 */
export const RequiredBadge = ({ className }) => (
  <TextBadge label="必須" className={['is-secondary', className].join(' ')} />
)

/**
 * OptionalBadge component
 * @param {Object} props
 * @param {string} [props.className]
 * @return {JSX.Element}
 */
export const OptionalBadge = ({ className }) => (
  <TextBadge label="任意" className={['is-light', className].join(' ')} />
)
