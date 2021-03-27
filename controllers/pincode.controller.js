const { pincode } = require("../data/pincodeMaster.json");

exports.getPincode = (req, res, next) => {
  console.log(req.body.pid);
  const id = req.params.pid;
  const data = pincode.filter((p) => p.id === +id);
  console.log(data);
  res.json({ message: "Ok", body: data });
};
