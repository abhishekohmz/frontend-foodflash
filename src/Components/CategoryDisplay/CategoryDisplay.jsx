import React, { useContext } from 'react'
import './CategoryDisplay.css'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'
import { Container } from 'react-bootstrap'
import { serverUrl } from '../../service/serverUrl'


function CategoryDisplay() {

    const { category } = useContext(ShopContext);
    const { categoryName } = useParams()

    // console.log(category);
    const categoryData = category.find(e => e.category_name === categoryName);
    // console.log(categoryData);
    if (!categoryData) {
        return <Container>
            <div>Product not found</div>
        </Container>
    }
    // console.log(categoryData);


    const mappedCategoryItems = categoryData.category_items.map(item => ({
        id: item.id,
        categoryTitle: item.category_title,
        productName: item.product_name,
        offerPrice: item.offer_price,
        oldPrice: item.old_price,
        description: item.description,
        packGram: item.pack_gram,
        image: item.image,
    }));
    // console.log(mappedCategoryItems);
    return (
        <div>
            <Container>
               <div className="categoryy">
               <div className="categorydata">
                    {mappedCategoryItems.map((item, i) => {
                        return <Item key={i} id={item.id} description={item.description} productName={item.productName} image={`${serverUrl}/images/`+item.image} offerPrice={item.offerPrice} oldPrice={item.oldPrice} packGram={item.packGram} />
                    })}
                </div>
               </div>
            </Container>
        </div>



    )
}

export default CategoryDisplay