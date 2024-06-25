import React from 'react'
import { Button } from "flowbite-react";

const ButtonComponent = ({title, onClick}) => {
  return (
    <div>
       <Button onClick={onClick} gradientDuoTone="purpleToBlue">{title}</Button>
    </div>
  )
}

export default ButtonComponent
