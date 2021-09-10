var express = require("express");
var router = express.Router();

const historyUtils = require("./utils/historyUtils");

router.get("/:source_country/:target_country/:from_date/:to_date", (req, res) => {
      historyUtils
        .calculateHistory(req.params.source_country, req.params.target_country, req.params.from_date, req.params.to_date)
        .then((details) => res.send(details))
        .catch((error) => {
          console.log(error);
          res.sendStatus(404);
        });  
});

module.exports = router;