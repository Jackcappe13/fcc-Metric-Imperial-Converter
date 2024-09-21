const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input.", function (done) {
    assert.equal(convertHandler.getNum("32L"), 32);
    done();
  });

  test("convertHandler should correctly read a decimal number input.", function (done) {
    assert.equal(convertHandler.getNum("0.5kg"), 0.5);
    done();
  });

  test("convertHandler should correctly read a fractional input.", function (done) {
    assert.equal(convertHandler.getNum("1/2km"), 0.5);
    done();
  });

  test("convertHandler should correctly read a fractional input with a decimal.", function (done) {
    assert.equal(convertHandler.getNum("2.5/6lbs"), 2.5 / 6);
    done();
  });

  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function (done) {
    assert.equal(convertHandler.getNum("3/2/3gal"), "invalid number");
    done();
  });

  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function (done) {
    assert.equal(convertHandler.getNum("L"), 1);
    done();
  });

  test("convertHandler should correctly read each valid input unit.", function (done) {
    let inputUnits = [
      "gal",
      "l",
      "mi",
      "km",
      "lbs",
      "kg",
      "GAL",
      "L",
      "MI",
      "KM",
      "LBS",
      "KG",
    ];
    let expectedUnits = [
      "gal",
      "L",
      "mi",
      "km",
      "lbs",
      "kg",
      "gal",
      "L",
      "mi",
      "km",
      "lbs",
      "kg",
    ];
    inputUnits.forEach(function (unit, index) {
      assert.equal(convertHandler.getUnit(unit), expectedUnits[index]);
    });
    done();
  });

  test("convertHandler should correctly return an error for an invalid input unit.", function (done) {
    assert.equal(convertHandler.getUnit("34g"), "invalid unit");
    done();
  });

  test("convertHandler should return the correct return unit for each valid input unit.", function () {
    let input = ["gal", "L", "mi", "km", "lbs", "kg"];
    let expect = ["L", "gal", "km", "mi", "kg", "lbs"]; // Expected return units
    input.forEach(function (ele, index) {
      assert.equal(convertHandler.getReturnUnit(ele), expect[index]);
    });
  });

  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function (done) {
    const units = ["gal", "L", "mi", "km", "lbs", "kg"];
    const names = [
      "gallons",
      "liters",
      "miles",
      "kilometers",
      "pounds",
      "kilograms",
    ];
    units.forEach(function (unit, index) {
      assert.equal(convertHandler.spellOutUnit(unit), names[index]);
    });
    done();
  });

  test("convertHandler should correctly convert gal to L.", function (done) {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.1);
    done();
  });

  test("convertHandler should correctly convert L to gal.", function (done) {
    assert.approximately(convertHandler.convert(1, "L"), 1 / 3.78541, 0.1);
    done();
  });

  test("convertHandler should correctly convert mi to km.", function (done) {
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.1);
    done();
  });

  test("convertHandler should correctly convert km to mi.", function (done) {
    assert.approximately(convertHandler.convert(1, "km"), 1 / 1.60934, 0.1);
    done();
  });

  test("convertHandler should correctly convert lbs to kg.", function (done) {
    assert.approximately(convertHandler.convert(1, "lbs"), 0.453592, 0.1);
    done();
  });

  test("convertHandler should correctly convert kg to lbs.", function (done) {
    assert.approximately(convertHandler.convert(1, "kg"), 1 / 0.453592, 0.1);
    done();
  });
});
