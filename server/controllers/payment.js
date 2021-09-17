const Payment = require("../models").Payment;
const PaymentPurpose = require("../models").PaymentPurpose;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Query = new require("../utility/crud");
const { SITE_URL } = require("../utility/constants");
const { v4: uuidv4 } = require("uuid");
const status = {
  attempted: "attempted",
  paid: "paid",
  fail: "unpaid",
};
require("dotenv").config();

const { SERVER_ERROR, OK, VALIDATION_ERROR } = require("../utility/statusCode");
const query = new Query(Payment);

module.exports = {
  paymentSession: async (req, res) => {
    const { userId, amount, paymentPurposeId, other, hasOther } = req.body;

    let paymentPurpose;
    if (paymentPurposeId && !hasOther) {
      const result = await PaymentPurpose.findByPk(paymentPurposeId);
      if (result) {
        paymentPurpose = result.name;
      }
    } else if (other) {
      paymentPurpose = other;
    }
    const randNum = Math.floor(100000 + Math.random() * 900000);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: paymentPurpose,
              images: [
                "https://scotsudy.s3.eu-west-2.amazonaws.com/stripePayment.png",
              ],
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${SITE_URL}paymentSuccess`,
      cancel_url: `${SITE_URL}paymentError`,
    });

    if (session.url) {
      await query.add({
        refId: randNum,
        amount: amount,
        status: status.attempted,
        stripeSessionId: session.id,
        paymentPurposeId,
        userId,
        other,
      });
    }
    return res
      .status(OK)
      .send({ error: false, session: session.url, refId: randNum });
  },

  updatePayment: async (req, res) => {
    const { status, refId } = req.body;

    const findPaymentById = await Payment.findOne({ refId });
    if (findPaymentById) {
      const update = await query.update(findPaymentById.id, { status });

      return res.status(OK).send({ error: false, data: update });
    } else return res.status(OK).send({ error: true });
  },

  findUserPayments: async (req, res) => {
    const userId = req.body.userId;
    const data = await Payment.findAll({
      where: { userId, status: status.paid },
      order: [["updatedAt", "desc"]],
    });
    return res.status(OK).send({ error: false, data });
  },

  findAllPayments: async (req, res) => {
    const data = await Payment.findAll({
      include: [{ all: true }],
      order: [["updatedAt", "desc"]],
    });
    return res.status(OK).send({ error: false, data: data });
  },

  stripeSessionStatus: async (req, res) => {
    const refId = req.body.refId;
    const result = await Payment.findOne({
      where: { refId },
    });
    if (result) {
      const session = await stripe.checkout.sessions.retrieve(
        result.stripeSessionId
      );
      return res.status(OK).send({ error: false, session });
    } else {
      return res.status(OK).send({ error: true, session });
    }
  },
};
