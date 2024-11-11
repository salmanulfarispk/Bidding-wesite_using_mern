import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Home,Layout,ProductDetails} from './router/index.js'




const App = () => {
  return (
   <>
   
   <BrowserRouter future={{ v7_startTransition: true,v7_relativeSplatPath: true}}>
   <Routes>

    <Route path="/" element={
       <Layout>
        <Home />
      </Layout>  }/>

      <Route path="/details/:id"  element={
        <Layout>
          <ProductDetails />
        </Layout>
      }/>




   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App