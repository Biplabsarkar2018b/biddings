import axios from 'axios';
import React,{useState} from 'react'
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const userId = localStorage.getItem('userID')
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        listedBy: '',
        description: '',
        price: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            ['listedBy']:userId
        })
        console.log(formData);
        axios.post(`${BASE_URL}/addProduct`,formData)
        .then(res=>{
            alert('Your Product has been Listed')
            navigate('/')
        })
        .catch(err=>{
            console.log(err);
        })
      };
    
      return (
        <div className="p-4">
        <h1 className='text-3xl font-bold text-center'>Add Product</h1>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
    
            {/* <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="listedBy">
                Listed By
              </label>
              <input
                type="text"
                name="listedBy"
                id="listedBy"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter listed by"
                value={formData.listedBy}
                onChange={handleChange}
              />
            </div> */}
    
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="4"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
    
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price
              </label>
              <input
                type="text"
                name="price"
                id="price"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter product price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
    
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      );
}

export default AddProduct