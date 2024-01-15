import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' style={{ backgroundColor: "skyblue"}}
    >
      <h1 className="text-center fs-5">All Rights Reserved &copy; Chippastore</h1>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer