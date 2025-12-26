import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice, removeAllItems } from "../../redux/slices/cartSlice";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { addOrder, createOrderRazorpay, updateTable, verifyPaymentRazorpay } from "../../https";
import { useMutation } from "@tanstack/react-query";
import { removeCustomer } from "../../redux/slices/customerSlice";

/**
 * Explaination: This function dynamically loads an external JavaScript file by creating a script element and appending it to the document body. It returns a promise that resolves to true if the script loads successfully, or false if there is an error during loading.
 */
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Bill() {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState();

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method", { variant: "warning" });
      return;
    }

    try {
      // Load Razorpay script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      // Handle script load failure
      if (!res) {
        enqueueSnackbar("Razorpay SDK failed to load. Are you online?", {
          variant: "warning",
        });
        return;
      }

      // Create order on the server
      const reqData = {
        amount: totalPriceWithTax.toFixed(2),
      };

      const { data } = await createOrderRazorpay(reqData);

      const options = {
        key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "RESTRO",
        description: "Secure Payment for Your Meal",
        order_id: data.order.id,
        handler: async function (response) {
          const verification = await verifyPaymentRazorpay(response);
          console.log(verification);
          enqueueSnackbar(verification.data.message, { variant: "success" });

          // Place the order
          const orderData = {
            customerDetails: {
              name: customerData,
              phone: customerData.customerPhone,
              guest: customerData.guests,
            },
            orderStatus: "In Progress",
            bills: {
              total: total,
              tax: tax,
              totalWithTax: totalPriceWithTax,
            },
            items: cartData,
            table: customerData.table.tableId,
          };

          setTimeout(() => {
            orderMutation.mutate(orderData);
          },1500);
        },
        prefill: {
          name: customerData.name,
          email: "",
          contact: customerData.phone,
        },
        theme: { color: "#025cca" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Razorpay Error:", error);
      enqueueSnackbar("Payment failed", { variant: "error" });
    }
  };

  const orderMutation = useMutation({
    mutationFn:(reqData) => addOrder(reqData),
    onSuccess: (resData) => {
      const {data} = resData.data;
      console.log("Order placed successfully:", data);

      // Update Table
      const tableData = {
        status: "Booked",
        orderId:data._id,
        tableId:data.table
      };

      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
      }, 1500);

      enqueueSnackbar("Order Placed!", { variant: "success" });
    },
    onError:(error) => {
      console.log("Order placement failed:", error);
    },
  });

  const tableUpdateMutation = useMutation({
    mutationFn:(reqData) => updateTable(reqData),
    onSuccess: (resData) => {
      console.log(resData)
      dispatch(removeCustomer());
      dispatch(removeAllItems());
    },
    onerror:(error) => {
      console.log("Table update failed:", error);
    }
  })

  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Items({cartData.length})
        </p>
        <h1 className="text-[#f5f5f5] text-base font-bold">
          ${total.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Tax(5.25%)</p>
        <h1 className="text-[#f5f5f5] text-base font-bold">
          ${tax.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Total With Tax
        </p>
        <h1 className="text-[#f5f5f5] text-base font-bold">
          ${totalPriceWithTax.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === "Cash" ? "bg-[#383737]" : "cursor-pointer"
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === "Online" ? "bg-[#383737]" : "cursor-pointer"
          }`}
        >
          Online
        </button>
      </div>

      <div className="flex items-center gap-3 px-5 mt-4">
        <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg">
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg"
        >
          Place Order
        </button>
      </div>
    </>
  );
}

export default Bill;
