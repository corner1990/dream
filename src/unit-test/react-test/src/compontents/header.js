import React from 'react'

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

export default Link