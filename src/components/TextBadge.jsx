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
 * @param {string} [props.label]
 * @return {JSX.Element}
 */
export const RequiredBadge = ({ className, label }) => (
  <TextBadge label={label} className={['is-secondary', className].join(' ')} />
)

/**
 * OptionalBadge component
 * @param {Object} props
 * @param {string} [props.className]
 * @param {string} [props.label]
 * @return {JSX.Element}
 */
export const OptionalBadge = ({ className, label }) => (
  <TextBadge label={label} className={['is-light', className].join(' ')} />
)
