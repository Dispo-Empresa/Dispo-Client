import { useState } from "react";

function UseFieldsStepOne(){
    const [fields, setFields] = useState({
        orderNumber: null,
        creationDate: null,
        notificationType: null
    });

    const handleFieldChange = (fieldName, value) => {
        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
          }))
    };

    const requiredFields = ["orderNumber", "creationDate", "notificationType"];

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
        supplier: null,
        product: null,
        quantity: null,
        totalPurchaseValue: null,
        shipping: null,
        DeliveryTimeFrame: null,
        description: null
    });

    const handleFieldChange = (fieldName, value) => {
        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
        }));

        console.log(fields);  
    };

    const requiredFields = ["supplier", "product", "quantity", "totalPurchaseValue", "shipping", "DeliveryTimeFrame"];

    const handleExistsRequiredFieldsNotAnswered = () => {
        return requiredFields.filter((field) => !fields[field]).length > 0;
    };

    return [
        fields,
        handleFieldChange,
        handleExistsRequiredFieldsNotAnswered
    ];
}

export {UseFieldsStepOne, UseFieldsStepTwo};