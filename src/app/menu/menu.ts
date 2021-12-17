import { CoreMenu } from '@core/types';

export const menu: CoreMenu[] = [
  {
    id: 'CRM',
    type: 'section',
    title: 'Sail',
    // translate: 'MENU.CRM.SECTION',
    icon: 'box',
    children: [
      {
        id: 'calendario-menu',
        title: 'CALENDARIO',
        // translate: 'MENU.CRM.DISABLED',
        icon: 'calendar',
        type: 'item',
        url: './sail/calendario'
        // disabled: true
      },
      {
        id: 'buscar',
        title: 'BUSCAR',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'search',
        type: 'item',
        url: '/sail/home'
      },
      {
        id: 'Contactos',
        title: 'CONTACTOS',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'users',
        type: 'item',
        url: '/sail/contactos'
      },
      {
        id: 'NUEVO_LED',
        title: 'NUEVO LEAD',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'plus-circle',
        type: 'item',
        url: '/sail/nuevo'
      },
      {
        id: 'Automatismos',
        title: 'AUTOMATISMOS',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'file-text',
        type: 'item',
        url: '/sail/automatismos'
      },
      {
        id: 'IMP-EXP',
        title: 'ABM',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'life-buoy',
        type: 'item',
        url: '/sail/abm'
      },
      {
        id: 'LLAMADAS',
        title: 'LLAMADAS',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'phone-call',
        type: 'item',
        url: '/sail/llamadas'
      },
      {
        id: 'DASHBOARD',
        title: 'DASHBOARD',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'home',
        type: 'item',
        url: '/sail/framedash'
      },
      {
        id: 'METRICAS',
        title: 'METRICAS',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'trending-up',
        type: 'item',
        url: '/sail/metricas'
      },
      {
        id: 'configuracion-sail',
        title: 'ADMINISTRACION',
        // translate: 'MENU.CRM.LEVELS.COLLAPSIBLE',
        icon: 'menu',
        type: 'collapsible',
        children: [
          {
            id: 'configuraciones',
            title: 'CONFIGURACIONES',
            // translate: 'MENU.CRM.LEVELS.SECOND',
            icon: 'sliders',
            type: 'item',
            url: '#'
          },
          {
            id: 'centroderecursos',
            title: 'RECURSOS',
            // translate: 'MENU.CRM.LEVELS.SECOND1.COLLAPSIBLE',
            icon: 'circle',
            type: 'collapsible',
            children: [
              {
                id: 'consecionarios',
                title: 'Consecionarias',
                // translate: 'MENU.CRM.LEVELS.SECOND1.THIRD',
                type: 'item',
                url: '#'
              },
              {
                id: 'usuarios',
                title: 'Usuarios',
                // translate: 'MENU.CRM.LEVELS.SECOND1.THIRD1',
                type: 'item',
                url: '#'
              },
              {
                id: 'origenes',
                title: 'Origenes',
                // translate: 'MENU.CRM.LEVELS.SECOND1.THIRD1',
                type: 'item',
                url: '#'
              }
            ]
          }
        ]
      },
      {
        id: 'ACADEMY',
        title: 'ACADEMY',
        // translate: 'MENU.CRM.DOCUMENTATION',
        icon: 'book-open',
        type: 'item',
        url: '#',
        externalUrl: true,
        openInNewTab: true
      },
      {
        id: 'Atencion-al-Cliente',
        title: 'ATENCION',
        // translate: 'MENU.CRM.DOCUMENTATION',
        icon: 'file-text',
        type: 'item',
        url: '#',
        externalUrl: true,
        openInNewTab: true
      },
      {
        id: 'Novedades',
        title: 'NOVEDADES',
        // translate: 'MENU.CRM.DOCUMENTATION',
        icon: 'refresh-ccw',
        type: 'item',
        url: '#',
        externalUrl: true,
        openInNewTab: true
      },
      {
        id: 'Tutorial',
        title: 'TUTORIALES',
        // translate: 'MENU.CRM.DOCUMENTATION',
        icon: 'coffee',
        type: 'item',
        url: '#',
        externalUrl: true,
        openInNewTab: true
      },
      {
        id: 'PBX',
        title: 'PBX',
        // translate: 'MENU.CRM.DOCUMENTATION',
        icon: 'file-text',
        type: 'item',
        url: '#',
        externalUrl: true,
        openInNewTab: true
      }
    ]
  }
];


// 'leads','allleads','newleads','calendar','exportleads','acds','dashboard','config','resources','videos','calendar','contacts',

// ,'sfa','import','acds','dashboard','metrics'

//   ,'config.concessionaires'
//     ,'config.origins'
//       ,'config.channels'
//         ,'config.users'
//           ,'resources', 
// ,'resources.kit'
// ,'videos', 
// ,'pbx',
// ,'news',
// ,'academy',

