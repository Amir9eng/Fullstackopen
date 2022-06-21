import React from 'react'
import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';



const Filter = () => {
  const dispatch = useDispatch()
   const handleChange = (e) => {

    dispatch(filterChange(e.target.value))

  }
  const style = {
    marginBottom: 20
  }
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
