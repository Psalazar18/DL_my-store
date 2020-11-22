import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Products from '@/components/Products.vue';
import myStore from '../mocks/store'
import Vuex from 'vuex';

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store(myStore)

describe('Products.vue', () => {
  it('Muestra el titulo "Nuestros Productos"', () => {
    const title = 'Nuestros Productos';
    const wrapper = shallowMount(Products);
    expect(wrapper.find('.title').text()).toBe(title);
  }),
  it('Filtra los productos', () => {
    const productName = 'Computadora';
    const productSearch = 'Teclado';
    const wrapper = shallowMount(Products);
    const searchBox = wrapper.find('input');
    wrapper.vm.products = [{
      name: 'Computadora',
      price: 100.0,
      qty: 1,
    }]
    searchBox.setValue(productSearch);
    expect(wrapper.text()).not.toBe(productName);
  })
  it('Añade los productos al carro', () => {
    const wrapper = shallowMount(Products);
    wrapper.vm.addToCart = jest.fn();
    wrapper.vm.addToCart();
    wrapper.vm.products = [{
      name: 'Computadora',
      price: 100.0,
      qty: 1,
    }]
    wrapper.find('.button').trigger('click');
    expect(wrapper.vm.addToCart.mock.calls).toBe(true);
  })
})