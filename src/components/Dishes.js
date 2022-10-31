import React from 'react'
import "../styles/Dishes.css"
const Dishes = ({item}) => {
    // console.log(props.props.id)
  return (
    <div className='wrapper_div'>
    <div className='dish_bar'>
       <span>{item.dishName}</span>
    </div>
    </div>
  )
}

export default Dishes