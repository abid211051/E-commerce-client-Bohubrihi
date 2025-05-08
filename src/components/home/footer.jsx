import { Boxes } from "lucide-react";
export default function Footer() {
  return (
    <div className="sm:p-4 p-2 flex flex-col gap-7 w-full min-h-[300px] bg-black text-white">
      <div className="grid lg:grid-cols-5 sm:grid-cols-3 gap-7 flex-wrap justify-between">
        <div className="flex gap-2">
          <Boxes size={26} />
          <h1 className="text-xl font-semibold">Dom Store</h1>
        </div>
        <div>
          <h1 className="mb-4">Shop</h1>
          <ul className="flex flex-col gap-1.5">
            <li className="text-gray-400">Cloth</li>
            <li className="text-gray-400">Cosmeyics</li>
            <li className="text-gray-400">grocaries</li>
            <li className="text-gray-400">Accessories</li>
          </ul>
        </div>
        <div>
          <h1 className="mb-4">Our Company</h1>
          <ul className="flex flex-col gap-1.5">
            <li className="text-gray-400">About Us</li>
            <li className="text-gray-400">Reviews</li>
            <li className="text-gray-400">FAQ</li>
          </ul>
        </div>
        <div>
          <h1 className="mb-4">Contact Us</h1>
          <ul className="flex flex-col gap-1.5">
            <li className="text-gray-400">apranto41@gmail.com</li>
            <li className="text-gray-400">Feni, ssk road</li>
            <li className="text-gray-400">3900</li>
            <li className="text-gray-400">0186.......</li>
          </ul>
        </div>
        <div>
          <h1 className="mb-4">Follow Us</h1>
          <ul className="flex flex-col gap-1.5">
            <li className="text-gray-400">Facebook</li>
            <li className="text-gray-400">Instagram</li>
            <li className="text-gray-400">YouTube</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-around gap-7 border-t-2 border-gray-500 border-b-2 py-2">
        <div>
          <a href="#">Privacy Policy</a>
        </div>
        <div>
          <a href="#">Shipping Policy</a>
        </div>
        <div>
          <a href="#">Refund Policy</a>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <h1>Payment Methods</h1>
        <div className="grid sm:grid-cols-5 grid-cols-3 gap-7">
          <div className="bg-white rounded-md p-0.5 w-12 h-10">
            <img src="/assets/ucb.webp" alt="UCB" className="w-full h-full" />
          </div>
          <div className=" bg-white rounded-md p-0.5 w-12 h-10">
            <img src="/assets/card.png" alt="VISA" className="w-full h-full" />
          </div>
          <div className=" bg-white rounded-md p-0.5 w-12 h-10">
            <img
              src="/assets/BKash-Icon-Logo.wine.png"
              alt="Bikash"
              className="w-full h-full"
            />
          </div>
          <div className=" bg-white rounded-md p-0.5 w-12 h-10">
            <img
              src="/assets/Nagad-Horizontal-Logo.wine.png"
              alt="Nagad"
              className="w-full h-full"
            />
          </div>
          <div className=" bg-white rounded-md p-0.5 w-12 h-10">
            <img
              src="/assets/ssl.jpg"
              alt="SSLCommereze"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
