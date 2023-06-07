import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { formatearCantidad } from '../helpers'
import 'react-circular-progressbar/dist/styles.css'

export default function ControlPresupuesto({ gastos, presupuesto, setGastos, setPresupuesto, setIsValidPresupuesto }) {
  
  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
    const totalDisponible = presupuesto - totalGastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
    
    setGastado(totalGastado)
    setDisponible(totalDisponible)
    setTimeout(() => setPorcentaje(nuevoPorcentaje), 600)
  }, [gastos, presupuesto])

  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reiniciar presupuestos y gastos?')

    if (resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje >= 100 ? '#DC2626' : '#00ff08',
            trailColor: '#F5F5F5',
            textColor: porcentaje >= 100 ? '#DC2626' : 'black'
          })}
          text={`${porcentaje}% Gastado`}
          value={porcentaje}
        />
      </div>
      <div className="contenido-presupuesto">
        <button
          type="button"
          className="reset-app"
          onClick={handleResetApp}
        >Resetear App
        </button>
        <p><span>Presupuesto:</span> {formatearCantidad(Number(presupuesto))}</p>
        <p className={`${disponible <= 0 ? 'negativo' : ''}`}><span>Disponible:</span> {formatearCantidad(Number(disponible))}</p>
        <p><span>Gastado:</span> {formatearCantidad(gastado)}</p>
      </div>
    </div>
  )
}
