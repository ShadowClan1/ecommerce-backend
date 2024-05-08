const { Product, Coupon } = require("../db/db");
const { RES, STATUS } = require("../utils/ResponseHandlers");
require('dotenv').config()
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").load();
// }

const express = require("express"),
  router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let data = "test route";
    RES(res, STATUS.OK, "Test route", data);
  } catch (err) {
    RES(res, STATUS.INTERNAL_SERVER_ERROR, err.message);
  }
});

router.get("/list-products", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    RES(res, STATUS.OK, "Products list fetched successfully", products);
  } catch (err) {
    RES(res, STATUS.INTERNAL_SERVER_ERROR, err.message);
  }
});

router.post("/apply-copoun", async (req, res) => {
  try {
    console.log(req.body);
    const { copounCode } = req.body;

    let { isValid, discountAmount } = await applyCopoun(copounCode);
    if (!isValid) {
      return RES(res, STATUS.BAD_REQUEST, "Copoun code not valid");
    }

    RES(res, STATUS.OK, "Copoun redeemed successfully", { discountAmount });
  } catch (err) {
    RES(res, STATUS.INTERNAL_SERVER_ERROR, err.message);
  }
});

async function applyCopoun(copounCode) {
  const coupon = await Coupon.findOne({ where: { coupon_code: copounCode } });
  if (!coupon) {
    return { isValid: false };
  }
  let discountAmount = coupon.discount;

  return { isValid: true, discountAmount };
}

module.exports = router;
