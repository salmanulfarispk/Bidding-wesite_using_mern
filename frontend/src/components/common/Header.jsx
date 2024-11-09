import React from 'react'
import { Container, CustomNavLinkList } from './Design'
import { menuLists } from '../../assets/data'
import { useLocation } from 'react-router-dom'


export const Header = () => {


  const pathname=useLocation()


  return (
   <header className='header py-1 bg-primary'>
    <Container>
      <nav className='p-4 flex justify-between items-center relative'>
        <div className='flex items-center gap-14'>
          <div>
            <img src='../images/commonimgs/header-logo.png' alt='logo' className='h-11'/>
          </div>

          <div className='hidden lg:flex items-center justify-between gap-8'>
            {menuLists.map((list)=>(
              <li key={list.id} className='capitalize list-none'>
                <CustomNavLinkList href={list.path} isActive={location.pathname === list.path}>
                   {list.link}
                </CustomNavLinkList>
              </li>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 icons">
          <div className='hidden lg:flex lg:items-center lg:gap-8'>
          
          </div>
          
        </div>


      </nav>
    </Container>
   </header>
  )
}
