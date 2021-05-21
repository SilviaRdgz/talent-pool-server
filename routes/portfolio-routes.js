const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Portfolio = require("../models/portfolio-model");

// POST => Create new portfolio

//moved the _id to req.body instead of req.user and the route seems to work. 
// Am I getting the right data?

router.post("/portfolios", (req, res, next) => {
  const { email, imageUrl, name, about, role} = req.body;
  console.log("user", req.user)
   const {_id} = req.user


  Portfolio.create({ email, imageUrl, name, about, role, owner: _id })
    .then((createdPortfolio) => {
      res.status(200).json(createdPortfolio);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

// GET => Return all porfolios
router.get("/portfolios", (req, res, next) => {
  Portfolio.find()
    .then((allTheportfolios) => {
      res.status(200).json(allTheportfolios);
    })
    .catch((err) => {
      res.status(500).json(err);
      next(err);
    });
});

// GET route => to get a specific portfolio/detailed view
router.get("/portfolios/:id", (req, res, next) => {
  const { id } = req.params;
console.log("COMING FROM FRONTEND", id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Portfolio.find({owner: id})
    .then((portfolio) => {
      console.log(portfolio)
      res.status(200).json(portfolio);
    })
    .catch((error) => {
      res.json(error);
      next(err);
    });
});

router.get("/recruitment/:id", (req, res, next) => {
  const { id } = req.params;
console.log("COMING FROM FRONTEND", id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Portfolio.findById(id)
    .then((portfolio) => {
      console.log(portfolio)
      res.status(200).json(portfolio);
    })
    .catch((error) => {
      res.json(error);
      next(err);
    });
});


// PUT route => to update a specific portfolio
router.put("/portfolios/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Portfolio.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({
        message: `portfolio with ${id} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
      next(err);
    });
});

// DELETE route => to delete a specific portfolio
router.delete("/portfolios/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Portfolio.deleteOne({owner: id})
    .then(() => {
      res.json({
        message: `portfolio with ${id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.json({ error, errorMessage: `Something went wrong` });
    });
});

module.exports = router;
