async function goPremium() {
  try {
    let res = await axios({
      url: api + "user/order/premium",
      method: "get",
    });

    let data = res.data.data;
    payment(data.orderId);
  } catch (error) {
    console.log(error);
  }
}

function payment(order) {
  var options = {
    key: "rzp_test_wNTVBl0F7E7Bsu", //Enter your razorpay key
    currency: "INR",
    name: "Razor Tutorial",
    description: "Razor Test Transaction",
    image:
      "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
    order_id: order,
    handler: async function (response) {
      let body = {};
      body["razorpay_order_id"] = response.razorpay_order_id;
      body["razorpay_signature"] = response.razorpay_signature;
      body["razorpay_payment_id"] = response.razorpay_payment_id;

      try {
        let res = await axios({
          method: "post",
          url: api + "user/order/check",
          data: body,
        });

        if (res.data.status === "success") {
          window.location = "./expense.html";
        } else {
          console.log("Problem in Payment");
        }
      } catch (error) {
        console.log(error);
      }
    },
    theme: {
      color: "#227254",
    },
  };

  var rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
}
