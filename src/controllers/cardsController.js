const cardsModel = require('../models/cardsModel');

exports.render = async (req, res) => {
  try {
    const cards = await cardsModel.find();
    res.status(200).render('index', { cards: cards });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'error retrieving cards information' });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: 'body content cannot be empity' });
    }

    const card = new cardsModel({
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
  if (req.params.id) {
    const id = req.params.id;

    const card = await cardsModel.findById(id);

    if (!card) {
      res.status(404).send({ message: `not found the card with id ${id}` });
    } else {
      res.status(200).send(card);
    }
  } else {
    const cards = await cardsModel.find();

    if (!cards) {
      res.status(500).send({ message: `error retrieving cards information` });
    } else {
      res.status(200).send(cards);
    }
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'data to update cannot be empty' });
  }

  try {
    const id = req.params.id;

    const card = await cardsModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    if (!card) {
      res.status(404).send({ message: `cannot update card with ${id}` });
    } else {
      res.status(200).send(card);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'error update card information' });
  }
};

exports.delete = async (req, res) => {
  let id;
  
  try {
    id = req.params.id;

    const card = await cardsModel.findByIdAndDelete(id);

    console.log(card);

    if (!card) {
      res.status(404).send({ message: `cannot delete card with id ${id}` });
    } else {
      res.status(200).send({ message: 'card was deleted successfully' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || `Cannot delete card with  id ${id}` });
  }
};
