import React, { Component } from 'react';

class Boundary extends Component {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }


  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    const { hasError }: any = this.state;
    const { children }: any = this.props;

    if (hasError) {
      return (
        <div className="loader">
          <h3>:( Something went wrong.</h3>
        </div>
      );
    }

    return children;
  }
}

export default Boundary;
