const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/checkout', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create()
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2020-08-27' }
  )
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 099,
    currency: 'usd',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  })

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  })
})

// Static Files

// Starting Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
