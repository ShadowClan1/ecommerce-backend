const { RES, STATUS } = require("../utils/ResponseHandlers");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

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
    const list = [];

    RES(res, STATUS.OK, "Products list fetched successfully", list);
  } catch (err) {
    RES(res, STATUS.INTERNAL_SERVER_ERROR, err.message);
  }
});

router.post("/apply-copoun", async (req, res, next) => {
  try {
    const { copounCode } = req.body;

    let { isValid, discountAmount } = applyCopoun(copounCode);
    if (!isValid) {
      return RES(res, STATUS.BAD_REQUEST, "Copoun code not valid");
    }

    RES(res, STATUS.OK, "Copoun redeemed successfully", { discountAmount });
  } catch (err) {
    RES(res, STATUS.INTERNAL_SERVER_ERROR, err.message);
  }
});

async function applyCopoun(copounCode) {
  return { isValid: true, discountAmount: 10 };
}

module.exports = router;
