const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  if (!categoryData) {
    res.status(404).json({ message: 'No categories found!'})
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id},

      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
    ],
  })
  if (!categoryData) {
    res.status(404).json({ message: 'No category found with that id!'})
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});


router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id,
    },
  }
)
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => {
    console.log(err, "No category found with that id!");
    res.json(err);
  });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!categoryData) {
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }

  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
