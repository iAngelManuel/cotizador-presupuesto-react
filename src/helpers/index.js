export const generarId = () => {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export const formatearCantidad = cantidad => {
  return cantidad.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}

export const formatearFecha = fecha => {
  const newDate = new Date(fecha)
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }
  return newDate.toLocaleDateString('es-ES', options)
}