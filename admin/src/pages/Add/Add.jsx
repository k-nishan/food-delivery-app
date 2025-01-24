import React from "react";
import "./Add.css";
import { assets } from "../../assets/assets";

const Add = () => {
  return (
    <div className='add'>
      <form className='flex-col'>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={assets.upload_area} alt='' />
          </label>
          <input type='file' id='image' hidden required />
        </div>
        <div className='add-product-name flex-col'>
          <p>product Name</p>
          <input type='text' name='name' placeholder='Type heare' />
        </div>
        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea
            name='description'
            rows='6'
            placeholder='Description'
            required
          ></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select name='category'>
              <option value='Salad'>Salad</option>
              <option value='Rools'>Rools</option>
              <option value='Desecrts'>Desecrts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodels'>Noodels</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="Number" name="price" placeholder="$20" />
          </div>
        </div>
        <button type="submit" className="add-button">ADD</button>
      </form>
    </div>
  );
};

export default Add;
