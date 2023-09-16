import React from 'react';
import './stylesStepThree.css';

import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import { Step } from "../../../components/structured/stepper/Stepper";

const StepThree = (props) => {
  return (
    <Step {...props}>
      <RegisterPanel title="Detalhes da ordem de compra" hideSaveButton={true}> 
        <div className="grayBackground"> 
          <h3>Fornecedor: {props.entity.supplier}</h3>
          <p>Número da ordem: {props.entity.orderNumber}</p>
          <p>Data de criação: {props.entity.creationDate}</p>
          <p>Tipo de notificação: {props.entity.notificationType}</p>
        </div>    
      </RegisterPanel>

      <RegisterPanel title="Informações do pedido" hideSaveButton={true}>
        <div className="orderInfoWrapper">
          {props.order.map((item, index) => (
            <div key={index} className="orderInfo grayBackground"> 
              <h3>Produto: {item.product}</h3>
              <p>Quantidade: {item.quantity}</p>
              <p>Valor total: R${item.totalPurchaseValue}</p>
              <p>Frete: R${item.shipping}</p>
              <p>Tempo de entrega: {item.DeliveryTimeFrame}</p>
              <p>Descrição do produto: {item.description}</p>
            </div>
          ))}
        </div>
      </RegisterPanel>
    </Step>
  );
};

export default StepThree;
