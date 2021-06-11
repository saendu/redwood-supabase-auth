import { Form, TextField, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import WeatherCell from 'src/components/WeatherCell'
import { useAuth } from '@redwoodjs/auth'

const WeatherPage = () => {
  const { hasRole } = useAuth()
  const [zip, setZip] = useState()

  const onSubmit = (data) => {
    setZip(data.zip)
  }

  return (hasRole('admin')) && (
    <>

      <Form onSubmit={onSubmit} style={{ fontSize: '2rem' }}>
        <TextField
          name="zip"
          placeholder="Zip code"
          maxLength="5"
          validation={{ required: true, pattern: /^\d{5}$/ }}
        />
        <Submit>Go</Submit>
      </Form>
      {zip && <WeatherCell zip={zip} />}
    </>
  )
}

export default WeatherPage
