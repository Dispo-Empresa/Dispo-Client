namespace Dispo.Service.DTOs.RequestDTOs
{
    public class CreateEmployeeRequestDto
    {
        public string Email { get; set; }
        public long RoleId { get; set; }
        public IList<long> WarehousesId { get; set; }
    }
}
