import './App.css'
import FooterComponennt from './components/FooterComponennt'
import HeaderComponent from './components/HeaderComponent'
import IssueComponent from './components/IssueComponent'
import ListComponents from './components/ListComponents'
import {useState} from 'react'
import ViewIssueComponent from './components/ViewIssueComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AllIssuesComponent from './components/AllIssuesComponent'
import HomeComponent from './components/HomeComponent'
import EmailComponent from './components/EmailComponent'


function App() {
  

  return (
   <>
   <BrowserRouter>
    <HeaderComponent/>
    <Routes>

        <Route path='/home' element={<HomeComponent/>}></Route>
        {/* // http://localhost:3000 */}
        <Route path='/' element = {<ListComponents/>}> </Route>
        {/*// http://localhost:3000/issues */}
        <Route path='/issues' element = {<AllIssuesComponent/>}></Route>
        {/*// http://localhost:3000/add-issue */}    
        <Route path='/add-issue' element ={<IssueComponent/>}></Route>
        {/*// http://localhost:3000/edit-issue/1 */}
        <Route path='/edit-issue/:id' element = {<IssueComponent/>}></Route>
        {/*// http://localhost:3000/view-issue/1 */}
        <Route path='/view-issue/:id' element={<ViewIssueComponent />} />
        {/*// http://localhost:3000/email */}
        <Route path='/email' element={<EmailComponent/>}></Route>

    </Routes>
    </BrowserRouter> 
   </>
  )
}

export default App
