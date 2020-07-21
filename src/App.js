/* global fetch */
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import './App.css'

function App (props) {
  const [conference, setConference] = useState(null)
  const [conferenceData, setConferenceData] = useState(null)
  const fetchOptions = { headers: { accept: 'application/json' } }

  const rebuildEntities = () => console.log('rebuildEntities')

  const fetchData = (url) => {
    console.log('loadData', url)
    fetch(url, fetchOptions)
      .then(response => response.json())
      .then(data => {
        if (conferenceData !== null) {
          data.data = conferenceData.data.concat(data.data)
        }
        // @TODO Rebuild related entities from data (both existing and new).
        setConferenceData(data)
        rebuildEntities(data)
      })
  }

  useEffect(() => {
    fetch(props.url, fetchOptions)
      .then(response => response.json())
      .then(data => {
        setConference(data.data)
        const url = data?.data?.links?.all?.href
        if (url) {
          fetchData(url)
        }
      })
  }, [])

  return (
    conferenceData === null
      ? <div className='loading'>Loading {props.url} …</div>
      : (
        <div className='App'>
          <h1>{conference.attributes.title}</h1>
          <p>#events: {conferenceData.data.length}</p>
          {conferenceData.data.map(item => (
            <div key={item.id} className='event'>
              <h2 className='title'><a href={`#${item.id}`}>{item.attributes.title}</a></h2>
            </div>
          )
          )}
          {conferenceData.links?.next && <button type='button' onClick={() => fetchData(conferenceData.links.next.href)}>Load more …</button>}
        </div>
      )
  )
}

App.propTypes = {
  element: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
}

export default App
