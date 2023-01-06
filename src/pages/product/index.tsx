import { useRouter } from "next/router"

const Product = () => {
    const { query } = useRouter()
    return (
        <h1>Product</h1>
    )
}
export default Product