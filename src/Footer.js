import React from 'react';

export default class Footer extends React.Component {

/* Function to keep copyright using the correct years */
    getYear = () => {
     return new Date().getFullYear();
    }
  

render(){
  return(
    <footer>
      <p>Copyright © Andy Durette <span>{this.getYear()}</span></p>
    </footer>
    )
  }
}