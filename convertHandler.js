function ConvertHandler() {
  // Extracts the numerical part of the input for conversion.
  this.getNum = function (input) {
    let result;
    // Extract the numerical part before the first letter (unit)
    const numInput = input.match(/^[\d./]+/);
    const numString = numInput ? numInput[0] : "1"; // Default to "1" if no number is provided

    // Handling a double-fraction error
    if ((numString.match(/\//g) || []).length > 1) {
      return "invalid number"; // Return error for double-fraction, mapping to the test checking for double-fraction input.
    }

    // Evaluate single fraction if present
    if (numString.includes("/")) {
      const [numerator, denominator] = numString.split("/").map(Number);
      result = numerator / denominator;
    } else {
      result = Number(numString); // Parse directly for whole numbers and decimals
    }

    // Check for invalid numbers (NaN, infinity)
    if (isNaN(result) || !isFinite(result)) {
      return "invalid number"; // Maps to tests checking for invalid number input.
    }

    return result; // Maps to tests for correctly reading whole, decimal, and fractional inputs.
  };

  // Extracts and returns the unit part of the input string.
  this.getUnit = function (input) {
    let result;
    const unitRegex = /[a-zA-Z]+$/;
    result = input.match(unitRegex)[0].toLowerCase();
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    if (!validUnits.includes(result)) {
      return "invalid unit"; // Maps to tests checking for invalid unit input.
    }
    return result === "l" ? "L" : result; // Special handling for liter to maintain case sensitivity, mapping to unit case sensitivity tests.
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    const unitConverted = {
      gal: "L",
      L: "gal",
      km: "mi",
      mi: "km",
      kg: "lbs",
      lbs: "kg",
    };
    result = unitConverted[initUnit];
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    const unitSpelled = {
      gal: "gallons",
      L: "liters",
      km: "kilometers",
      mi: "miles",
      kg: "kilograms",
      lbs: "pounds",
    };
    result = unitSpelled[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lToGal = 1 / 3.78541;
    const kgToLbs = 1 / 0.453592;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const kmToMi = 1 / 1.60934;
    const conversionRates = {
      gal: galToL,
      L: lToGal,
      kg: kgToLbs,
      lbs: lbsToKg,
      mi: miToKm,
      km: kmToMi,
    };
    let result = parseFloat((initNum * conversionRates[initUnit]).toFixed(5));

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let output = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return output;
  };
}

module.exports = ConvertHandler;
