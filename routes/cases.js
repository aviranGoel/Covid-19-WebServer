var express = require("express");
var router = express.Router();

const casesUtils = require("./utils/casesUtils");

router.get("/:country/:given_date", (req, res) => {
      casesUtils
        .calculateCases(req.params.country, req.params.given_date)
        .then((details) => res.send(details))
        .catch((error) => {
          console.log(error);
          res.sendStatus(404);
        });  
});

module.exports = router;