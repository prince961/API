const { default: axios } = require("axios");
const Company = require("../Models/company");
const Rate = require("../Models/rate");

const DTDCAPI = {
  APIURL: "https://track.delhivery.com/api/kinko/v1/invoice/charges/.json",
  SERVICES: ["E", "S"],
  SS: "Delivered",
};

// Utill Functions

//  For finding category
function findRate(company, weight, destinationName) {
  const RateList = [];

  let rate;
  company.services.forEach((service) => {
    if (service.rates) {
      const cat = service.rates.destination
        .find((dest) => dest.name === destinationName)
        .weightCategory.find((cat) => cat.min < weight && cat.max >= weight);
      if (cat) {
        rate = {
          company: company.companyName,
          service: service.serviceName,
          price: rateCalculate(cat, weight),
        };
      }
    }
    RateList.push(rate);
    // console.log(rate);
  });
  return RateList;
}

//  calculate rate
function rateCalculate({ category, prevPrice, price, weightDivisor }, weight) {
  const weightUnit = Math.ceil(weight / weightDivisor);

  switch (category) {
    case `cat1`:
    case `cat2`:
    case `perKg`:
      return weightUnit * price;
    case `additional`:
      return prevPrice + price * (weightUnit - 1);
    default:
      return 0;
  }
}

async function getDbCompanyRate(weight, destinationName) {
  let RateList = [];
  let rate;
  let companies;
  try {
    companies = await Company.find().populate("services.rates").exec();
    if (companies.length === 0) {
      return "No Company Available";
    }
    companies.forEach((company) => {
      company.services.forEach((service) => {
        if (service.rates) {
          const cat = service.rates.destination
            .find((dest) => dest.name === destinationName)
            .weightCategory.find(
              (cat) => cat.min < weight && cat.max >= weight
            );
          if (cat) {
            rate = {
              company: company.companyName,
              service: service.serviceName,
              price: rateCalculate(cat, weight),
            };
          }
        }

        RateList.push(rate);
      });
    });
  } catch (error) {
    console.log(error);
  }

  return RateList;
}
const getDelhiveryRate = (weight, originPincode, destinationPincode) => {
  const { APIURL, SERVICES, SS } = DTDCAPI;
  const promises = [];
  SERVICES.forEach((service) => {
    promises.push(
      axios.get(APIURL, {
        params: {
          md: service,
          cgm: weight,
          ss: SS,
          o_pin: originPincode,
          d_pin: destinationPincode,
        },
        headers: {
          Authorization: "Token 8ff6cb0893fbca84b2e5a0ecb78e83c25a416933",
        },
      })
    );
  });

  return axios.all(promises);
};
exports.getRate = async (req, res, next) => {
  const { weight, originPincode, destinationPincode, destination } = req.query;
  console.log(weight, originPincode, destinationPincode, destination);
  // console.log(req);
  let DbRateList;
  const APIRateList = [];

  try {
    // const responses = await getDelhiveryRate(
    //   weight,
    //   originPincode,
    //   destinationPincode
    // );
    if (destination === "ws" || destination === "wc") {
      DbRateList = await getDbCompanyRate(weight, destination);
    } else {
      DbRateList = "Area not availabale";
    }
    // responses.forEach((response) => {
    //   APIRateList.push(response.data);
    // });
  } catch (err) {
    const error = new HttpError("Internal Server Error", 500);
    return next(error);
  }

  res.json({ message: "Ok",  DbRateList });
};
