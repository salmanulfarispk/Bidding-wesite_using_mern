import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client"
import axios from "axios"
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const BIDDING_URL= `${backendUrl}/bidding/`
import { useSelector} from "react-redux"
import { useRef } from "react";
import moment from "moment";



export const ProductReviews = ({productId}) => {

    const [Allcomments, setAllComments] = useState([]);
    const [comment, setComment] = useState("");
    const { user }=useSelector((state)=> state.auth)
     

  const socket = useRef(null);

  useEffect(()=>{

    socket.current = io('http://localhost:5000');

   axios.get(`${BIDDING_URL}/${productId}/comments`).then((response)=>{
     setAllComments(response.data)
   })

   socket.current.emit("join-product",productId)

   socket.current.on('recieve-comment',(data)=>{
      setAllComments((prevComments)=> [...prevComments, data])
   })

return ()=> {
    socket.current.disconnect()
};
    
  },[productId]);


const handleSubmit =async(e)=>{
    e.preventDefault();

    const newComment= {
        productId,
        comment
    };

    await axios.post(BIDDING_URL+"create-commment",newComment)

    socket.current.emit("new-comment",newComment)

    setComment('')

};
  
    
  return (
    <div>
       {user && (
      <div className="flex px-3 gap-x-3">
        <input
          type="text"
          value={comment}
          onChange={(e)=> setComment(e.target.value)}
          className="outline-none border text-sm  w-full sm:w-[50%] px-3 py-3 rounded-sm"
          placeholder="type review...."
        />
        <button className="px-6 py-2 bg-green text-black/80 rounded-md" type="button" onClick={handleSubmit}>
          <IoSend size={15} />
        </button>
      </div>
      )} 

      <div className="max-h-60 overflow-y-auto ">
      {Allcomments&&Allcomments.map((cmts,index)=>(
        <div className="space-y-3 p-3 rounded-md" key={index}>
          <div className="border p-4 rounded-md mt-1 flex items-center justify-between">
            <div>
            <h3 className="font-semibold text-md">{cmts.userId?.name}</h3>
            <p className="text-sm md:mt-2">{cmts?.comment}</p>
            </div>
            <p className="text-gray-400 text-xs font-semibold">{moment(cmts.createdAt).format("DD MMM YYYY")}</p>

          </div>
        </div>
        ))}
      </div>
    </div>
  );
};
