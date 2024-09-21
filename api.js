"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input; // Extracting input from query parameters
    const initNum = convertHandler.getNum(input); // Getting the numerical part of the input
    const initUnit = convertHandler.getUnit(input); // Getting the unit part of the input

    // Handling invalid input scenarios
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      // Maps to a test checking the response for both invalid number and unit
      res.send("invalid number and unit");
    } else if (initNum === "invalid number") {
      // Maps to a test checking the response for an invalid number input
      res.send("invalid number");
    } else if (initUnit === "invalid unit") {
      // Maps to a test checking the response for an invalid unit input
      res.send("invalid unit");
    } else {
      // All inputs are valid, proceed with the conversion
      const returnNum = convertHandler.convert(initNum, initUnit); // Performing the conversion
      const returnUnit = convertHandler.getReturnUnit(initUnit); // Getting the corresponding return unit
      const toString = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      ); // Generating the conversion description string

      // Responding with the conversion result in JSON format
      // This part maps to tests checking for the correct conversion output,
      // including the numerical result, units, and descriptive string.
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: toString,
      });
    }
  });
};
