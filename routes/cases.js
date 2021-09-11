var express = require("express");
var router = express.Router();

const casesUtils = require("./utils/casesUtils");

/**
 * Case of Get request which begin with "/cases".
 * If it has 2 paramters, using "calculateCases" function of casesUtils.js.
 * Show the response (answer or error) in the internet browser.
 */
router.get("/:country/:given_date", (req, res) => {
      casesUtils
        .calculateCases(req.params.country, req.params.given_date)
        .then((details) => res.send(details))
        .catch((error) => {
          console.log(error);
          res.status(404).send(error);
        });  
});

module.exports = router;