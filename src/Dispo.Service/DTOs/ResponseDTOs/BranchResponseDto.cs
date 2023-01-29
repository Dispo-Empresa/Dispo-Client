namespace Dispo.Service.DTOs.ResponseDTOs
{
    public class BranchResponseDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Cnpj { get; set; }
        public long LocationId { get; set; }
    }
}