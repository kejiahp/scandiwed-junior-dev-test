import React, { Component } from 'react'
import './Category.css'
import Categoryitem from './CategoryItems/Categoryitem'

class Category extends Component {
  render() {
    console.log(this.props)
    return (
      <section className='category'>
        <h1 className='header'>Category name</h1>
        <div className='item-container'>
            <Categoryitem outofstock={true}/>
            <Categoryitem />
            <Categoryitem outofstock={true}/>
            <Categoryitem />
            <Categoryitem />
            <Categoryitem />
            <Categoryitem />
        </div>
      </section>
    )
  }
}

export default Category