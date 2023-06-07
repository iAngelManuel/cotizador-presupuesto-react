import { useState } from 'react'
import Message from './Message'

export default function NuevoPresupuesto({ presupuesto, setPresupuesto, setIsValidPresupuesto }) {

  const [message, setMessage] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if(!presupuesto || presupuesto <= 0) {
      return setMessage('No es un presupuesto valido')
    }

    setMessage('')
    setIsValidPresupuesto(true)

  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form
        className="formulario"
        onSubmit={handleSubmit}
      >
        <div className="campo">
          <label htmlFor="presupuesto">Definir Presupuesto</label>
          <input
            id="presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            className="nuevo-presupuesto"
            value={presupuesto}
            onChange={e => setPresupuesto(e.target.value)}
          />
        </div>
        <input type="submit" value="Añadir" />
        {message && <Message type="error">{message}</Message>}
      </form>
    </div>
  )
}
