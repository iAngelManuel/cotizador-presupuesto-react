import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './assets/img/nuevo-gasto.svg'

export default function App() {
  const getPresupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
  const [presupuesto, setPresupuesto] = useState(getPresupuestoLS)
  const [gastos, setGastos] = useState([...(JSON.parse(localStorage.getItem("gastos")) ?? [] )])
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalAnimation, setModalAnimation] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro, gastos])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => setModalAnimation(true), 300)
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
    localStorage.setItem('gastos', JSON.stringify(gastos)) ?? []
  }, [presupuesto, gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  const handleNuevoGasto = () => {
    setGastoEditar({})
    setModal(true)
    setTimeout(() => setModalAnimation(true), 300)
  }

  const saveGasto = gasto => {
    if(gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    } else {
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
      setGastoEditar({})
    }

    setModalAnimation(false)
    setTimeout(() => setModal(false), 500)
  }

  const eliminarGasto = id => {
    const eliminarGastoId = gastos.filter(gasto => gasto.id !== id)
    setGastos(eliminarGastoId)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              setGastoEditar={setGastoEditar}
              gastos={gastos}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono de nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && <Modal
        setModal={setModal}
        modalAnimation={modalAnimation}
        setModalAnimation={setModalAnimation}
        saveGasto={saveGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}
    </div> 
  )
}
