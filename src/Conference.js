import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const Conference = {
  render: (config) => {
    ReactDOM.render(
      <React.StrictMode>
        <App {...config} />
      </React.StrictMode>,
      config.element
    )
  }
}

export default Conference
