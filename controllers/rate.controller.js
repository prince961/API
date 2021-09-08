const { default: axios } = require("axios");
const { $where } = require("../Models/company");
const Company = require("../Models/company");
const Pincoder = require("../Models/pincode");
const Rate = require("../Models/rate");
const mongoose = require("mongoose");
const Pincodes = require("../Models/pincodes");

const DTDCAPI = {
  APIURL: "https://track.delhivery.com/api/kinko/v1/invoice/charges/.json",
  SERVICES: ["E", "S"],
  SS: "Delivered",
};

// Utill Functions
// For finding zone
async function findZone(originPincode, destinationPincode) {
  let zoneCode;
  // const data = pincode.filter((p) => p.id === +id);
  console.log(originPincode);
  console.log(destinationPincode);
  console.log(Pincodes);

  let data;
  try {
   const [pincodes,pincodes1 ] = await Pincodes.find({
      Pincode: { $in: [originPincode, destinationPincode] },
    });

    
        var origin = pincodes1 
        var destination = pincodes 

    
  // console.log(pincodes1,pincodes);
    //  var origin = JSON.parse(JSON.stringify(pincodes1));
    //  var destination = JSON.parse(JSON.stringify(pincodes));
     
     
     console.log(origin,"or");
     console.log(destination,"dr");

    if (origin.City === destination.City ) {
      zoneCode = "wc";
    }
    else if (origin.State === destination.State && origin.City != destination.City) {
        zoneCode = "ws";
      }
      else if (origin.Zone === destination.Zone) {
        zoneCode = "wz";
      }
             
      else if (origin.Zone != destination.Zone && destination.DestinationCategory === 'METRO'){
          zoneCode = "wm"


      }
      else if (origin.Zone != destination.Zone && destination.DestinationCategory === 'Special Destination')
        {
          zoneCode = "spd"
        }

        else if (origin.Zone != destination.Zone &&  destination.DestinationCategory === 'ROI'){
          zoneCode = "roi"
        }
       }
   catch (error) {
    console.log(error);
  }

  return zoneCode;
}
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
  console.log(weight,destinationName);
  try {
    companies = await Company.find().populate("services.rates").exec();
    if (companies.length === 0) {
      return "No Company Available";
    }
    companies.forEach((company) => {
      company.services.forEach((service) => {
        if (service.rates) {
          const cat = service.rates.destination
          .find((dest) => dest.name === destinationName).weightCategory.find((cat) => cat.min < weight && cat.max >= weight);
          // console.log(cat);

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
  const { weight, originPincode, destinationPincode } = req.query;
  console.log(weight, originPincode, destinationPincode);
  // console.log(req);
  // let DbRateList;
  // const APIRateList = [];

  // try {
  //   // const responses = await getDelhiveryRate(
  //   //   weight,
  //   //   originPincode,
  //   //   destinationPincode
  //   // );
  //     DbRateList = await getDbCompanyRate(weight, zoneCode);
   
  //     console.log(DbRateList);
  //     DbRateList = "Area not availabale";
  
  //   // responses.forEach((response) => {
  //   //   APIRateList.push(response.data);
  //   // });
  // } catch (err) {
    
  //   console.log("error");
  //   console.log(err);
  // }

  let zoneCode;
  try {
    zoneCode = await findZone(originPincode, destinationPincode);
    DbRateList = await getDbCompanyRate(weight, zoneCode);
    console.log(DbRateList);
   
   
  } catch (error) {
    console.log(error);
  }

  res.json({ message: "Ok", DbRateList });
};
