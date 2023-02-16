import React from 'react';
import * as RiIcons from 'react-icons/ri';
import * as CiIcons from "react-icons/ci";

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/home',
    icon: <CiIcons.CiHome />,
  },
  {
    title: 'Perfil',
    path: '/profile',
    icon: <CiIcons.CiUser />
  },
  {
    title: 'Estoque',
    path: '#',
    icon: <CiIcons.CiBarcode />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Movimentações',
        path: '/stock/moviments',
        icon: <CiIcons.CiRepeat />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Produtos',
    path: '#',
    icon: <CiIcons.CiShop />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Cadastro',
        path: '/products/registration',
        icon: <CiIcons.CiCirclePlus />,
        cName: 'sub-nav'
      },
      {
        title: 'Visualização',
        path: '/products/visualization',
        icon: <CiIcons.CiLaptop />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Marcas',
    path: '#',
    icon: <CiIcons.CiShoppingTag />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Cadastro',
        path: '/brands/registration',
        icon: <CiIcons.CiCirclePlus />,
        cName: 'sub-nav'
      },
      {
        title: 'Visualização',
        path: '/brands/visualization',
        icon: <CiIcons.CiLaptop />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Fornecedores',
    path: '#',
    icon: <CiIcons.CiDeliveryTruck />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Cadastro',
        path: '/providers/registration',
        icon: <CiIcons.CiCirclePlus />,
        cName: 'sub-nav'
      },
      {
        title: 'Visualização',
        path: '/providers/visualization',
        icon: <CiIcons.CiLaptop />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Configurações',
    path: '#',
    icon: <CiIcons.CiSettings />,
  
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  
    subNav: [
      {
        title: 'Cores',
        path: '#',        
        icon: <CiIcons.CiPickerHalf />,
        cName: 'sub-nav'
      },
    ]
  },
];

export const SidebarDataCollapsed = [
  {
    path: '/home',
    icon: <CiIcons.CiHome />,
  },
  {
    path: '/profile',
    icon: <CiIcons.CiUser />
  },
  {
    path: '#',
    icon: <CiIcons.CiShop />,
  },
  {
    path: '#',
    icon: <CiIcons.CiSettings />,
  }
];
