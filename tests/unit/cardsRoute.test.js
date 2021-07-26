const cardsRoute = require('../../src/routes/cardsRoute');

describe('Cards Route', () => {
  it('should create card routes', () => {
    let routes = [];

    for (const stack of cardsRoute.stack) {
      routes.push({
        path: stack.route.path,
        method: stack.route.stack[0].method,
      });
    }

    expect(routes.sort()).toEqual(
      [
        { path: '/api/cards/:id', method: 'delete' },
        { path: '/', method: 'get' },
        { path: '/api/cards', method: 'get' },
        { path: '/api/cards', method: 'post' },
        { path: '/api/cards/:id', method: 'put' },
      ].sort()
    );
  });
});
