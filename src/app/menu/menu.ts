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
        url: '#'
        // disabled: true
      },
      {
        id: 'buscar',
        title: 'BUSCAR',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'search',
        type: 'item',
        url: '#'
      },
      {
        id: 'Contactos',
        title: 'CONTACTOS',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'users',
        type: 'item',
        url: '#'
      },
      {
        id: 'NUEVO_LED',
        title: 'NUEVO LED',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'plus-circle',
        type: 'item',
        url: '#'
      },
      {
        id: 'Automatismos',
        title: 'AUTOMATISMOS',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'file-text',
        type: 'item',
        url: '#'
      },
      {
        id: 'IMP-EXP',
        title: 'ABM',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'life-buoy',
        type: 'item',
        url: '#'
      },
      {
        id: 'LLAMADAS',
        title: 'LLAMADAS',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'phone-call',
        type: 'item',
        url: '#'
      },
      {
        id: 'DASHBOARD',
        title: 'DASHBOARD',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'home',
        type: 'item',
        url: '#'
      },
      {
        id: 'METRICAS',
        title: 'METRICAS',
        // translate: 'MENU.CRM.SUPPORT',
        icon: 'trending-up',
        type: 'item',
        url: '#'
      },
      {
        id: 'configuracion-sail',
        title: 'configuracion sail',
        // translate: 'MENU.CRM.LEVELS.COLLAPSIBLE',
        icon: 'menu',
        type: 'collapsible',
        children: [
          {
            id: 'configuraciones',
            title: 'Configuraciones',
            // translate: 'MENU.CRM.LEVELS.SECOND',
            icon: 'sliders',
            type: 'item',
            url: '#'
          },
          {
            id: 'centroderecursos',
            title: 'centroderecursos',
            // translate: 'MENU.CRM.LEVELS.SECOND1.COLLAPSIBLE',
            icon: 'circle',
            type: 'collapsible',
            children: [
              {
                id: 'third-level',
                title: 'Third Level',
                // translate: 'MENU.CRM.LEVELS.SECOND1.THIRD',
                type: 'item',
                url: '#'
              },
              {
                id: 'third-level1',
                title: 'Third Level',
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
        externalUrl: true,
        openInNewTab: true
      },
      {
        id: 'Atencion-al-Cliente',
        title: 'Atencion al Cliente',
        // translate: 'MENU.CRM.DOCUMENTATION',
        icon: 'file-text',
        type: 'item',
        externalUrl: true,
        openInNewTab: true
      },
      {
        id: 'Novedades',
        title: 'Novedades',
        // translate: 'MENU.CRM.DOCUMENTATION',
        icon: 'refresh-ccw',
        type: 'item',
        externalUrl: true,
        openInNewTab: true
      },
      {
        id: 'Tutorial',
        title: 'Tutorial',
        // translate: 'MENU.CRM.DOCUMENTATION',
        icon: 'coffee',
        type: 'item',
        externalUrl: true,
        openInNewTab: true
      },
      {
        id: 'PBX',
        title: 'PBX',
        // translate: 'MENU.CRM.DOCUMENTATION',
        icon: 'file-text',
        type: 'item',
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

