const axios = require("axios");
exports.getTrack = async (req, res, next) => {
  console.log(req.query);
  const { waybill } = req.query;
  let data;
  try {
    const response = await axios.get(
      "https://track.delhivery.com/api/v1/packages/json",
      {
        params: {
          waybill,
          token: "8ff6cb0893fbca84b2e5a0ecb78e83c25a416933",
        },
      }
    );
    data = response.data;
  } catch (error) {
    console.log(error);
  }
  res.json({ message: "Ok", data });
};
