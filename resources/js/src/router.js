/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import User from './user'
import store from './store/store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [

      {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
        path: '',
        component: () => import('@/layouts/main/Main.vue'),
        children: [
           // =============================================================================
          // Common Routes
          // =============================================================================
          {
            path: '/profile',
            name: 'profile',
            component: () => import('@/views/Profile.vue'),
          },
          // =============================================================================
          // Client Routes
          // =============================================================================
          {
            path: '/client/tickets',
            name: 'tickets-client',
            component: () => import('@/views/client/Tickets.vue'),
          },
          {
            path: '/client/invoices',
            name: 'invoices-client',
            component: () => import('@/views/client/Invoices.vue'),
          },
          // =============================================================================
          // Support Routes
          // =============================================================================
          {
            path: '/support/home',
            name: 'home-support',
            component: () => import('@/views/support/Home.vue'),
          },
          // =============================================================================
          // Admin Routes
          // =============================================================================
          {
            path: '/admin/home',
            name: 'home-admin',
            component: () => import('@/views/admin/Home.vue'),
          },
          {
            path: '/admin/tickets',
            name: 'tickets-admin',
            component: () => import('@/views/admin/Tickets.vue'),
          },
          {
            path: '/admin/companies',
            name: 'companies-admin',
            component: () => import('@/views/admin/Companies.vue'),
          },
          {
            path: '/admin/clients',
            name: 'clients-admin',
            component: () => import('@/views/admin/Clients.vue'),
          },
          {
            path: '/admin/staff',
            name: 'staff-admin',
            component: () => import('@/views/admin/Staff.vue'),
          },
          {
            path: '/admin/invoices',
            name: 'invoices-admin',
            component: () => import('@/views/admin/Invoices.vue'),
          },
          {
            path: '/admin/company',
            name: 'company-admin',
            component: () => import('@/views/admin/Company.vue'),
          },
        ],
      },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
      {
        path: '',
        component: () => import('@/layouts/full-page/FullPage.vue'),
        children: [
      // =============================================================================
      // PAGES
      // =============================================================================
          {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/Login.vue')
          },
          {
            path: '/error-404',
            name: 'pageError404',
            component: () => import('@/views/pages/Error404.vue')
          },
        ]
      },
      // Redirect to 404 page, if no match found
      {
        path: '/*',
        redirect: '/error-404'
      },
    ],
})

router.beforeEach(async (to, from, next) =>{
  await User.getUserInfo()
  if(to.name !== 'login'){
    if (User.user.authenticated === true) {
      next()
    }
    else {
      next('/login')
    }
  }
  else{
    if (User.user.authenticated === true) {
      if(store.state.AppActiveUser.rank == 3) {
        next('/admin/home')
      } else if (store.state.AppActiveUser.rank == 2) {
        next('/financial/home')
      } else if (store.state.AppActiveUser.rank == 1) {
        next('/support/home')
      } else if (store.state.AppActiveUser.rank == 0) {
        next('/client/tickets')
      }
    }
    else {
      next()
    }
  }
})

export default router
