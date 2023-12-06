import * as Feather from "react-icons/fi";
import Link from "next/link";
import { RiDashboard3Line } from 'react-icons/ri';
import { BiTransferAlt } from 'react-icons/bi';
import { FaArrowRight } from "react-icons/fa";
import {AiTwotoneThunderbolt} from 'react-icons/ai'
import UILogout from '@core/auth/UILogout'
import logoContraido from "public/img/logo-contraido.jpg";
import logoExpandido from "public/img/logo-expandido.png";
import Image from "next/image";

function SideBar() {
  return (
    <>
        <nav className="sidebar-content close js-simplebar">
          <a id="arrow-btn">
              <FaArrowRight  className="expand-btn"/>
            </a>  
          <header className="header-nav">
            <a className="sidebar-brand mb-3" href="#">
              <Image id="log-expand" src={logoExpandido} alt="logo" width={150} />
              <Image id="log-contrad" src={logoContraido} alt="logo" width={32} />
            </a>
          </header>
          <div className="navigation">
            <ul className="sidebar-nav">
              <li className="sidebar-item" id="dashboard" >
                <Link  className="sidebar-link"  href="dashboard">
                {/* RiDashboard3Line */}
                  <RiDashboard3Line size={30} className="nav-text"/>
                  <span className="icon-text">Dashboard</span>
                </Link>
              </li>
                <li className="sidebar-item" id="transacciones">
                  <Link className="sidebar-link" href="transactions">
                    <BiTransferAlt size={30} className="nav-text" />
                    <span className="icon-text">Transacciones</span>
                  </Link>
                </li>

                <li className="sidebar-item" id="errores">
                  <Link className="sidebar-link" href="errors">
                    <Feather.FiBell size={30} className="nav-text" />
                    <span className="icon-text">Errores</span>
                  </Link>
                </li>

                <li className="sidebar-item" id="vehiculos">
                  <Link className="sidebar-link" href="vehicles">
                    <Feather.FiTruck size={30} className="nav-text" />
                    <span className="icon-text">Vehiculos</span>
                  </Link>
                </li>

                <li className="sidebar-item" id="usuarios">
                  <Link className="sidebar-link" href="users">
                    <Feather.FiUsers size={30} className="nav-text" />
                    <span className="icon-text">Usuarios</span>
                  </Link>
                </li>

                <li className="sidebar-item" id="perfil-carga">
                  <Link className="sidebar-link" href="chargeperfil">
                    <AiTwotoneThunderbolt size={30} className="nav-text" />
                    <span className="icon-text">Perfiles carga</span>
                  </Link>
                </li>

                {/*<li className="sidebar-item">
                  <Link className="sidebar-link" href="chargebox">
                    <RiDashboard3Line size={30} className="nav-text me-3"/>
                    <span className="nav-text">Cargadores</span>
                  </Link>
                </li> */}

                {/* <li className="sidebar-item">
                  <Link className="sidebar-link" href="vehicles">
                    <Feather.FiTruck size={18} className="nav-text me-3" />
                    <span className="nav-text">Vehicles</span>
                  </Link>
                </li> */}
              </ul>
          </div>
          <footer>
            <div className="log-out-item">
              <ul className="sidebar-nav">
                <li className="sidebar-item" id="log-out">
                  <UILogout />
                </li>
              </ul>
            </div>
          </footer>
        </nav>
      
    </>
  );
}

export default SideBar;
