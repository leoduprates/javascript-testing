const cardsModel = require('../../src/models/cardsModel');

describe('cards model', () => {
  it('should create card model', () => {
    const card = new cardsModel({
      title: 'Title value',
      description: 'Description value',
    });

    expect(card.title).toEqual('Title value');
    expect(card.description).toEqual('Description value');
  });

  it('should create the card model only with valid values', () => {
    const card = new cardsModel({
      title: 'Valid value',
      something: 'Invalid value',
    });

    expect(card.title).toEqual('Valid value');
    expect(card.something).not.toBeTruthy();
    expect(card.description).not.toBeTruthy();
  });
});
