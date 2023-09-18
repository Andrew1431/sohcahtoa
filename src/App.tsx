import './App.css'
import { Canvas } from './components/Canvas';
import { CanvasContext, useCanvasManager } from './hooks/useCanvasManager'

function App() {
  const { canvasRef, wrapperRef, value } = useCanvasManager();

  return (
    <CanvasContext.Provider value={value}>
      <div ref={wrapperRef} className="wrapper">
        <Canvas ref={canvasRef} />
      </div>
    </CanvasContext.Provider>
  )
}

export default App
