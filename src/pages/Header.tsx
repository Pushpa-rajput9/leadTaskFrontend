import React from 'react'
import { NavLink } from "react-router-dom";
import bell from '../../assets/bell.svg'
import followup from '../../assets/followup.svg'
import leadico from '../../assets/lead.svg'
import sales from '../../assets/sale.svg'
import setting from '../../assets/setting.svg'
import dashboard from '../../assets/dashboard.svg'
import productIcon from '../../assets/product.svg'


function Header() {
  
  return (
    <div className="w-64  bg-white h-screen border-r-2 border-gray-200 ">
      <nav className="flex justify-between pl-5 pr-5 items-center  text-2xl font-semibold h-16  bg-white text-black  ">
        <div>
         LeadCRM
        </div>
        {/* <div className='text-lg text-gray-700 font-extrabold'>&lt;</div> */}
      </nav>
<div className='w-full flex justify-center'>
    <div className='w-48  bg-slate-200 h-[2px] '>
    <hr />
</div>
</div>
      <div>
        <div className="h-full flex flex-col font-medium  pt-10 pl-10 gap-y-5 ">
          <div className=" flex gap-3 items-center">
            <div>
              <img className='w-4 h-4' src={dashboard} alt="" />
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` flex justify-center items-center duration-200 ${
                  isActive ? "text-black " : " text-black"
                } hover:text-[#526818]  `
              }
            >
              Dashboard
            </NavLink>
          </div>
          <div className=" flex gap-3 items-center" >
            <div>
              <img className='w-4 h-4' src={leadico} alt="" />
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` flex justify-center items-center duration-200 ${
                  isActive ? "text-black " : " text-black"
                } hover:text-[#526818]  `
              }
            >
              Leads
            </NavLink>
          </div>
          <div className=" flex gap-3 items-center">
            <div>
              <img className="w-4 h-4" src={followup} alt="" />
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` flex justify-center items-center duration-200 ${
                  isActive ? "text-black " : " text-black"
                } hover:text-[#526818]  `
              }
            >
              Follow-Ups
            </NavLink>
          </div>
          <div className=" flex gap-3 items-center">
            <div>
              <img
                className="w-4 h-4  "
                src={sales}
                alt="error"
              />
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` flex justify-center items-center duration-200 ${
                  isActive ? "text-black " : " text-black"
                } hover:text-[#526818]  `
              }
            >
             Sales Activity
            </NavLink>
          </div>
          <div className=" flex gap-3 items-center">
            <div>
              <img className="w-4 h-4 " src={productIcon} alt="" />
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` flex justify-center items-center duration-200 ${
                  isActive ? "text-black " : " text-black"
                } hover:text-[#526818]  `
              }
            >
              Products
            </NavLink>
          </div>
          <div className=" flex gap-3 items-center">
            <div>
              <img className="w-4 h-4" src={bell} alt="" />
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` flex justify-center items-center duration-200 ${
                  isActive ? "text-black " : " text-black"
                } hover:text-[#526818]  `
              }
            >
              Notifications
            </NavLink>
          </div>
           <div className=" flex gap-3 items-center">
            <div>
              <img className="w-4 h-4" src={setting} alt="" />
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` flex justify-center items-center duration-200 ${
                  isActive ? "text-black " : " text-black"
                } hover:text-[#526818]  `
              }
            >
              Settings
            </NavLink>
          </div>
        </div>
        </div>
     
    </div>
  );
}
export default Header