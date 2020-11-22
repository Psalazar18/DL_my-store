import { shallowMount, mount, createLocalVue } from '@vue/test-utils'

import Navbar from '../../src/components/Navbar'
import Vuex from "vuex"
import myStore from '../mocks/store'

import VueRouter from 'vue-router'
import myRoutes from "../mocks/routes"

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

const store = new Vuex.Store(myStore)
const router = new VueRouter(myRoutes)

describe('Navbar.vue', () => {
    it('muestra menu de login si no hay usuario', () => {
    store.dispatch('updateUser', undefined)
    const wrapper = mount(Navbar, {
        propsData: {
        title: "Mi Tienda"
        },
        localVue,
        store,
        router,
    })
    expect(wrapper.text()).toContain('Login')
    }),
    it('muestra menu de usuario si está logueado', () => {
    store.dispatch('updateUser', { email: 'user1@mystore.com' })
    const wrapper = mount(Navbar, {
        propsData: {
        title: "Mi Tienda"
        },
        localVue,
        store,
        router,
    })
    expect(wrapper.text()).toContain('Usuario')
    expect(wrapper.text()).not.toContain('Login')
    })
})