import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useState } from "react";

import "./stylesStepThree.css";
import Button from "../../../../components/ui/buttons/classic/Button";
import { post } from "../../../../services/httpMethods";
import { ENDPOINTS } from "../../../../utils/constants/endpoints";
import { StepLayout } from "../../../../components/structured/stepper/Stepper";

const StepThree = (props) => {
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    try {
      setLoading(true);

      var data = {
        number: props.purchaseOrderInfo.orderNumber,
        creationDate: props.purchaseOrderInfo.creationDate,
        paymentMethod: props.purchaseOrderInfo.paymentMethod,
        notificationType: props.purchaseOrderInfo.notificationType,
        supplierId: props.purchaseOrderInfo.supplier,
        orders: props.orderInfo,
      };
      console.log(data);

      var response = await post(ENDPOINTS.purchaseorder.createPurchaseOrder,data);

      if (response.success) {
        console.log(response.success);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  var customButtons = [
    <Button
      title="Salvar ordem de compra"
      width="150px"
      height="40px"
      onClick={onSave}
      icon={<KeyboardDoubleArrowDownIcon />}
    />,
  ];

  return (
    <StepLayout {...props} customButtons={customButtons}>
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
            <p>Forma de pagamento: {props.purchaseOrderInfo.paymentMethod}</p>
          </div>
        )}
        {props.orderInfo &&
          props.orderInfo.map((item, index) => (
            <div key={index} className="orderInfo grayBackground">
              <h3>Produto: {item.product}</h3>
              <p>Quantidade: {item.quantity}</p>
              <p>Valor total: R${item.totalPrice}</p>
              <p>Descrição do produto: {item.description}</p>
            </div>
          ))}
      </div>
    </StepLayout>
  );
};

export default StepThree;
