import React from 'react';
import ReactDOM from 'react-dom';
import OrderHeading from './OrderHeading';
import OrderTiles from './OrderTiles';
import WorkerFilter from './WorkerFilter';
import DeadlineOrder from './DeadlineOrder';
import Footer from './Footer';
import './App.css';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      work_orders: [],
      worker:'',
      work_by_order:0,
      search: "",
      isFetching: true
    }

// Start of state being called from json files using fetch to simulate if I did not have files on hand.
// fetch requests made here for all the data needed for the page, a loading screen will be shown until all the data loading has been dealt with sequentially thanks to promises
// isFetching is lastely changed so that page is all loaded so there won't be any errors with state not being loaded yet.

  fetch('/json/work_orders.json')
  .then((res) => res.json())
  .then((data) => {
    let dataArray = [data];
    dataArray[0].orders.sort((a, b) => parseFloat(a.deadline) - parseFloat(b.deadline));
    this.setState({work_orders: dataArray[0]})
    })
  .then(() => stateUpdate2());


let stateUpdate2 = () =>{
  fetch('/json/worker.json')
  .then((res) => res.json())
  .then((data) => this.setState({worker: data, isFetching: false}))
}  
    
} 

//End of state being called from json files

// Function used by a DeadlineOrder components form using a range type input to control state shifting from 0 to 1 and back as a mechanism to swtich from newest to oldest orders  
deadlineReorder = () => {
  if( this.state.work_by_order === 1 ){
    this.setState({work_by_order: 0});
    this.state.work_orders.orders.sort((a, b) => parseFloat(a.deadline) - parseFloat(b.deadline));
  }else{
    this.setState({work_by_order: 1});
    this.state.work_orders.orders.sort((a, b) => parseFloat(b.deadline) - parseFloat(a.deadline));
  }
}

// This is bound to the WorkerFilter form input field to update the state
updateSearch = (event) => {
  this.setState({search: event.target.value.substring(0,30)});
}


render() {
  return (
      <React.Fragment>
        <div className="stickyFooterWrapper">
        {this.state.isFetching ?  
        <div id="loadingScreen">
        <p>Loading...</p>
        </div>
        : (
          <React.Fragment>
          <OrderHeading />
          <section id="controls">
          <WorkerFilter
            onChange={this.updateSearch.bind(this)}
            value={this.state.search} 
          />
          <DeadlineOrder 
            workByOrder={this.state.work_by_order}
            onChange={() => this.deadlineReorder()}
          />
          </section>
          
          <section id='ordersContainer'> 
             {this.state.work_orders.orders.map(orders => (
                <OrderTiles
                  key={orders.id}
                  data-workername={this.state.worker[orders.workerId].worker.name}
                  workOrderName={orders.name}
                  workOrderDescription={orders.description}
                  workOrderworkerId={orders.workerId}
                  employeeImage={this.state.worker[orders.workerId].worker.image} 
                  employeeName={this.state.worker[orders.workerId].worker.name}
                  employeeCompanyName={this.state.worker[orders.workerId].worker.companyName} 
                  employeeEmail={this.state.worker[orders.workerId].worker.email} 
                  deadline={orders.deadline} 
                  search={this.state.search}
                />
          )
        )
      }    

          </section>
            
          </React.Fragment>
          )}
          </div>
          <Footer/>
        </React.Fragment>
        
  );
}
}

// Render to index.html

ReactDOM.render(
  <App />,
  document.getElementById('root')
  );
