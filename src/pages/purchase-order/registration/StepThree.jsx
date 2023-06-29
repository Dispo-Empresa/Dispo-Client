import { Step } from "../../../components/structured/stepper/Stepper";

const StepThree = (props) => {
    return (
      <Step {...props}>
        <div>
          <h2>Detalhes da ordem de compra</h2>
          <p>Número da ordem: {props.entity.orderNumber}</p>
          <p>Data de criação: {props.entity.creationDate}</p>
          <p>Tipo de notificação: {props.entity.notificationType}</p>
          <p>Fornecedor: {props.entity.supplier}</p>
          <p>Produto: {props.entity.product}</p>
          <p>Quantidade: {props.entity.quantity}</p>
          <p>Valor total: {props.entity.totalPurchaseValue}</p>
          <p>Frete: {props.entity.shipping}</p>
          <p>Tempo de entrega: {props.entity.DeliveryTimeFrame}</p>
          <p>Descrição: {props.entity.description}</p>
        </div>
      </Step>
    );
};

export default StepThree;