import { Packs, Products, ProductsAllInformation } from "../types/custom"

type ProductsAndRulesValidationType = {
    rules: boolean[][]
    productInformations: ProductsAllInformation[]
}

export default function productsRulesValidate(matriz: number[][], products: Products[], packs: Packs[]): ProductsAndRulesValidationType {
    const ruleOneArray:boolean[] = []
    const ruleTwoArray:boolean[] = []
    const ruleThreeArray:boolean[] = []
    const ruleFourArray:boolean[] = []
    const isAPack: boolean[] = []
    const rules: boolean[][] = [ruleOneArray, ruleTwoArray, ruleThreeArray, ruleFourArray, isAPack]

    let productInformations: ProductsAllInformation[] = []


    for(let i =0; i< matriz.length; i++){
        let numColumns = matriz[i].length

        if (numColumns % 2 !== 0) {
            ruleOneArray.push(false)

            productInformations.push ({
                new_value: {code: matriz[i][0]? Number(matriz[i][0]) : 0, new_price: matriz[i][1]? Number(matriz[i][1]) : NaN},
                productItem: undefined,
                pack: undefined,
                productPack: undefined
            })

        } else if (isNaN(matriz[i][1])){
            ruleOneArray.push(true)

            ruleThreeArray.push(false)

            productInformations.push ({
                new_value: {code: Number(matriz[i][0]), new_price: NaN},
                productItem: undefined,
                pack: undefined,
                productPack: undefined
            })
        }
        else {
            ruleOneArray.push(true)

            ruleThreeArray.push(true)

            productInformations.push ({
                new_value: {code: Number(matriz[i][0]), new_price:Number(matriz[i][1])},
                productItem: undefined,
                pack: undefined,
                productPack: undefined
            })
        }
    }

    for(let i =0; i< matriz.length; i++){
        const productHelper = returnProduct(products, productInformations[i].new_value.code)
        

        if(productHelper !== undefined) {

            ruleTwoArray.push(true)


            const returnPackFromProductHelper = returnPackFromProduct(packs, productInformations[i].new_value.code)
            const returnPackFromPackHelper = returnPackFromPack(packs, productInformations[i].new_value.code)
        
        
            if(returnPackFromProductHelper !== undefined) {
                isAPack.push(false)
        
                const PackofProduct:Products | undefined =  returnProduct(products, returnPackFromProductHelper.pack_id)
        
                if(PackofProduct !== undefined) {
        
                    productInformations[i] = (
                        {
                            new_value: {code: Number(matriz[i][0]), new_price: Number(matriz[i][1])},
                            productItem: productHelper,
                            pack: returnPackFromProductHelper,
                            productPack: PackofProduct
                        }
                    )
        
                    if(matriz[i][1] < productHelper.sales_price*1.10 &&
                        matriz[i][1] > productHelper.sales_price*0.90 &&
                        matriz[i][1] > productHelper.cost_price && 
                        matriz[i][1]*returnPackFromProductHelper.qty < PackofProduct.sales_price*1.10 &&
                        matriz[i][1]*returnPackFromProductHelper.qty > PackofProduct.sales_price*0.90 &&
                        matriz[i][1]*returnPackFromProductHelper.qty > PackofProduct.cost_price
                        ){
        
                        ruleFourArray.push(true)
                    } else {
        
                        ruleFourArray.push(false)
                    }
                }
        
            } else if(returnPackFromPackHelper !== undefined) {
                isAPack.push(true)
        
                const productOfPack:Products | undefined =  returnProduct(products, returnPackFromPackHelper.product_id)
        
                if(productOfPack !== undefined) {
                    
                    productInformations[i] = (
                        {
                            new_value: {code: Number(matriz[i][0]), new_price: Number(matriz[i][1])},
                            productItem: productOfPack,
                            pack: returnPackFromPackHelper,
                            productPack: productHelper
                        }
                    )
        
        
                    if(matriz[i][1] < productHelper.sales_price*1.10 &&
                        matriz[i][1] > productHelper.sales_price*0.90 &&
                        matriz[i][1] > productHelper.cost_price &&
                        matriz[i][1]/returnPackFromPackHelper.qty < productOfPack.sales_price*1.10 &&
                        matriz[i][1]/returnPackFromPackHelper.qty > productOfPack.sales_price*0.90 &&
                        matriz[i][1]/returnPackFromPackHelper.qty > productOfPack.cost_price
                        ){
                        ruleFourArray.push(true)
                    } else {
                        ruleFourArray.push(false)
                    }
                }
        
            } else {
                isAPack.push(false)
        
                productInformations[i] =(
                    {
                        new_value: {code: Number(matriz[i][0]), new_price: Number(matriz[i][1])},
                        productItem: productHelper,
                        pack: undefined,
                        productPack: undefined
                    }
                )
        
                if(matriz[i][1] < productHelper.sales_price*1.10 && 
                    matriz[i][1] > productHelper.sales_price*0.90 && 
                    matriz[i][1] > productHelper.cost_price
                    ){
        
                    ruleFourArray.push(true)
                } else {

                    ruleFourArray.push(false)
                }
            }
        } else {

            ruleTwoArray.push(false)
        }
    }

    return {rules: rules, productInformations: productInformations}
}

function returnProduct(products: Products[], code :number): Products | undefined{

    return products.find((product) => product.code === code)
}

function returnPackFromProduct(products: Packs[], code :number): Packs | undefined{

    return products.find((product) => product.product_id === code)
}

function returnPackFromPack(products: Packs[], code :number): Packs | undefined{

    return products.find((product) => product.pack_id === code)
}
