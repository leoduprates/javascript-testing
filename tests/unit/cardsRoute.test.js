const cardsRoute = require('../../src/routes/cardsRoute');

describe('cards route', () => {
  it('should create card routes', () => {
    const routes = [];

    cardsRoute.stack.forEach((stack) => {
      routes.push({
        path: stack.route.path,
        method: stack.route.stack[0].method,
      });
    });

    expect(routes.sort()).toEqual(
      [
        { path: '/api/cards/:id', method: 'delete' },
        { path: '/', method: 'get' },
        { path: '/api/cards', method: 'get' },
        { path: '/api/cards/:id', method: 'get' },
        { path: '/api/cards', method: 'post' },
        { path: '/api/cards/:id', method: 'put' },
      ].sort(),
    );
  });
});
