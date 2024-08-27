import React, { useContext } from 'react'
import './Category.css'
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom';
import { serverUrl } from '../../service/serverUrl';


function Category() {

    const { category } = useContext(ShopContext)
    // console.log(category);

    return (
        <>
            <div className="category-data">
                <h3>Categories</h3>

                <div className='shop-by-category'>
                    {
                        category.map((item, i) => {
                            return <div key={i} >
                                <Link to={`/${item.category_name}`} style={{ textDecoration: 'none' }}>
                                    <div className='shop-by-category-items'>
                                        <img src={`${serverUrl}/images/`+item.category_image} alt="" />
                                        <h5>{item.category_title}</h5>
                                    </div>
                                </Link>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Category