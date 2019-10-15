/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default [
  {
    url: "/client/tickets",
    name: "Tickets",
    slug: "Tickets",
    icon: "MessageSquareIcon",
  },
  {
    url: "/client/invoices",
    name: "Invoices",
    slug: "invoices",
    icon: "BookmarkIcon",
  },
  {
    url: "/client/admin/company",
    name: "Company",
    slug: "company",
    icon: "TruckIcon",
  },
  {
    url: "/client/admin/employees",
    name: "Employees",
    slug: "employees",
    icon: "UsersIcon",
  },
	{
		url: '/profile',
		name: "Profile",
		slug: "profile",
		icon: "UserIcon",
	},
]
