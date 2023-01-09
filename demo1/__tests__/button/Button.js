import React from 'react'

const Button = () => {
  const [clicked, setClicked] = React.useState(false)
  const handleClick = () => {
    setClicked(true)
  }
  return (
    <button onClick={handleClick}>
      {clicked ? 'Clicked' : 'Not clicked'}
    </button>
  )
}

export default Button
