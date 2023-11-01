import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import io from "socket.io-client";

const socket = io(`${BASE_URL}`);

const ProductDetailsPage = () => {
  const params = useParams();
  const [productData, setProductData] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [biddings, setBiddings] = useState([
    // { bidder: "Alice", amount: 110 },
    // { bidder: "Bob", amount: 120 },
  ]);

  const bid = () => {
    axios
      .post(`${BASE_URL}/addBid`, {
        productId: params.id,
        bidder: localStorage.getItem("userID"),
        amount: parseFloat(bidAmount),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(params.id);
    // console.log(localStorage.getItem('userID'));
    // console.log(bidAmount);
  };

  const getOwnerData = (id) => {
    axios
      .post(`${BASE_URL}/getUserData`, {
        id: id,
      })
      .then((res) => setOwnerData(res.data.user))
      .catch((error) => console.log(error.data));
  };

  useEffect(() => {
    socket.on("dataChange", (change) => {
      window.location.reload();
    });
  }, []);
  useEffect(() => {
    axios
      .post(`${BASE_URL}/getProduct`, { id: params.id })
      .then((res) => {
        console.log(res.data.product.bids);
        setProductData(res.data.product);
        setBiddings(res.data.product.bids);
        getOwnerData(res?.data?.product?.listedBy);
      })
      .catch((error) => console.log(error.data));
  }, []);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    // Here, you can add logic to submit the bid to your backend and update the biddings state.
    // For simplicity, we update the state directly in this example.
    // if (bidAmount && !isNaN(bidAmount)) {
    //   setBiddings([
    //     ...biddings,
    //     { bidder: "New Bidder", amount: parseFloat(bidAmount) },
    //   ]);
    //   setBidAmount("");
    // }
    bid();
  };

  return (
    <div>
      {!productData ? (
        <div>Loading</div>
      ) : (
        <div className="container mx-auto p-4 flex flex-col items-center">
          <div className="max-w-lg mx-auto rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="https://media.istockphoto.com/id/1350560575/photo/pair-of-blue-running-sneakers-on-white-background-isolated.jpg?s=2048x2048&w=is&k=20&c=q5PbZIu__xKIpwD9RiwCSn4ptSniWsD0GElqkCdsevM="
              alt="Product Title"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-2xl mb-2">{productData?.name}</div>
              <p className="text-gray-700 text-base">
                {productData.description}
              </p>
              <p className="text-gray-700 text-base">
                <span className="font-bold">Owner Mail</span>:{" "}
                {ownerData?.email}
              </p>
              <p className="text-gray-700 text-base">
                Price: ${productData.price}
              </p>
              <p className="text-gray-700 text-base">
                Available: {productData.isAvailable ? "Yes" : "No"}
              </p>
            </div>
          </div>
          <div className="my-4 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Biddings</h2>
            <ul className="divide-y divide-gray-300">
              {biddings
                ?.sort((a, b) => b.amount - a.amount)
                .map((bid, index) => (
                  <li key={index} className="py-2">
                    <div className="flex justify-between">
                      <p className="text-base">{index + 1}</p>
                      <p className="text-base">{`$${bid.amount}`}</p>
                    </div>
                  </li>
                ))}
            </ul>
            <form className="mt-4" onSubmit={handleBidSubmit}>
              <div className="flex">
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="9999999"
                  className="mr-2 w-1/2 py-2 px-3 border rounded-md"
                  placeholder="Your Bid Amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Place Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
