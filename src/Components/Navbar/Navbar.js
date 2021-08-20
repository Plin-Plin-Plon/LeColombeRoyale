import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { SidebarDataFun } from './SidebarDataFun';
import { SidebarDataCli } from './SidebarDataCli';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import './Navbar.css';

function Navbar() {
  const [sidebar, setSidebar] = useState(false)
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  const showSidebar = () => {
    setSidebar(!sidebar)
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      return value;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    if (loading) {
      async function setSideBarData() {
        const token = await getToken();

        if (token) {
          const decodedToken = jwt_decode(token);

          if (decodedToken.roles === "ROLE_USER") {
            setData(SidebarDataCli);
          }
          else if (decodedToken.roles === "ROLE_MOD,ROLE_USER") {
            setData(SidebarDataFun);
          }
          else {
            setData(SidebarData);
          }
          setLoading(false);
        }
      }

      setSideBarData();
    }
  }, [loading])

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {Data.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

      </IconContext.Provider>
    </>
  )
}

export default Navbar
