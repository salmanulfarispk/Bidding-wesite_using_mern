import { PrimaryButton, Caption, Title } from "../../../router/index";
import { commonClassNameOfInput } from "../../../components/common/Design";
import { UseRedirectLogoutUser } from "../../../hooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectedProduct, updateProduct } from "../../../redux/features/ProductSlice";



const initialState = {
    title: "",
    description: "",
    price: "",
    height: "",
    lengthpic: "",
    width: "",
    mediumused: "",
    weight: "",
    category: null,
  };

export const ProductEdit = () => {

    UseRedirectLogoutUser('/login')

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { id }=useParams()
    
    const { isSuccess } = useSelector((state) => state.product);
    const ProductEdit=useSelector(selectedProduct)
    const[product,setProduct]=useState(ProductEdit)
    const [productImage, setProductImage] = useState('');
    const [imgpreview,setImageprev] = useState(null);
    
 
    const {title,description,price,height,lengthpic,width,mediumused,weight,category}=product ; 

    useEffect(()=>{
        setProduct(ProductEdit)
        setImageprev(ProductEdit && ProductEdit.image ? `${ProductEdit.image.filePath}` : null )
    },[ProductEdit])
     
    const handleImageChange = (e) => {
     const file = e.target.files[0];
     if (file) {
       setProductImage(file);
       setImageprev(URL.createObjectURL(file)); 
     }
   };
 
     const handleInput =(e)=>{
       const {name,value}= e.target;
       setProduct({
         ...product,
         [name]: value
       })
     };
 
   
   
     const handleUpdateProduct =async(e)=>{
        e.preventDefault();
 
        const formData=new FormData()
         formData.append('title',title)
         formData.append('description',description)
         formData.append('price',price)
         formData.append('lengthpic',lengthpic)
         formData.append('height',height)
         formData.append('width',width)
         formData.append('mediumused',mediumused)
         formData.append('weight,',weight)
 
         if (productImage) {
           formData.append('image', productImage);
         }
          if(category){
           formData.append('category',category.label)
          }
 
       await dispatch(updateProduct({id,formData}))
 
        if (isSuccess) {
         navigate('/product');
        }
 
     };

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Update Product
        </Title>
        <hr className="my-5" />
        <form onSubmit={handleUpdateProduct}>
          <div className="w-full">
            <Caption className="mb-2">Title *</Caption>
            <input type="text" name="title" value={product.title} onChange={handleInput} className={`${commonClassNameOfInput}`} placeholder="Title" required />
          </div>

          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <Caption className="mb-2">Height (cm) </Caption>
              <input type="number" name="height" value={product.height} onChange={handleInput} placeholder="height" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Length (cm) </Caption>
              <input type="number" name="lengthpic" value={product.lengthpic} onChange={handleInput}  placeholder="Length" className={`${commonClassNameOfInput}`} />
            </div>
          </div>
          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <Caption className="mb-2">Width (cm) </Caption>
              <input type="number" name="width" value={product.width} onChange={handleInput} placeholder="width" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">
                Medium used <span className="text-purple-400 italic">(Typically, pencil, ink, charcoal or other)</span>
              </Caption>
              <input type="text" name="mediumused" value={product.mediumused} onChange={handleInput}  placeholder="Medium used" className={commonClassNameOfInput} />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="w-1/2">
              <Caption className="mb-2">
                Weight of piece <span className="text-purple-400 italic">(kg)</span>
              </Caption>
              <input type="number" name="weigth" value={product.weight} onChange={handleInput} placeholder="weigth" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Price Range*</Caption>
              <input type="number" name="price" value={product.price} onChange={handleInput} className={`${commonClassNameOfInput}`} placeholder="Price" required />
            </div>
          </div>

          <div>
            <Caption className="mb-2">Description *</Caption>
            <textarea name="description" value={product.description} onChange={handleInput} className={`${commonClassNameOfInput}`} cols="30" rows="5"></textarea>
          </div>
          <div>
            <Caption className="mb-2">Image </Caption>
            <input type="file" onChange={handleInput} className={`${commonClassNameOfInput}`} name="image" />
          </div>
          <PrimaryButton type="submit" className="rounded-none my-5">
            Update
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};