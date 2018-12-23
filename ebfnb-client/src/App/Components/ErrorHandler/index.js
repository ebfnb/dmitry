import React from 'react'

export default class ErrorHandler extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    componentDidCatch(error) {
      this.setState({ error })
    }
  
    render() {
      const {error}=this.state.error
      if (error) {
        return (
          <div>
            <h1>Fatal error</h1>
            <p>{error.message}</p>
            <p>{error.stacktrace}</p>
          </div>
        )
      }
      return this.props.children;
    }
  }