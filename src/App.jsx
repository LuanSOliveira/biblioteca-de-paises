import Container from './components/Container/container'
import AppProvider from './context/context'

function App() {

  return (
    <AppProvider className="App">
      <Container/>
    </AppProvider>
  )
}

export default App
