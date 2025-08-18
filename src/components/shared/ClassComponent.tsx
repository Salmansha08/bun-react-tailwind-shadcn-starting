import { Component } from "react";

export class CounterClass extends Component<{}, { count: number }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0
    };

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  render() {
    return (
      <div>
        <h2>Counter (Class Component)</h2>
        <p>Nilai: {this.state.count}</p>
        <button onClick={this.increment}>Tambah</button>
      </div>
    );
  }
}

