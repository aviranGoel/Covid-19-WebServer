// Importing mocha and chai.
const mocha = require("mocha");
const chai = require("chai");

const expect = chai.expect;

// Importing commonFunctionality.js where our code is written.
const commonFunctionality = require("../routes/utils/commonFunctionality/commonFunctionality");

describe("commonFunctionality.js tests", () => {
  describe("commonFunctionality.formatDateTo_yyyymmdd() Test", () => {
    it("Should equal to 01-09-2021", function (done) {
      // Call the function we're testing.
      var result = commonFunctionality.formatDateTo_yyyymmdd("01-09-2021");

      // Assertions.
      result.then(
        function (reult_data) {
          expect(reult_data).to.equal("2021-09-01");
          done();
        },
        function (error) {
          assert.fail(error);
          done();
        }
      );
    });
  });

  

  describe("commonFunctionality.formatDateTo_ddmmyyyy() Test", () => {
    it("Should equal to 2021-09-01", function (done) {
      // Call the function we're testing.
      var result = commonFunctionality.formatDateTo_ddmmyyyy("2021-09-01");

      // Assertions.
      result.then(
        function (reult_data) {
          expect(reult_data).to.equal("01-09-2021");
          done();
        },
        function (error) {
          assert.fail(error);
          done();
        }
      );
    });
  });
});
