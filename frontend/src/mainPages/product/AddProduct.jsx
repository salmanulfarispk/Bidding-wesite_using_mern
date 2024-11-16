import { CategoryDropDown, Caption, PrimaryButton, Title } from "../../router/index";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useState } from "react";
import { UseRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/features/ProductSlice";

const initialState = {
  title: "",
  description: "",
  price: "",
  height: "",
  lengthpic: "",
  width: "",
  mediumused: "",
  weigth: "",
  category: null,
};

export const AddProduct = () => {

   UseRedirectLogoutUser('/login')

   const dispatch=useDispatch()
   const navigate=useNavigate()
   const[product,setProduct]=useState(initialState)
   const [productImage, setSelectedImage] = useState('');
   const [imgpreview,setImageprev] = useState(null);
   const [imgname,setImgname]=useState('')
   
  
   const {title,description,price,height,lengthpic,width,mediumused,weigth,category}=product ;
   const { isSuccess }=useSelector(state => state.product)
    
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedImage(file); 
        setImgname(file.name)
        setImageprev(URL.createObjectURL(file)); 
      }
    }

    const handleInput =(e)=>{
      const [name,value]= e.target;
      setProduct({
        ...product,
        [name]: value
      })
    };

  
  
    const handleAddProduct =async(e)=>{
       e.preventDefault();

       const formData=new FormData()
        formData.append('title',title)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('lengthpic',lengthpic)
        formData.append('height',height)
        formData.append('width',width)
        formData.append('mediumused',mediumused)
        formData.append('weight',weigth)
        formData.append('productImage',productImage)
         if(category){
          formData.append('category',category.label)
         }

      await dispatch(createProduct(formData))
      if(isSuccess){
         navigate('/product')
      }

    };


  
  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Create Product
        </Title>
        <hr className="my-5" />
        <form onSubmit={handleAddProduct}>
          <div className="w-full">
            <Caption className="mb-2">Title *</Caption>
            <input type="text" name="title" className={`${commonClassNameOfInput}`} value={product?.title} onChange={handleInput} placeholder="Title" required />
          </div>
          <div className="py-5">
            <Caption className="mb-2">Category *</Caption>
            <CategoryDropDown value={category} onChange={(selectedcategory)=> setProduct({...product,category:selectedcategory})} className={`${commonClassNameOfInput}`} />
          </div>
          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <Caption className="mb-2">Height (cm) </Caption>
              <input type="number" name="height" value={product?.height} onChange={handleInput} placeholder="height" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Length (cm) </Caption>
              <input type="number" name="lengthpic" value={product?.lengthpic} onChange={handleInput} placeholder="Length" className={`${commonClassNameOfInput}`} />
            </div>
          </div>
          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <Caption className="mb-2">Width (cm) </Caption>
              <input type="number" name="width" value={product?.width} onChange={handleInput} placeholder="width" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">
                Medium used <span className=" text-purple-400 italic hidden md:block">(Typically, pencil, ink, charcoal or other)</span>
              </Caption>
              <input type="text" name="mediumused" value={product?.mediumused} onChange={handleInput} placeholder="Medium used" className={commonClassNameOfInput} />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="w-1/2">
              <Caption className="mb-2">
                Weight of piece <span className=" text-purple-400 italic">(kg)</span>
              </Caption>
              <input type="number" name="weigth" value={product?.weigth} onChange={handleInput} placeholder="weigth" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Price Range*</Caption>
              <input type="number" name="price" value={product?.price} onChange={handleInput} className={`${commonClassNameOfInput}`} placeholder="Price" required />
            </div>
          </div>
          <div>
            <Caption className="mb-2">Description *</Caption>
            <textarea name="description" value={product?.description} onChange={handleInput} className={`${commonClassNameOfInput}`} cols="30" rows="5"></textarea>
          </div>
          <div>
            <Caption className="mb-2">Image </Caption>
            <input type="file" className={`${commonClassNameOfInput} hidden`}  name="image" id="image-input" onChange={handleFileChange} />
            <div className="flex space-x-3">
            <label htmlFor="image-input" className="py-3 px-10 cursor-pointer rounded-lg bg-gray-300 text-white flex items-center justify-center">
               {imgname || 'Select'}
            </label>
            <div className="w-full h-20">
              {imgpreview && (
               <img src={imgpreview} alt="Preview" className="w-full h-full object-cover" />
               )}
            </div>
            </div>
          </div>
          <PrimaryButton type="submit" className="rounded-none my-5">
            CREATE
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};