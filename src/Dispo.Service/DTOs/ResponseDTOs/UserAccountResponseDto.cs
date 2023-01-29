using System.Text.Json.Serialization;

namespace Dispo.Service.DTOs.ResponseDTOs
{
    public class UserAccountResponseDto
    {
        [JsonIgnore]
        public long Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CpfCnpj { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
    }
}