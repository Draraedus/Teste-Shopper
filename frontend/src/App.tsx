import React, { useEffect, useState } from 'react';
import './App.css';
import CSVReader from 'react-csv-reader';
import productsRulesValidate from './utils/productsRulesValidate';
import { getPacks, getProducts } from './services/apiGetRequests';
import { Packs, Products, ProductsAllInformation } from './types/custom';
import { AxiosError, AxiosResponse } from 'axios';
import ProductsTableRow from './components/ProductsTable';
import rulesAllTrueCheck from './utils/rulesAllTrueCheck';
import { putProducts } from './services/apiPutRequest';

function App() {
  
  const [ productsCsvUpdateState, setProductsCsvUpdateState ] = useState<number[][]>([])
  const [ productsState, setProductsState] = useState<Products[]>([])
  const [ packsState, setPacksState] = useState<Packs[]>([])

  const [ validateLoadingState, setValidateLoadingState ] = useState<boolean>(false)
  const [ updateButtonState, setUpdateButtonState ] = useState<boolean>(false)

  const [ rulesState, setRulesState] = useState<boolean[][]>([])
  const [ productsInformationsState, setProductsInformationsState] = useState<ProductsAllInformation[]>([])

  useEffect(() => {

    getProducts()
    .then((response: AxiosResponse) => {

      setProductsState(response.data)
    })
    .catch((error: AxiosError) => {

      console.error('Erro na requisição:', error)
    })

    getPacks()
    .then((response: AxiosResponse) => {

      setPacksState(response.data)
    })
    .catch((error: AxiosError) => {

      console.error('Erro na requisição:', error)
    })
  }, [])

  const validateButtonHandler = () => {
    if(productsCsvUpdateState.length !== 0){
      const {rules, productInformations} = productsRulesValidate(productsCsvUpdateState, productsState, packsState)
  
      setRulesState(rules)
      setProductsInformationsState(productInformations)
      setValidateLoadingState(true)

  
      if(rulesAllTrueCheck(rules)){
        setUpdateButtonState(true)
      }
    }
  }

  const updateButtonHandler = () => {
    if(window.confirm("Deseja mesmo atualizar os preços?") === true){
      putProducts(rulesState[4], productsInformationsState)
    }
  }

  return (
    <div className='AppPage'>
      <div className='FileContainer'>
        <h1>Shopper</h1>
        <CSVReader onFileLoaded={(data) => setProductsCsvUpdateState(data)} />
        <button className="ButtonStyle" onClick={validateButtonHandler}>Validar</button>
      </div>
      {validateLoadingState && 
      <table className='TableContainer'>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Preço Atual</th>
            <th>Novo Preço</th>
            <th>Regra 1</th>
            <th>Regra 2</th>
            <th>Regra 3</th>
            <th>Regra 4</th>
          </tr>
        </thead>
        <tbody>
        {productsCsvUpdateState.map((value, index) => {
          return <ProductsTableRow index={index} rulesState={rulesState} productsInformationsState={productsInformationsState} key={index}/>
        })}
        </tbody>
      </table>}
      {
        updateButtonState && 
          <button className="ButtonStyle" onClick={updateButtonHandler}>Atualizar</button>
      }
      <div className='InfoContainer'>
        <p>Regra 1: Todos os campos necessários existem?</p>
        <p>Regra 2: Os códigos de produtos informados existem?</p>
        <p>Regra 3: Os preços estão preenchidos e são valores numéricos validos.?</p>
        <p>Regra 4: O arquivo respeita as regras levantadas na seção CENARIO? </p>
      </div>
    </div>
  );
}

export default App;
