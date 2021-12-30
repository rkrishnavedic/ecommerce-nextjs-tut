import Head from 'next/head';
import products from '../../products.json';
import { API_URL } from '../../utils/urls';

const Product = ({product})=>{
    //console.log(product)
    return(
        <div>
            <Head>
                {product.attributes.meta_title
                && 
                <title>{product.attributes.meta_title}</title>
                }
                {product.attributes.meta_description &&
                <meta name='description' content={product.attributes.meta_description} />}
            </Head>
            <h3>{product.attributes.name}</h3>
            <p>Rs. {product.attributes.price}</p>

            <p>{product.attributes.content}</p>
        </div>
    )
}

export async function getStaticProps({params: {slug}}){
    const product_res = await fetch(`${API_URL}/products/?slug="${slug}"`);
    const foundTemp = await product_res.json();

    const found = foundTemp.data.filter(d => d.attributes.slug==slug)
    
    return {
        props:
        {
            product: found[0]
        }
    }
}

export async function getStaticPaths(){
    const product_res = await fetch(`${API_URL}/products/`);
    const products = await product_res.json();


    return {
        paths: products['data'].map(product=>{
            return {
                params: {slug: String(product.attributes.slug)}
            }
        }),
        fallback: false
    }
}

export default Product;