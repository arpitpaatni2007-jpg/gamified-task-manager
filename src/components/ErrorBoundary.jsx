import React from "react"

// class component is required for error boundaries
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  // this runs when error happens
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  // optional: log error
  componentDidCatch(error, errorInfo) {
    console.log("Error caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-20">
          <h2 className="text-xl font-bold text-red-500">
            Something went wrong 😢
          </h2>
          <p className="text-gray-500 mt-2">
            Please refresh the page
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary