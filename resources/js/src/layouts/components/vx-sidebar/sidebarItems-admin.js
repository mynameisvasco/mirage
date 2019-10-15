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
    url: "/admin/home",
    name: "Home",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    url: "/admin/tickets",
    name: "Tickets",
    slug: "tickets",
    icon: "MessageSquareIcon",
  },
  {
    url: "/admin/invoices",
    name: "Invoices",
    slug: "invoices",
    icon: "BookmarkIcon",
  },
	{
		url: null, // You can omit this
		name: "Users",
		slug: "users",
		icon: "UsersIcon",
		submenu: [
      {
				url: '/admin/companies',
				name: "Companies",
				slug: "users-companies",
			},
			{
				url: '/admin/staff',
				name: "Staff",
				slug: "users-staff",
			},
		]
  },
  {
    url: "/admin/company",
    name: "Company",
    slug: "company",
    icon: "TruckIcon",
  },
  {
    url: "/profile",
    name: "Profile",
    slug: "profile",
    icon: "UserIcon",
  },
]
