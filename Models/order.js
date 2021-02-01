const mongoose = require("mongoose");
const schema =mongoose.Schema;

const orderSchema = new schema({
  type: Object,
  
    shipments: 
      [
        {
            add: {
              type: String,
              required : [true,"name of the Ninja is missing in the request"]

            },
            "address_type": {
              "type": "string",
               enum:{
                 values:  ["a","b"],
                 message : "address type can be either home or office\n"
               }
            },
            "phone": {
              "type": "Number"
            },
            "payment_mode": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "pin": {
              "type": "Number",
               min : [100000,"please check pincode"],
               max : [999999,"please check pincode"] 
            },
            "order": {
              "type": "string"
            },
            "consignee_gst_amount": {
              "type": "string"
            },
            "integrated_gst_amount": {
              "type": "string"
            },
            "ewbn": {
              "type": "string"
            },
            "consignee_gst_tin": {
              "type": "string"
            },
            "seller_gst_tin": {
              "type": "string"
            },
            "client_gst_tin": {
              "type": "string"
            },
            "hsn_code": {
              "type": "string"
            },
            "gst_cess_amount": {
              "type": "string"
            },
            "client": {
              "type": "string"
            },
            "tax_value": {
              "type": "string"
            },
            "seller_tin": {
              "type": "string"
            },
            "seller_gst_amount": {
              "type": "string"
            },
            "seller_inv": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "commodity_value": {
              "type": "string"
            },
            "weight": {
              "type": "string"
            },
            "return_state": {
              "type": "string"
            },
            "document_number": {
              "type": "string"
            },
            "od_distance": {
              "type": "string"
            },
            "sales_tax_form_ack_no": {
              "type": "string"
            },
            "document_type": {
              "type": "string"
            },
            "seller_cst": {
              "type": "string"
            },
            "seller_name": {
              "type": "string"
            },
            "fragile_shipment": {
              "type": "string"
            },
            "return_city": {
              "type": "string"
            },
            "return_phone": {
              "type": "string"
            },
            "qc": {
              "type": "object",
              "properties": {
                "item": {
                  "type": "array",
                  "items": [
                    {
                      "type": "object",
                      "properties": {
                        "images": {
                          "type": "string"
                        },
                        "color": {
                          "type": "string"
                        },
                        "reason": {
                          "type": "string"
                        },
                        "descr": {
                          "type": "string"
                        },
                        "ean": {
                          "type": "string"
                        },
                        "imei": {
                          "type": "string"
                        },
                        "brand": {
                          "type": "string"
                        },
                        "pcat": {
                          "type": "string"
                        },
                        "si": {
                          "type": "string"
                        }
                      }
                    }
                  ]
                }
              }
            },
            "shipment_height": {
              "type": "Number"
            },
            "shipment_width": {
              "type": "Number"
            },
            "shipment_length": {
              "type": "Number"
            },
            "category_of_goods": {
              "type": "string"
            },
            "cod_amount": {
              "type": "Number"
            },
            "return_country": {
              "type": "string"
            },
            "document_date": {
              "type": "string"
            },
            "taxable_amount": {
              "type": "string"
            },
            "products_desc": {
              "type": "string"
            },
            "state": {
              "type": "string"
            },
            "dangerous_good": {
              "type": "string"
            },
            "waybill": {
              "type": "string"
            },
            "consignee_tin": {
              "type": "string"
            },
            "order_date": {
              "type": "string"
            },
            "return_add": {
              "type": "string"
            },
            "total_amount": {
              "type": "Number"
            },
            "seller_add": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "return_pin": {
              "type": "string"
            },
            "extra_parameters": {
              "type": "object",
              "properties": {
                "return_reason": {
                  "type": "string"
                }
              }
            },
            "return_name": {
              "type": "string"
            },
            "supply_sub_type": {
              "type": "string"
            },
            "plastic_packaging": {
              "type": "string"
            },
            "quantity": {
              "type": "string"
            }
          }    
      ],
    "pickup_location": {
      type: Object,
        "name": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "pin": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "add": {
          "type": "string"
        }
      
    }
  }

);

const Order = mongoose.model('order',orderSchema);
module.exports = Order;