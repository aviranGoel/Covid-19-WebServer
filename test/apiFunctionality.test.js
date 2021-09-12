// Importing mocha and chai.
const mocha = require("mocha");
const chai = require("chai");

const expect = chai.expect;

// Importing commonFunctionality.js where our code is written.
const apiFunctionality = require("../routes/utils/apiFunctionality/apiFunctionality");

describe("apiFunctionality.js tests", () => {
  describe("apiFunctionality.getDatesConfirmedCasesOfCountryAndPopulation_usingAPI(country) Test", () => {
    it("Should equal to Error!", function (done) {
      // Call the function we're testing.
      var result =
        apiFunctionality.getDatesConfirmedCasesOfCountryAndPopulation_usingAPI(
          "NotCountry"
        );
      // Assertions.
      result.then(
        function (reult_data) {
          expect(reult_data).to.equal("Error!");
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
