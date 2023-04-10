import React, {useState} from "react";
import * as CiIcons from "react-icons/ci";

import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import { COLORS } from "../../../../config/defaultColors";

import "./styles.css";

export function SidebarItens() {

  const isActivePage = (path) => {
    return window.location.pathname === path
  };

  return( 
    <Menu
      menuItemStyles={{
        button: ({ level, active }) => {
             if (level === 0 || level === 1){
              return {
                backgroundColor: active ? COLORS.PrimaryColor : COLORS.SecondColor,
                height: "60px", 
                fontSize: "14px", 
                fontFamily: "sans-serif",
                color: COLORS.DetailsColor,
                '&:hover': {
                   backgroundColor: COLORS.PrimaryColor,
                   color: COLORS.DetailsColor,
                }
              };
             }
          }
      }}
    >
      <MenuItem component={<Link to="/Home" />} active={isActivePage("/Home")}
                prefix="Dashboard" icon={<CiIcons.CiHome style={{ fontSize: "25px" }} />} />

      <SubMenu label="Estoque" icon={<CiIcons.CiBarcode style={{ fontSize: "25px" }} />}>
        <MenuItem component={<Link to="/stock/moviments" />} active={isActivePage("/stock/moviments")}
                  prefix="Movimentações" icon={<CiIcons.CiUser style={{ fontSize: "25px" }} />} />
      </SubMenu>

      <SubMenu label="Produtos" icon={<CiIcons.CiShop style={{ fontSize: "25px" }} />}>
        <MenuItem component={<Link to="/products/registration" />} active={isActivePage("/products/registration")}
                  prefix="Cadastrar" icon={<CiIcons.CiCirclePlus style={{ fontSize: "25px" }} />} />
        <MenuItem component={<Link to="/products/visualization" />} active={isActivePage("/products/visualization")}
                  prefix="Consultar" icon={<CiIcons.CiLaptop style={{ fontSize: "25px" }} />} />
      </SubMenu>

      <SubMenu label="Marcas" icon={<CiIcons.CiShoppingTag style={{ fontSize: "25px" }} />}>
        <MenuItem component={<Link to="/brands/registration" />} active={isActivePage("/brands/registration")}
                  prefix="Cadastrar" icon={<CiIcons.CiCirclePlus style={{ fontSize: "25px" }} />} />
        <MenuItem component={<Link to="/brands/visualization" />} active={isActivePage("/brands/visualization")}
                  prefix="Consultar" icon={<CiIcons.CiLaptop style={{ fontSize: "25px" }} />} />
      </SubMenu>

      <SubMenu label="Fornecedores" icon={<CiIcons.CiDeliveryTruck style={{ fontSize: "25px" }} />}>
        <MenuItem component={<Link to="/providers/registration" />} active={isActivePage("/providers/registration")}
                  prefix="Cadastrar" icon={<CiIcons.CiCirclePlus style={{ fontSize: "25px" }} />} />
        <MenuItem component={<Link to="/providers/visualization" />} active={isActivePage("/providers/visualization")}
                  prefix="Consultar" icon={<CiIcons.CiLaptop style={{ fontSize: "25px" }} />} />
      </SubMenu>

      <SubMenu label="Configurações" icon={<CiIcons.CiSettings style={{ fontSize: "25px" }} />}>
        <MenuItem component={<Link to="/Profile" />} active={isActivePage("/Profile")}
                  prefix="Profile" icon={<CiIcons.CiUser style={{ fontSize: "25px" }} />} />
        <MenuItem component={<Link to="/adm" />} active={isActivePage("/adm")}
                  prefix="ADM" icon={<CiIcons.CiUser style={{ fontSize: "25px" }} />} />
      </SubMenu>
    </Menu>
  ); 
}

export function SidebarItensFooter() {

  return(
    <Menu
     menuItemStyles={{
      button: {
            backgroundColor: COLORS.SecondColor,
            height: "60px", 
            fontSize: "14px", 
            fontFamily: "sans-serif", 
            marginTop: "60px",
            color: COLORS.DetailsColor,
            '&:hover': {
               backgroundColor: COLORS.DetailsColor,
            },
        },
     }}
    >
      <MenuItem className="menu-item" component={<Link to="/login/signin" />} 
                prefix="Sair" icon={<CiIcons.CiLogout style={{ fontSize: "25px" }} />}  />
    </Menu>
  ); 
}