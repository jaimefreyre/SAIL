   function createMenu() {

            // Navigation
            msNavigationService.saveItem('leads', {
                title: gettextCatalog.getString('Mis leads'),
                icon: 'icon-home',
                state: 'app.leads.board',
                weight: 0,
                hidden: function () {
                    if (!$rootScope.hasPermission("leads", "LIST")) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('allleads', {
                title: gettextCatalog.getString('Ver todos'),
                icon: 'icon-file-multiple',
                state: 'app.leads.allboard',
                weight: 0,
                hidden: function () {
                    if (!$rootScope.hasPermission("leads", "LIST")) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('newleads', {
                title: gettextCatalog.getString('Nuevo lead'),
                icon: 'icon-plus',
                state: 'app.leads.get.edit({"lead":0})',
                weight: 0,
                hidden: function () {
                    if (!$rootScope.hasPermission("leads", "LIST")) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('calendar', {
                title: 'Calendario',
                icon: 'icon-calendar-today',
                state: 'app.calendar',
                weight: 0,
                hidden: function () {
                    if (!$rootScope.hasPermission("calendar", "LIST")) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('exportleads', {
                title: gettextCatalog.getString('Exportar leads'),
                icon: 'icon-download',
                // state : 'app.leads.get.edit({"lead":0})',
                click: openExportLeadDialog,
                weight: 0,
                hidden: function () {
                    if (!currentUser.is_admin && !currentUser.is_concession_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('acds', {
                title: gettextCatalog.getString('Llamadas entrantes'),
                icon: 'icon-phone',
                state: 'app.acds',
                weight: 1,
                hidden: function () {
                    if (!currentUser.is_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('dashboard', {
                title: gettextCatalog.getString('Dashboard'),
                icon: 'icon-tile-four',
                // href : 'https://app.powerbi.com/view?r=eyJrIjoiMTBjZmMyMDgtZmM1Yi00YTM4LWE5NTAtYTVkMzBhYWI0MGM1IiwidCI6ImNiODM1OTFjLTBiZjAtNDg3Zi1iM2UzLWM4NzhhMDI3YTEyNiIsImMiOjh9',
                state: 'app.dashboard',
                weight: 2,
                hidden: function () {
                    if (!currentUser.is_admin && !currentUser.is_concession_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('config', {
                title: gettextCatalog.getString('Configuraci??n'),
                icon: 'icon-cog',
                weight: 20,
                hidden: function () {
                    if (!currentUser.is_admin && !currentUser.is_concession_admin) {
                        // if (!currentUser.is_admin){
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('config.concessionaires', {
                title: gettextCatalog.getString('Concesionarios'),
                icon: 'icon-car',
                state: 'app.concessionaires',
                weight: 1,
                hidden: function () {
                    if (!currentUser.is_admin && !currentUser.is_concession_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('config.origins', {
                title: gettextCatalog.getString('Or??genes'),
                icon: 'icon-voicemail',
                state: 'app.origins',
                weight: 2,
                hidden: function () {
                    if (!currentUser.is_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('config.channels', {
                title: gettextCatalog.getString('Canales'),
                icon: 'icon-checkerboard',
                state: 'app.channels',
                weight: 3,
                hidden: function () {
                    if (!currentUser.is_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('config.users', {
                title: gettextCatalog.getString('Usuarios'),
                icon: 'icon-account',
                state: 'app.users.list',
                weight: 4,
                hidden: function () {
                    if (!currentUser.is_admin && !currentUser.is_concession_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('resources', {
                title: gettextCatalog.getString('Centro de recursos'),
                icon: 'icon-document',
                weight: 21,
                hidden: function () {
                }
            });

            msNavigationService.saveItem('resources.kit', {
                title: gettextCatalog.getString('Gu??a desarrollador SML???'),
                icon: 'icon-document',
                weight: 1,
                href: '/assets/documents/manual.pdf',
                hidden: function () {
                }
            });

            msNavigationService.saveItem('videos', {
                title: gettextCatalog.getString('Tutoriales'),
                icon: 'icon-video',
                state: 'app.videos',
                weight: 22,
                hidden: function () {
                }
            });

            msNavigationService.saveItem('resources.clients', {
                title: gettextCatalog.getString('Atenci??n al clientes'),
                icon: 'icon-people',
                weight: 2,
                href: 'https://www.artificialintelligencelead.com/atencion-al-cliente',
                hidden: function () {
                }
            });

            msNavigationService.saveItem('resources.news', {
                title: gettextCatalog.getString('Novedades'),
                icon: 'icon-newspaper',
                weight: 2,
                href: 'https://www.artificialintelligencelead.com/blog',
                hidden: function () {
                }
            });

            msNavigationService.saveItem('resources.academy', {
                title: gettextCatalog.getString('Atenci??n al clientes'),
                icon: 'icon-bank',
                weight: 2,
                href: 'https://www.artificialintelligencelead.com/courses',
                hidden: function () {
                }
            });


        }

        function createMenuSail() {

            // Navigation
            msNavigationService.saveItem('calendar', {
                title: 'Calendario',
                icon: 'icon-calendar-today',
                state: 'app.calendar',
                weight: 0,
                hidden: function () {
                    if (!$rootScope.hasPermission("calendar", "LIST")) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('leads', {
                title: gettextCatalog.getString('Buscar'),
                icon: 'icon-account-search',
                state: 'app.leads.board',
                weight: 0,
                hidden: function () {
                    if (!$rootScope.hasPermission("leads", "LIST")) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('contacts', {
                title: gettextCatalog.getString('Contactos'),
                icon: 'icon-account-multiple',
                state: 'app.leads.list',
                weight: 0,
                hidden: function () {
                    if (!$rootScope.hasPermission("leads", "LIST")) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('newleads', {
                title: gettextCatalog.getString('Nuevo lead'),
                icon: 'icon-plus',
                state: 'app.leads.get.edit({"lead":0})',
                weight: 0,
                hidden: function () {
                    if (!$rootScope.hasPermission("leads", "LIST")) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('sfa', {
                title: gettextCatalog.getString('Mis automatismos'),
                icon: 'icon-arrange-bring-to-front',
                state: 'app.sfas.list',
                weight: 0,
                hidden: function () {
                    if (!$rootScope.hasPermission("leads", "LIST")) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('import', {
                title: gettextCatalog.getString('Importador / Exportador'),
                icon: 'icon-cloud-download',
                state: 'app.imports',
                weight: 0,
                hidden: function () {
                    if (!$rootScope.hasPermission("leads", "LIST")) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('acds', {
                title: gettextCatalog.getString('Llamadas entrantes'),
                icon: 'icon-phone',
                state: 'app.acds',
                weight: 1,
                hidden: function () {
                    if (!currentUser.is_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('dashboard', {
                title: gettextCatalog.getString('Dashboard'),
                icon: 'icon-tile-four',
                // href : 'https://app.powerbi.com/view?r=eyJrIjoiMTBjZmMyMDgtZmM1Yi00YTM4LWE5NTAtYTVkMzBhYWI0MGM1IiwidCI6ImNiODM1OTFjLTBiZjAtNDg3Zi1iM2UzLWM4NzhhMDI3YTEyNiIsImMiOjh9',
                state: 'app.dashboard',
                weight: 2,
                hidden: function () {
                    if (!currentUser.is_admin && !currentUser.is_concession_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('metrics', {
                title: gettextCatalog.getString('M??tricas'),
                icon: 'icon-tile-four',
                state: 'app.metrics',
                weight: 2,
                hidden: function () {
                    if (!currentUser.is_admin && !currentUser.is_concession_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('config', {
                title: gettextCatalog.getString('Configuraci??n'),
                icon: 'icon-cog',
                weight: 20,
                hidden: function () {
                    if (!currentUser.is_admin && !currentUser.is_concession_admin) {
                        // if (!currentUser.is_admin){
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('config.concessionaires', {
                title: gettextCatalog.getString('Concesionarios'),
                icon: 'icon-car',
                state: 'app.concessionaires',
                weight: 1,
                hidden: function () {
                    if (!currentUser.is_admin && !currentUser.is_concession_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('config.origins', {
                title: gettextCatalog.getString('Or??genes'),
                icon: 'icon-voicemail',
                state: 'app.origins',
                weight: 2,
                hidden: function () {
                    if (!currentUser.is_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('config.channels', {
                title: gettextCatalog.getString('Canales'),
                icon: 'icon-checkerboard',
                state: 'app.channels',
                weight: 3,
                hidden: function () {
                    if (!currentUser.is_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('config.users', {
                title: gettextCatalog.getString('Usuarios'),
                icon: 'icon-account',
                state: 'app.users.list',
                weight: 4,
                hidden: function () {
                    if (!currentUser.is_admin && !currentUser.is_concession_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('resources', {
                title: gettextCatalog.getString('Centro de recursos'),
                icon: 'icon-document',
                weight: 21,
                hidden: function () {
                }
            });

            msNavigationService.saveItem('resources.kit', {
                title: gettextCatalog.getString('Gu??a desarrollador SML'),
                icon: 'icon-document',
                weight: 1,
                href: '/assets/documents/manual.pdf',
                hidden: function () {
                }
            });

            msNavigationService.saveItem('resources.extension', {
                title: gettextCatalog.getString('Extensi??n PSA'),
                icon: 'icon-download',
                weight: 2,
                href: '/assets/documents/psa_extension.zip',
                hidden: function () {
                }
            });

            msNavigationService.saveItem('videos', {
                title: gettextCatalog.getString('Tutoriales'),
                icon: 'icon-video',
                state: 'app.videos',
                weight: 22,
                hidden: function () {
                }
            });

            msNavigationService.saveItem('pbx', {
                title: gettextCatalog.getString('PBX'),
                icon: 'icon-link-variant',
                href: 'https://pbx.smartmotorlead.net:1443/',
                weight: 23,
                hidden: function () {
                    if (!currentUser.is_admin && !currentUser.is_concession_admin) {
                        return true;
                    }
                }
            });

            msNavigationService.saveItem('clients', {
                title: gettextCatalog.getString('Atenci??n al cliente'),
                icon: 'icon-people',
                weight: 24,
                href: 'https://www.artificialintelligencelead.com/atencion-al-cliente',
                hidden: function () {
                }
            });

            msNavigationService.saveItem('news', {
                title: gettextCatalog.getString('Novedades'),
                icon: 'icon-newspaper',
                weight: 25,
                href: 'https://www.artificialintelligencelead.com/blog',
                hidden: function () {
                }
            });

            msNavigationService.saveItem('academy', {
                title: gettextCatalog.getString('Academy'),
                icon: 'icon-bank',
                weight: 26,
                href: 'https://www.artificialintelligencelead.com/courses',
                hidden: function () {
                }
            });


        }