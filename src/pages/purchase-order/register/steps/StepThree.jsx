import React from "react";
import "./stylesStepThree.css";

import { StepLayout } from "../../../../components/structured/stepper/Stepper";

const StepThree = (props) => {
  return (
    <StepLayout {...props}>
      <div>
        {props.purchaseOrderInfo && (
          <div className="grayBackground">
            <h3>Fornecedor: {props.purchaseOrderInfo.supplier}</h3>
            <p>Número da ordem: {props.purchaseOrderInfo.orderNumber}</p>
            <p>
              Data de criação: {props.purchaseOrderInfo.creationDate.toString()}
            </p>
            <p>
              Tipo de notificação: {props.purchaseOrderInfo.notificationType}
            </p>
          </div>
        )}
        {props.orderInfo &&
          props.orderInfo.map((item, index) => (
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
    </StepLayout>
  );
};

export default StepThree;
