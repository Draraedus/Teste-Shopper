import axios from "axios"
import { ProductsUpdate, ProductsAllInformation } from "../types/custom"

export function putProducts(isAPack: boolean[], productsInformation: ProductsAllInformation[]): void{

    const productsUpdate: ProductsUpdate[] = []

    for(let i = 0; i < productsInformation.length; i++){

        if(isAPack && productsInformation[i].pack !== undefined){
            productsUpdate.push(
                {
                    code: productsInformation[i].new_value.code,
                    sales_price: productsInformation[i].new_value.new_price  
                }
            )

            productsUpdate.push(
                {
                    code: productsInformation[i].productItem!.code,
                    sales_price: productsInformation[i].new_value.new_price / productsInformation[i].pack!.qty
                }
            )
        } else if(!isAPack && productsInformation[i].pack !== undefined){

            productsUpdate.push(
                {
                    code: productsInformation[i].new_value.code,
                    sales_price: productsInformation[i].new_value.new_price  
                }
            )

            productsUpdate.push(
                {
                    code: productsInformation[i].productPack!.code,
                    sales_price: productsInformation[i].new_value.new_price * productsInformation[i].pack!.qty
                }
            )
        } else {
            productsUpdate.push(
                {
                    code: productsInformation[i].new_value.code,
                    sales_price: productsInformation[i].new_value.new_price  
                }
            )
        }
    }

    axios.put(`http://localhost:3001/products`, productsUpdate, {headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
    },})
    .then((response) => {

        console.log('Resposta da requisição:', response.data)
    })
    .catch((error) => {

        console.error('Erro na requisição:', error)
    })
}