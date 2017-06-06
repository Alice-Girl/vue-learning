const Vue = require('vue');
const ViewApp = require('../../src/App.vue');

describe('App.vue', function() {
  it('should have correct message', function() {
    expect(ViewApp.data().msg).toBe('Hello from Views App!')
  })

  it('should render correct message', function() {
    const vm = new Vue({
      template: '<div><test-app></test-app><div>',
      components: {
        'test-app': ViewApp
      }
    }).$mount()

    expect(vm.$el.querySelector('h2.red').textContent).toBe('Hello from ViewApp')
  })
})
