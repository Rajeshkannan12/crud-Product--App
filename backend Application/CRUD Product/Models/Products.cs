using System.ComponentModel.DataAnnotations;

namespace CRUD_Product.Models
{
    public class Products
    {
        public int id { get; set; }

        [Required]
        public string productName { get; set; }

        [Required]
        public string Description { get; set; }

        [Range(0, double.MaxValue)]
        public decimal amount { get; set; }
    }
}
