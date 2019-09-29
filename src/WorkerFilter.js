import React from 'react';

export default class WorkerFilter extends React.Component {
  
  render() {
    return (
      <section className="filterBar">
        <h2>If you know your courier look them up here.</h2>
        <input 
          type="text" 
          placeholder="Filter by courier name..."
          value={this.props.value} 
          onChange={this.props.onChange}
         />
      </section>
  )
}
}