import React from 'react';

export default class DeadlineOrder extends React.Component {
  
  render() {
    return (
      <form action="/action_page.php" method="get" className="deadline_order">
        <p>Earliest first</p>
          <input className="deadline_order" type="range" name="deadline" min="0" max="1" value={this.props.workByOrder} onChange={this.props.onChange} /> 
        <p>Latest First</p>   
      </form>
    )
  }
}