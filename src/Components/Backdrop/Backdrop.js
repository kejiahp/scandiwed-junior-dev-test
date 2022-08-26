import React, { Component } from 'react'
import './Backdrop.css'

class Backdrop extends Component {
  render() {
    return (
        <div>
            {this.props.show ? <div className='backdrop' onClick={this.props.clicked}></div> : null}
        </div>
    )
  }
}

export default Backdrop