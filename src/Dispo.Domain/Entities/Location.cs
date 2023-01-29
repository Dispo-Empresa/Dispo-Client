namespace Dispo.Domain.Entities
{
    public class Location : Base
    {
        public long Id { get; set; }
        public string Country { get; set; }
        public string UF { get; set; }
        public string City { get; set; }
        public string District { get; set; }

        public Branch? Branch { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}