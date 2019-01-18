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
    document.onMouseDown = e => {
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
    return this.state.map;
    // this.setState({ map: this.state.map });
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
    // this.setCursor(x, y);
    return [x, y];
  };

  handleType = char => {
    this.poke(char, this.state.selected[0], this.state.selected[1]);

    this.setState({
      map: this.poke(char, this.state.selected[0], this.state.selected[1]),
      selected: this.incrementCursor()
    });
  };

  render() {
    return (
      <Grid
        data={this.state.map}
        selected={this.state.selected}
        onClick={this.setCursor}
        onPaint={(char, x, y) => this.setState({ map: this.poke(char, x, y) })}
        showGrid
      />
    );
  }
}

class Grid extends Component {
  state = {
    hover: { x: 0, y: 0 }
  };
  tileSize = { x: 12, y: 16 };
  showPos = e => {
    e.stopPropagation();
    let rect = e.target.getBoundingClientRect();

    const x = Math.max(
      Math.min(
        Math.floor((e.clientX - rect.left) / this.tileSize.x),
        this.props.data[0].length - 1
      ),
      0
    );
    const y = Math.max(
      Math.min(
        Math.floor((e.clientY - rect.top) / this.tileSize.y),
        this.props.data.length - 1
      ),
      0
    );

    this.setState({ hover: { x: x, y: y } });

    if (e.buttons == 1) {
      this.props.onPaint("#", x, y);
    }
  };
  render() {
    return (
      <div
        className={`grid ${this.props.showGrid ? "showGrid" : ""}`}
        onMouseMove={this.showPos}
        onClick={this.props.onClick.bind(
          this,
          this.state.hover.x,
          this.state.hover.y
        )}
        // style={{ width: 100, height: 100 }}
      >
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
                    className={`cell ${selected ? "selected" : ""} ${
                      this.state.hover &&
                      this.state.hover.x === x &&
                      this.state.hover.y === y
                        ? "hover"
                        : ""
                    }`}
                    onClick={() => this.props.onClick(x, y)}
                    // onMouseOver={() => this.props.onPaint("#", x, y)}
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
