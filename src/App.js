import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    map: [...Array(32)].map((item, y) => [...Array(64)].map((item, x) => " ")),
    selected: [0, 0]
  };

  componentDidMount() {
    document.onkeypress = e => {
      e = e || window.event;
      var charCode = typeof e.which == "number" ? e.which : e.keyCode;
      if (charCode) {
        // alert("Character typed: " + String.fromCharCode(charCode));
        this.handleType(String.fromCharCode(charCode));
      }
    };
  }

  setCursor = (x, y) => {
    this.setState({ selected: [x, y] });
  };

  poke = (char, x, y) => {
    this.state.map[y][x] = char;
    this.setState({ map: this.state.map });
  };

  incrementCursor = () => {
    let x = this.state.selected[0];
    let y = this.state.selected[1];
    x = x + 1;
    if (x > this.state.map[0].length - 1) {
      if (y < this.state.map.length - 1) {
        x = 0;
        y = y + 1;
      } else {
        x = x - 1;
      }
    }
    this.setCursor(x, y);
  };

  handleType = char => {
    this.poke(char, this.state.selected[0], this.state.selected[1]);
    this.incrementCursor();
  };

  render() {
    return (
      <Grid
        data={this.state.map}
        selected={this.state.selected}
        onClick={this.setCursor}
        onPaint={this.poke}
        showGrid
      />
    );
  }
}

class Grid extends Component {
  render() {
    return (
      <div className={`grid ${this.props.showGrid ? "showGrid" : ""}`}>
        {this.props.data.map(
          (item, y) => (
            <div className="gridRow">
              {item.map((item, x) => {
                const selected =
                  this.props.selected[0] === x && this.props.selected[1] === y;

                const className = `cell ${item === " " ? "empty" : ""} ${
                  selected ? "selected" : ""
                }`;

                return (
                  <div
                    key={`${x},${y}`}
                    className={`cell ${selected ? "selected" : ""}`}
                    onClick={() => this.props.onClick(x, y)}
                    onMouseOver={() => this.props.onPaint("#", x, y)}
                  >
                    {item}
                  </div>
                );
              }, this)}
            </div>
          ),
          this
        )}
      </div>
    );
  }
}

class Grid2 extends Component {
  render() {
    return (
      <div className="grid">
        {[...Array(32)].map((item, y) => [
          ...[...Array(64)].map((item, x) => (
            <div className="cell">
              {x % 8 === 0 && y % 8 === 0 ? "＋" : "·"}
            </div>
          )),
          <br />
        ])}
      </div>
    );
  }
}

export default App;
