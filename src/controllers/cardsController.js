const CardsModel = require('../models/cardsModel');

exports.render = async (req, res) => {
  try {
    const cards = await CardsModel.find();
    res.status(200).render('index', { cards });
  } catch (error) {
    res.status(500).send({ message: error.message || 'error retrieving cards information' });
  }
};

exports.create = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: 'body content cannot be empity' });
      return;
    }

    const card = new CardsModel({
      title: req.body.title,
      description: req.body.description,
    });

    await card.save();

    res.status(200).send(card);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error ocurred while creating a operation',
    });
  }
};

exports.find = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const card = await CardsModel.findById(id);

      if (card == null) {
        res.status(404).send({ message: `not found the card with id ${id}` });
      } else {
        res.status(200).send(card);
      }
    } else {
      const cards = await CardsModel.find();

      if (cards.length === 0) {
        res.status(404).send({ message: 'error retrieving cards information' });
      } else {
        res.status(200).send(cards);
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'error find card information' });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'data to update cannot be empty' });
  }

  try {
    const { id } = req.params;

    const card = await CardsModel.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    });

    if (card == null) {
      res.status(404).send({ message: `cannot update card with ${id}` });
    } else {
      res.status(200).send(card);
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'error update card information' });
  }
};

exports.delete = async (req, res) => {
  let id;

  try {
    id = req.params.id;

    const card = await CardsModel.findByIdAndDelete(id);

    if (card == null) {
      res.status(404).send({ message: `cannot delete card with id ${id}` });
    } else {
      res.status(200).send({ message: 'card was deleted successfully' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || 'error delete card' });
  }
};
