import React, { useEffect, useState } from "react";
import { paymentHistory } from "../../api/apiOrder";

const PurchaseHistory = ({ token }) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    paymentHistory(token)
      .then((response) => setTransactions(response.data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div className="flex-1 bg-blue-100 p-2 rounded-md">
      <div className="w-full md:grid grid-cols-5 hidden gap-4 p-1">
        <div className="p-1 font-semibold">Transaction ID</div>
        <div className="p-1 font-semibold">Cost</div>
        <div className="p-1 font-semibold">Payment Type</div>
        <div className="p-1 font-semibold">Status</div>
        <div className="p-1 font-semibold">Order Date</div>
      </div>
      {transactions &&
        transactions?.map((item) => (
          <div
            className="grid md:grid-cols-5 grid-cols-1 gap-4 mb-5 bg-amber-50 rounded-md md:px-0 px-2 py-2"
            key={item.transactionId}
          >
            <div className=" flex gap-2">
              <p className="md:hidden font-semibold">Transaction ID: </p>
              <p className="flex-1 overflow-x-scroll">{item.transactionId}</p>
            </div>
            <div className="flex gap-2">
              <p className="md:hidden font-semibold">Cost: </p>
              <p>{parseFloat(item.price).toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <p className="md:hidden font-semibold">Payment Type: </p>
              <p>{item.customer.paymentType}</p>
            </div>
            <div
              className={
                item.paymentStatus !== "Success"
                  ? "text-red-600 flex gap-2"
                  : "text-green-800 flex gap-2"
              }
            >
              <p className="md:hidden font-semibold">Status: </p>
              <p>{item.paymentStatus}</p>
            </div>
            <div className="flex gap-2">
              <p className="md:hidden font-semibold">Order Date: </p>
              <p>
                {new Date(item.orderTime).getMonth() + 1}/
                {new Date(item.orderTime).getDate()}/
                {new Date(item.orderTime).getFullYear()}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PurchaseHistory;
