import { Body, Caption, Container, Title } from "../../router";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { commonClassNameOfInput } from "../../components/common/Design";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { productlists } from "../../assets/data";



export const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description");
  const { id } = useParams();

  const product = productlists.find((item) => item._id === id);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!product) return <p className="mt-28 ms-10">Product not found</p>;

  return (
    <section className="pt-24 px-2 md:px-8">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="w-full md:w-1/2">
            <div className="h-[50vh] md:h-[70vh]">
              <img
                src={product.image}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Title level={2} className="capitalize">
              {product.title}
            </Title>
            <div className="flex gap-5">
              <div className="flex text-green ">
                <IoIosStar size={20} />
                <IoIosStar size={20} />
                <IoIosStar size={20} />
                <IoIosStarHalf size={20} />
                <IoIosStarOutline size={20} />
              </div>
              <Caption>(2 customer reviews)</Caption>
            </div>
            <Body>
              Korem ipsum dolor amet, consectetur adipiscing elit. Maece nas in
              pulvinar neque. Nulla finibus lobortis pulvinar. Donec a
              consectetur nulla.
            </Body>
            <Caption>Item condition: New</Caption>
            <Caption>Item Verified: Yes</Caption>
            <Caption>Time left:</Caption>

            <div className="grid grid-cols-2 md:flex gap-8 mt-3 md:mt-0 text-center">
              <div className="p-5 px-10 shadow-s1">
                <Title level={4}>149</Title>
                <Caption>Days</Caption>
              </div>
              <div className="p-5 px-10 shadow-s1">
                <Title level={4}>12</Title>
                <Caption>Hours</Caption>
              </div>
              <div className="p-5 px-10 shadow-s1">
                <Title level={4}>36</Title>
                <Caption>Minutes</Caption>
              </div>
              <div className="p-5 px-10 shadow-s1">
                <Title level={4}>51</Title>
                <Caption>Seconds</Caption>
              </div>
            </div>

            <Title className="flex items-center gap-2 mt-5">
              Auction ends:
              <Caption>December 31, 2024 12:00 am</Caption>
            </Title>
            <Title className="flex items-center gap-2 my-5">
              Timezone: <Caption>UTC 0</Caption>
            </Title>
            <Title className="flex items-center gap-2 my-5">
              Price: <Caption>${product.price}</Caption>
            </Title>
            <Title className="flex items-center gap-2">
              Current bid:{" "}
              <Caption className="text-3xl">${product.biddingPrice}</Caption>
            </Title>

            <div className="p-5 px-5 md:px-10 shadow-s3 py-8">
              <form className="flex w-full gap-3 justify-between">
                <input
                  className={commonClassNameOfInput}
                  type="number"
                  name="price"
                />
                <button
                  type="button"
                  className="bg-gray-100 rounded-md px-5 py-3"
                >
                  <AiOutlinePlus />
                </button>
                <button
                  type="submit"
                  className={`py-3 px-8 rounded-lg ${"bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="details mt-8">
          <div className="grid grid-cols-2 gap-3 md:flex items-center md:gap-5">
            <button
              className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                activeTab === "description" ? "bg-green text-white" : "bg-white"
              }`}
              onClick={() => handleTabClick("description")}
            >
              Description
            </button>
            <button
              className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                activeTab === "auctionHistory"
                  ? "bg-green text-white"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("auctionHistory")}
            >
              History
            </button>
            <button
              className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                activeTab === "reviews" ? "bg-green text-white" : "bg-white"
              }`}
              onClick={() => handleTabClick("reviews")}
            >
              Reviews(2)
            </button>
            <button
              className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                activeTab === "moreProducts"
                  ? "bg-green text-white"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("moreProducts")}
            >
              More
            </button>
          </div>

          <div className="tab-content mt-8">
            {activeTab === "description" && (
              <div className="description-tab shadow-s3 p-8 rounded-md">
                <Title level={4}>Description</Title>
                <Caption className="leading-7">
                  If you’ve been following the crypto space, you’ve likely heard
                  of Non-Fungible Tokens (Biddings), more popularly referred to
                  as ‘Crypto Collectibles.’
                </Caption>
                <Title level={4}>Product Overview</Title>
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="mt-4 capitalize w-full md:w-1/2">
                    <div className="flex justify-between border-b py-3">
                      <Title>category</Title>
                      <Caption>{product.category}</Caption>
                    </div>
                    <div className="flex justify-between border-b py-3">
                      <Title>height</Title>
                      <Caption> 200 (cm)</Caption>
                    </div>
                    <div className="flex justify-between border-b py-3">
                      <Title>length</Title>
                      <Caption> 300 (cm)</Caption>
                    </div>
                    <div className="flex justify-between border-b py-3">
                      <Title>width</Title>
                      <Caption> 400 (cm)</Caption>
                    </div>
                    <div className="flex justify-between border-b py-3">
                      <Title>weigth</Title>
                      <Caption> 50 (kg)</Caption>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <Title>medium used</Title>
                      <Caption> Gold </Caption>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <Title>Price</Title>
                      <Caption> $50000 </Caption>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <Title>Sold out</Title>
                      {product.isSoldout === false ? "No" : "Yes"}
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <Title>verify</Title>
                      No
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <Title>Create At</Title>
                      <Caption>December 31, 2024 12:00 am</Caption>
                    </div>
                    <div className="flex justify-between py-3">
                      <Title>Update At</Title>
                      <Caption>December 31, 2024 12:00 am</Caption>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 hidden md:block">
                    <div className="h-[60vh] p-2 bg-green rounded-xl">
                      <img
                        src={product.image}
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "auctionHistory" && (
              <AuctionHistory bitAmount={product.biddingPrice} />
            )}
            {activeTab === "reviews" && (
              <div className="reviews-tab shadow-s3 p-8 rounded-md">
                <Title level={5} className=" font-normal">
                  Reviews
                </Title>
                <hr className="my-5" />
                <Title level={5} className=" font-normal text-red-500">
                  Coming Soon!
                </Title>
              </div>
            )}
            {activeTab === "moreProducts" && (
              <div className="more-products-tab shadow-s3 p-8 rounded-md">
                <h1>More Products</h1>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export const AuctionHistory = ({ bitAmount }) => {
  return (
    <div className="shadow-s1 p-8 rounded-lg">
      <Title level={5} className="font-normal">
        Auction History
      </Title>
      <hr className="my-5" />
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Bid Amount(USD)
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-6 py-4 text-gray-900">2024-08-17</td>
              <td className="px-6 py-4 text-gray-500">{bitAmount}</td>
              <td className="px-6 py-4 text-gray-900">Jacob</td>
              <td className="px-6 py-4 text-gray-900">Approved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
