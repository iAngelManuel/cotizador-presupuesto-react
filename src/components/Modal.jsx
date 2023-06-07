import { useState, useEffect } from 'react'
import Message from './Message'
import CerrarBtn from '../assets/img/cerrar.svg'

export default function Modal({ setModal, modalAnimation, setModalAnimation, saveGasto, gastoEditar, setGastoEditar }) {

  const [message, setMessage] = useState('')
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [gastoEditar])

  const handleCerrarModal = () => {
    setModalAnimation(false)
    setGastoEditar({})
    setTimeout(() => setModal(''), 500)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if ([nombre, cantidad, categoria].includes('')) {
      setMessage('Todos los campos son obligatorios')
      setTimeout(() => setMessage(), 3000);
      return
    }

    saveGasto({nombre, cantidad, categoria, id, fecha})
    setModalAnimation(false)
    setTimeout(() => setModal(''), 500)
  }


  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={CerrarBtn}
          alt="cerrar modal"
          onClick={handleCerrarModal}
        />
      </div>
      <form className={`formulario ${modalAnimation ? "animar" : "cerrar"}`} onSubmit={handleSubmit}>Nuevo Gasto
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {message && <Message type="error">{message}</Message>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad del gasto"
            value={cantidad}
            onChange={e => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="subscripciones">Subscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
        />
      </form>
    </div>
  )
}
