namespace Dispo.Domain.Dtos
{
    public class WarehouseAddressDto
    {
        public long WarehouseId { get; set; }
        public long AddressId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public bool CurrentWarehouse { get; set; }
    }
}