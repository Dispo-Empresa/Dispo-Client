import { useState } from "react";

function UseFieldsStepOne(){
    const [fields, setFields] = useState({
        orderNumber: null,
        creationDate: null,
        notificationType: null,
        supplier: null
    });

    const handleFieldChange = (fieldName, value) => {
        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
          }))
    };

    const requiredFields = ["orderNumber", "creationDate", "notificationType", "supplier"];

    const handleExistsRequiredFieldsNotAnswered = () => {
        return requiredFields.filter((field) => !fields[field]).length > 0;
    };

    return [
        fields,
        handleFieldChange,
        handleExistsRequiredFieldsNotAnswered
    ];
}

function UseFieldsStepTwo(){
    const [fields, setFields] = useState({
        product: null,
        quantity: null,
        totalPurchaseValue: null,
        shipping: null,
        DeliveryTimeFrame: null,
        description: null
    });

    const [order, setOrder] = useState([]);

    const handleFieldChange = (fieldName, value) => {
        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
        }));
    };

    const requiredFields = ["product", "quantity", "totalPurchaseValue", "shipping", "DeliveryTimeFrame"];

    const handleExistsRequiredFieldsNotAnswered = () => {
        return requiredFields.filter((field) => !fields[field]).length > 0;
    };

    const handleExistsDuplicateFields = (order, fields) => {
        return order.some(item => item.product === fields.product);
    };

    return [
        fields,
        order,
        setOrder,
        handleFieldChange,
        handleExistsRequiredFieldsNotAnswered, 
        handleExistsDuplicateFields
    ];
}

export {UseFieldsStepOne, UseFieldsStepTwo};