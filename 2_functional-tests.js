const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000); // Sets the timeout for all tests in this suite to 5 seconds

  suite("Integration tests with chai-http", function () {
    test("Test GET /api/convert for a valid input: 10L", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=10L")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          const body = JSON.parse(res.text);
          assert.approximately(body.returnNum, 2.64172, 0.01); // Assuming 1L = 0.264172 gal
          assert.equal(body.returnUnit, "gal"); // Expecting the return unit to be gallons
          done();
        });
    });

    test("Test GET /api/convert for an invalid input unit: 32g", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=32g")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
          done();
        });
    });

    test("Test GET /api/convert for an invalid number: 3/7.2/4kg", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kg")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
          done();
        });
    });

    test("Test GET /api/convert for an invalid number and unit: 3/7.2/4kilomegagram", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
          done();
        });
    });

    test("Test GET /api/convert with no number (default to 1): kg", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=kg")
        .end((err, res) => {
          assert.equal(res.status, 200);
          const body = JSON.parse(res.text);
          assert.equal(body.initNum, 1);
          assert.equal(body.initUnit, "kg");
          done();
        });
    });
  });
});
