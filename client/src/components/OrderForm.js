import React, { useState } from 'react'
import './Form.css'
import useModal from './useModal'
const OrderForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        address:"",
        quantity: 0,
        description:"",
        category:"",
        image:""
      })
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    return (
    <form className='form' onSubmit={handleSubmit}>
        <div className="form-content">
        <div className="col-6">
        <div className='form-control'>
            <label htmlFor='name'>Name: </label>
            <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
            />
        </div>
        
        <div className='form-control'>
            <label htmlFor='price'>Price: </label>
            <input
                type='textarea'
                id='price'
                name='price'
                value={formData.price}
                onChange={handleChange}
            />
        </div>
        <div className='form-control'>
            <label htmlFor='address'>Address: </label>
            <textarea
                id='address'
                name='address'
                value={formData.address}
                onChange={handleChange}
            />
        </div>

        <div className='form-control'>
            <label htmlFor='price'>Product Image: </label>
            <input type="url" name="image" id="image" value={formData.description} onChange={handleChange} placeholder='Product image url...'/>
        </div>
        </div>
        <div className="col-6">
        <div className='form-control'>
            <label htmlFor='category'>Category: </label>
            <input
                type='text'
                id='category'
                name='category'
                value={formData.category}
                onChange={handleChange}
            />
        </div>
        <div className='form-control'>
            <label htmlFor='quantity'>Quantity: </label>
            <input
                type='number'
                id='quantity'
                name='quantity'
                value={formData.quantity}
                onChange={handleChange}
            />
        </div>
        <div className='form-control'>
            <label htmlFor='description'>Description: </label>
            <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
            />
        </div>
        </div>
        </div>
        <div className='form-footer'>
        <button type="submit" onClick={handleSubmit}>Create</button>
        </div>
    </form>
    )
}

export default OrderForm