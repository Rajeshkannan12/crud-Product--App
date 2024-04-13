using CRUD_Product.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ProductController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private static readonly List<Products> _products = new List<Products>();

        [HttpGet("GetProducts")]
        public ActionResult<IEnumerable<Products>> GetProducts()
        {
            return Ok(_products);
        }

        [HttpPost("AddProduct")]
        public ActionResult<Products> AddProduct(Products product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            int newId = _products.Count + 1;
            product.id = newId;

            _products.Add(product);
            return CreatedAtAction(nameof(GetProducts), new { id = newId }, product);
        }

        [HttpPatch("UpdateProduct/{id}")]
        public ActionResult UpdateProduct(int id, Products product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingProduct = _products.Find(p => p.id == id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            existingProduct.productName = product.productName;
            existingProduct.Description = product.Description;
            existingProduct.amount = product.amount;

            return NoContent();
        }

        [HttpDelete("DeleteProduct/{id}")]
        public ActionResult DeleteProduct(int id)
        {
            var product = _products.Find(p => p.id == id);
            if (product == null)
            {
                return NotFound();
            }

            _products.Remove(product);
            return NoContent();
        }
    }
}
