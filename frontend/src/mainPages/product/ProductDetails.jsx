import { Body, Caption, Container, DateFormatter, Loader, Title } from "../../router";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { commonClassNameOfInput } from "../../components/common/Design";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/features/ProductSlice";
import { fetchBiddingHistory, placeBid } from "../../redux/features/biddingSlice";
import { toast } from "react-toastify";
import { ProductReviews } from "../../components/ProductReviews";




export const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [rate,setRate]=useState(0)
  const { id } = useParams();

  const dispatch=useDispatch()
  const { product }=useSelector((state)=> state.product)
  const { history,isLoading }=useSelector((state)=> state.bidding)



  useEffect(()=>{
    dispatch(getProduct(id))
  },[dispatch,id])

  useEffect(()=>{
    if(product && !product.isSoldout){
      dispatch(fetchBiddingHistory(id))
    }
  },[dispatch,id,product])


  useEffect(()=>{
    if(history && history.length > 0){
      const highestBid = Math.max(...history.map((bid) => bid.price))
      setRate(highestBid)
    }else if(product){
      setRate(product?.price)
    }
  },[history,product])
  


  const incrementBid =()=>{
     setRate((prev) => prev + 1)
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const BidSaveFill = async(e)=>{
     e.preventDefault();

     if(product.price > rate){
       return toast.error('your bid must be equal or higher than product price!')
      }

      const formData={
        price: rate,
        productId: id,
      }

      try {
        await dispatch(placeBid(formData)).unwrap()
        dispatch(fetchBiddingHistory(id));
      } catch (error) {
        return toast.error('An error occured while placing bid')
      }
  };

  if(isLoading) return <Loader />
  if (!product) return <p className="mt-28 ms-10">Product not found</p>;




  return (
    <section className="pt-24 px-2 md:px-8">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="w-full md:w-1/2">
            <div className="h-[50vh] md:h-[70vh]">
              <img
                src={product?.image?.filePath}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Title level={2} className="capitalize">
              {product?.title}
            </Title>
            <div className="flex gap-5 mb-2">
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
              {product?.description.slice(0, 150)}
            </Body>
            <Caption className={`mt-3`}>Item condition: New</Caption>
            <Caption>Item Verified: {product?.isverify ? "Yes" : 'No'}</Caption>
            <Caption>Time left:</Caption>

            <div className="grid grid-cols-2 md:flex gap-8 mt-3 md:mt-4 text-center">
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
              <Caption>{ <DateFormatter date={product?.createdAt}/>}</Caption>
            </Title>
            <Title className="flex items-center gap-2 my-5">
              Timezone: <Caption>UTC 0</Caption>
            </Title>
            <Title className="flex items-center gap-2 my-5">
              Price: <Caption>${product.price}</Caption>
            </Title>
            <Title className="flex items-center gap-2 max-w-full overflow-hidden">
              Current bid:{" "}
              <Caption className="text-3xl">${rate}</Caption>
            </Title>

            <div className="p-5 px-5 md:px-10 shadow-s3 py-8">
              <form className="flex w-full gap-3 justify-between" onSubmit={BidSaveFill}>
                <input
                  className={commonClassNameOfInput}
                  type="number"
                  name="price"
                  value={rate}
                  onChange={(e)=> setRate(e.target.value)}
                  min={product?.price}
                />
                <button
                  type="button"
                  className="bg-gray-100 rounded-md px-5 py-3"
                  onClick={incrementBid}
                >
                  <AiOutlinePlus />
                </button>
                <button
                  type="submit"
                  className={`py-3 px-8 rounded-lg ${product?.isSoldout || !product?.isverify ? "bg-gray-400 text-gray-700 cursor-not-allowed" : 'bg-green text-white cursor-pointer'}`}
                  disabled={product?.isSoldout || !product?.isverify}
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
                  {product?.description}
                </Caption>
                <Title level={4}>Product Overview</Title>
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="mt-4 capitalize w-full md:w-1/2">
                    <div className="flex justify-between border-b py-3">
                      <Title>category</Title>
                      <Caption>{product?.category}</Caption>
                    </div>
                    <div className="flex justify-between border-b py-3">
                      <Title>height</Title>
                      <Caption> {product?.height} (cm)</Caption>
                    </div>
                    <div className="flex justify-between border-b py-3">
                      <Title>length</Title>
                      <Caption> {product?.lengthpic} (cm)</Caption>
                    </div>
                    <div className="flex justify-between border-b py-3">
                      <Title>width</Title>
                      <Caption> {product?.width} (cm)</Caption>
                    </div>
                    <div className="flex justify-between border-b py-3">
                      <Title>weight</Title>
                      <Caption> {product?.weight} (kg)</Caption>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <Title>medium used</Title>
                      <Caption> {product?.mediumused} </Caption>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <Title>Price</Title>
                      <Caption> ${product?.price} </Caption>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <Title>Sold out</Title>
                      {product?.isSoldout ? <Caption>Sold out</Caption> : <Caption>On stock</Caption>}
                      
                    </div>
                  
                    <div className="flex justify-between py-3 border-b">
                      <Title>verify</Title>
                       {product?.isverify ? <Caption> Yes</Caption> : <Caption>No</Caption>}
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <Title>Create At</Title>
                      <Caption>{ <DateFormatter date={product?.createdAt} />}</Caption>
                    </div>
                    <div className="flex justify-between py-3">
                      <Title>Update At</Title>
                      <Caption>{ <DateFormatter date={product?.updatedAt} />}</Caption>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 hidden md:block">
                    <div className="h-[60vh] p-2 bg-green rounded-xl">
                      <img
                        src={product?.image?.filePath}
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "auctionHistory" && (
              <AuctionHistory history={history}/>
            )}
            {activeTab === "reviews" && (
              <div className="reviews-tab shadow-s3 p-8 rounded-md">
                <Title level={5} className=" font-normal">
                  Reviews
                </Title>
                <hr className="my-5" />
                   <ProductReviews productId={product?._id}/>
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

export const AuctionHistory = ({history}) => {
  return (
    <div className="shadow-s1 p-8 rounded-lg">
      <Title level={5} className="font-normal">
        Auction History
      </Title>
      <hr className="my-5" />

      {history?.length === 0 ? (
        <h2 className="m-2">No Bidding Record Found!</h2>
      ): (
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
            {history.map((item,index)=>(
            <tr className="bg-white border-b hover:bg-gray-50" key={index}>
              <td className="px-6 py-4 text-gray-900">
                <DateFormatter date={item?.createdAt} />
              </td>
              <td className="px-6 py-4 text-gray-500">{item?.price}</td>
              <td className="px-6 py-4 text-gray-900">{item?.user?.name}</td>
              <td className="px-6 py-4 text-gray-900">Approved</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>

       )}
    </div>
  );
};
