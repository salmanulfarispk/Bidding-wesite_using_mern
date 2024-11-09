import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Home,Layout } from './router/index.js'




const App = () => {
  return (
   <>
   
   <BrowserRouter future={{ v7_startTransition: true,v7_relativeSplatPath: true}}>
   <Routes>

    <Route path="/" element={
       <Layout>
        <Home />
      </Layout>
    }/>




   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App