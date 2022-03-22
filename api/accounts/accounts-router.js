const router = require('express').Router()
const Account = require('./accounts-model')

const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware')


router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC

  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  }
  
  catch(error) {
    next(error)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC

  res.json(req.account)
  next()
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC

  Account.create(req.body)
  .then(newAccount => {
      res.status(201).json(newAccount)
    } 
  ).catch(err => {
    next(err)
  })
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC

  const updated = await Account.updateById(req.params.id, req.body)

  try {
    res.status(200).json(updated)
  }

  catch(error) {
    next(error)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC

  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  }

  catch(error) {
    next(error)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC

  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
