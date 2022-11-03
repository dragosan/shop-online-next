import React from 'react'
import Link from 'next/link'

const DropdownLink = ({ href, children, ...rest }) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}

export default DropdownLink
