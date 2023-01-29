namespace Dispo.Domain.Enums
{
    public enum ePaymentMethod
    {
        DebitCard = 0,
        CartaoDebito = 0,

        CreditCard = 1,
        CartaoCredito = 1,

        Money = 2,
        Dinheiro = 2,

        BankerDraft = 3,
        TransferenciaBancariam = 3,

        Pix = 4,

        BankSlip = 5,
        Boleto = 5,

        Other
    }
}