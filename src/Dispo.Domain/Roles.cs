namespace Dispo.Domain
{
    public static class Roles
    {
        public const string Manager = "manager";
        public const string PurchasingManager = "purchasingManager";
        public const string WarehouseOperator = "warehouseOperator";
        public const string All = "manager,purchasingManager,warehouseOperator";

        public static bool IsValid(string role)
        {
            return role == Manager || role == PurchasingManager || role == WarehouseOperator;
        }
    }
}