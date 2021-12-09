import React from 'react'
import './Cart.css'
import '../../App.css'
const Cart = () => {
    return (
        <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name of Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <th>Giày da</th>
                  <th>2500000</th>
                  <th>Created</th>
                  <th>
                    <button className='button-action green'>Detail</button>
                    <button className='button-action red'>Cancel</button>
                  </th>
                </tr>
              </tbody>
            </table>
    )
}

export default Cart
