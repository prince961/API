const Pincode = require("../Models/pincode");
exports.getPincode = async (req, res, next) => {
  console.log(req.params.pid);
  const id = req.params.pid;
  // const data = pincode.filter((p) => p.id === +id);
  let data;
  try {
    const pincodes = await Pincode.findById("605f142b5504393004d638df");
    data = pincodes.pincode.filter((c) => c.id === +id);
  } catch (error) {
    console.log(error);
  }
  // console.log(data);
  res.json({ message: "Ok", body: data });
};

exports.postPincode = async (req, res, next) => {
  const { code, city, state } = req.body;
  console.log(code, city, state);
  let pinObj = { id: code, city, state };

  try {
    const pincodes = await Pincode.findById("605f142b5504393004d638df");
    const data = pincodes.pincode.filter((c) => c.id === code);
    // console.log(pincodes.pincode.filter((c) => c.id === code));
    if (data) {
      console.log("Already Exist");
      return res.json({ message: "Already Exist" });
    }
    Pincode.findOneAndUpdate(
      { _id: "605f142b5504393004d638df" },
      { $push: { pincode: pinObj } },
      (err, succ) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Created");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  res.json({ message: "Ok", pinObj });
};
