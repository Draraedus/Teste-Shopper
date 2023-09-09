import { ProductsAllInformation } from "../types/custom"
import { AiOutlineClose, AiOutlineCheck, AiOutlineExclamation } from 'react-icons/ai'

interface TableRowProps {
    index: number
    rulesState: boolean[][]
    productsInformationsState: ProductsAllInformation[]
}

const ProductsTableRow: React.FC<TableRowProps> = ({index, rulesState, productsInformationsState}) => {
    
    if (rulesState[4][index] === true && productsInformationsState[index].productPack !== undefined) {
    return (
        <tr>
            <td>{productsInformationsState[index].productPack?.code}</td>
            <td>{productsInformationsState[index].productPack?.name}</td>
            <td>{productsInformationsState[index].productPack?.sales_price}</td>
            <td>{isNaN(productsInformationsState[index].new_value.new_price)? <AiOutlineExclamation/> : productsInformationsState[index].new_value.new_price}</td>
            <td>{rulesState[0][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[1][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[2][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[3][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
        </tr>
    )
    } else if (rulesState[4][index] === false && productsInformationsState[index].productPack !== undefined) {
    return (
        <tr>
            <td>{productsInformationsState[index].productItem?.code}</td>
            <td>{productsInformationsState[index].productItem?.name}</td>
            <td>{productsInformationsState[index].productItem?.sales_price}</td>
            <td>{isNaN(productsInformationsState[index].new_value.new_price)? <AiOutlineExclamation/> : productsInformationsState[index].new_value.new_price}</td>
            <td>{rulesState[0][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[1][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[2][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[3][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
        </tr>
    )
    } else if(productsInformationsState[index].productItem !== undefined){
    return (
        <tr>
            <td>{productsInformationsState[index].productItem?.code}</td>
            <td>{productsInformationsState[index].productItem?.name}</td>
            <td>{productsInformationsState[index].productItem?.sales_price}</td>
            <td>{isNaN(productsInformationsState[index].new_value.new_price)? <AiOutlineExclamation/> : productsInformationsState[index].new_value.new_price}</td>
            <td>{rulesState[0][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[1][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[2][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[3][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
        </tr>
    )
    } else {
    return (
        <tr>
            <td>{<AiOutlineExclamation/>}</td>
            <td>{<AiOutlineExclamation/>}</td>
            <td>{<AiOutlineExclamation/>}</td>
            <td>{isNaN(productsInformationsState[index].new_value.new_price)? <AiOutlineExclamation/> : productsInformationsState[index].new_value.new_price}</td>
            <td>{rulesState[0][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[1][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[2][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
            <td>{rulesState[3][index] ? <AiOutlineCheck/> : <AiOutlineClose/>}</td>
        </tr>
    )
    }
}

export default ProductsTableRow