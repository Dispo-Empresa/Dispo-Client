namespace Dispo.Domain.Enums
{
    public enum ePurchaseOrderStatus
    {
        CREATED,  //Quando a ordem de compra é criada, ou quando é recusada mas vai ser renegociada
        CANCELED, //Pode ser cancelada a qualquer momento desde que não esteja com o status finished
        AWAITING_SUPPLIER, //Quando está com status Created pode ir para esse status quando enviar a ordem de compra para o fornecedor
        DECLINED, //fornecedor recusou a ordem de compra,só pode vir pra esse status caso a ordem de compra esteja como "AWAITING_SUPPLIER"
        FINISHED //só pode vir pra esse status caso esteja esteja como AWAITING_SUPPLIER e o fornecedor aceitou a ordem de compra
    }
}