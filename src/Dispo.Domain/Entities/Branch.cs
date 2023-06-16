namespace Dispo.Domain.Entities
{
    public class Branch : Base
    {
        public string Name { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;

        public long LocationId { get; set; }
        public Location Location { get; set; }

        public Warehouse Warehouse { get; set; } // Avaliar se precisa mesmo

        public ICollection<User> Employees { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}