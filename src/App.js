import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    values: []
  }

  rand = (min, max) =>  {
    return Math.random() * (max - min) + min;
  }

  exportF = (elem) => {
    var table = document.getElementById("table");
    var html = table.outerHTML;
    var url = 'data:application/vnd.ms-excel,' + escape(html); // Set your html table into url
    elem.setAttribute("href", url);
    elem.setAttribute("download", "export.xls"); // Choose the file name
    return false;
  }

  handleSubmit = event => {
    event.preventDefault();

    const minRef = parseInt(this.minRef.value);
    const maxRef = parseInt(this.maxRef.value);
    const rangeRef = parseInt(this.rangeRef.value);
    const decimalRef = parseInt(this.decimalRef.value);

    const result = [...Array(rangeRef)].map((_, i) => {
      return this.rand(minRef, maxRef).toFixed(decimalRef);
    });

    this.setState({
      values: result
    });
  }

  export = () => {
    this.exportF(this);
  }

  render() {

    let values = this.state.values.map(value => (
      <tr>
        <td>{value}</td>
      </tr>
    ))

    return (
      <div className="App">


        <div>
          <div className={"formGroup"}>
            <input type="number" ref={input => this.minRef = input} className={"formControl"} placeholder={"Minimum value"} />

            <input type="number" ref={input => this.maxRef = input} className={"formControl"} placeholder={"Maximum value"} />

            <input type="number" ref={input => this.rangeRef = input} className={"formControl"} placeholder={"Range"} />

            <input type="number" ref={input => this.decimalRef = input} className={"formControl"} placeholder={"Decimal"} />
          </div>


          <button onClick={this.handleSubmit} className={"button button_primary"}> Compute </button>
        </div>


        <div className="result">
          <table id="table">
              { values }
          </table>
        </div>

        <button onClick={this.export} className={"button button_primary"}> Export </button>

      </div>
    );
  }
}

export default App;
