var express = require("express");
var router = express.Router();

const historyUtils = require("./utils/historyUtils");

/**
 * Case of Get request which begin with "/history".
 * If it has 4 paramters, using "calculateHistory" function of historyUtils.js.
 * Show the response (answer or error) in the internet browser.
 */
router.get("/:source_country/:target_country/:from_date/:to_date", (req, res) => {
      historyUtils
        .calculateHistory(req.params.source_country, req.params.target_country, req.params.from_date, req.params.to_date)
        .then((details) => res.send(details))
        .catch((error) => {
          console.log(error);
          res.status(404).send(error);
        });  
});

module.exports = router;