import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { API_URL, fromImageToUrl } from '../utils/urls';
import Link from 'next/link';

export default function Home({products}) {
  //console.log(products["data"]);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {products["data"].map(product=>{
          return(
            <div key={product.attributes.slug} className={styles.product}>
              <Link href={'/products/'+product.attributes.slug}>
                <a>

              <div>
                <img src={fromImageToUrl(product.attributes.img)}/>
                {product.attributes.name}
              </div>
              <div>
                {product.attributes.price}
              </div>
                </a>
              </Link>
            </div>
          )
        })}
      </main>

    </div>
  )
}

export async function getStaticProps(){
  const product_res = await fetch(`${API_URL}/products/`);
  const products = await product_res.json();

  return {
    props: {
      products
    }
  }
}