"use client"

import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Silent error handling
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 text-red-900">
          <h2>Something went wrong rendering this component.</h2>
          <details className="mt-2 text-sm">
            <summary>Error details</summary>
            <pre className="mt-2 text-xs">{this.state.error?.toString()}</pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
} 