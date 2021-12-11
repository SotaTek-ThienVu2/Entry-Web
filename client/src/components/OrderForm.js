import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import './Form.css'
import { useForm } from "react-hook-form"
const OrderForm = ({hide}) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const history = useHistory() 
    const onSubmit = (data) => {
        hide()
    }
    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className="form-content">
                <div className="col-6">
                    <div className='form-control'>
                        <label htmlFor='name'>Name: </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            {...register("name", { required: true, minLength: 6 })}
                        />
                        {Object.keys(errors).length !== 0 && (<ul className="error">
                            {errors.name?.type === 'required' && <li>name is required!</li>}
                        </ul>)
                        }
                    </div>
                    <div className='form-control'>
                        <label htmlFor='price'>Price: </label>
                        <input
                            type='textarea'
                            id='price'
                            name='price'
                            {...register("price", { required: true })}
                        />
                        {Object.keys(errors).length !== 0 && (<ul className="error">
                            {errors.price?.type === 'required' && <li>price is required!</li>}
                        </ul>)
                        }
                    </div>
                    <div className='form-control'>
                        <label htmlFor='address'>Address: </label>
                        <textarea
                            id='address'
                            name='address'
                            {...register("address", { required: true })}
                        />
                        {Object.keys(errors).length !== 0 &&
                            (<ul className="error">
                                {errors.address?.type === 'required' && <li>address is required!</li>}
                            </ul>)
                        }
                    </div>
                    <div className='form-control'>
                        <label htmlFor='price'>Product Image: </label>
                        <input type="url"
                            name="image"
                            id="image"
                            {...register("image", { required: true })}
                            placeholder='Product image url...' />
                        {Object.keys(errors).length !== 0 &&
                            (<ul className="error">
                                {errors.image?.type === 'required' && <li>image is required!</li>}

                            </ul>)
                        }
                    </div>
                </div>
                <div className="col-6">
                    <div className='form-control'>
                        <label htmlFor='category'>Category: </label>
                        <input
                            type='text'
                            id='category'
                            name='category'
                            {...register("category", { required: true })}
                        />
                        {Object.keys(errors).length !== 0 &&
                            (<ul className="error">
                                {errors.category?.type === 'required' && <li>category is required!</li>}

                            </ul>)
                        }

                    </div>
                    <div className='form-control'>
                        <label htmlFor='quantity'>Quantity: </label>
                        <input
                            type='number'
                            id='quantity'
                            name='quantity'
                            {...register("quantity", { required: true })}
                        />
                        {Object.keys(errors).length !== 0 &&
                            (<ul className="error">
                                {errors.quantity?.type === 'required' && <li>quantity is required!</li>}
                            </ul>)}

                    </div>
                    <div className='form-control'>
                        <label htmlFor='description'>Description: </label>
                        <textarea
                            id='description'
                            name='description'
                            {...register("description", { required: true })}
                        />
                        {Object.keys(errors).length !== 0 &&
                            (<ul className="error">
                                {errors.description?.type === 'required' && <li> description is required!</li>}
                            </ul>)}
                    </div>
                </div>
            </div>
            <div className='form-footer'>
                <button type="submit" >Create</button>
            </div>
        </form>
    )
}

export default OrderForm