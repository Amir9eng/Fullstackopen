import React from 'react'
import { filterChange } from '../reducers/filterReducer';
import { connect } from 'react-redux';


const Filter = (props) => {
    const handleChange = (e) => {

        props.filterChange(e.target.value)

    }
    const style = {
        marginBottom: 20
    }
    return ( <div style = { style }>
        filter < input onChange = { handleChange }/> </div>
    )
}

const mapStatetoProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchtoProps = {
  filterChange
}

const ConnectedFilter = connect(mapStatetoProps, mapDispatchtoProps)(Filter)

export default ConnectedFilter