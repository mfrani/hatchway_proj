import React from "react";
import axios from "axios";

class Workorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrders: [],
      isLoaded: false,
      url: "teest",
      workerInfo: {}
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    Promise.all([
      fetch("https://www.hatchways.io/api/assessment/work_orders"),
      fetch("https://www.hatchways.io/api/assessment/workers/0")
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          workOrders: data1.orders,
          workerInfo: { ...data2.worker },
          isLoaded: true
        })
      )
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    if (this.state.workOrders === null) return null;
    var { workOrders, isLoaded } = this.state;
    console.log(this.state.workerInfo);
    return (
      <div>
        <div>
          <h1>Workorder component</h1>
          {isLoaded ? <p>Component Loaded</p> : <p>Standby, loading...</p>}
        </div>
        <ul>
          {this.state.workOrders.map(order => (
            <li key={order.id}>{order.name}</li>
          ))}
        </ul>
        <p>{this.state.workerInfo.name}</p>
      </div>
    );
  }
}

export default Workorder;
