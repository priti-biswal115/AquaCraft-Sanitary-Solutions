using AquaCraft.API.DTOs;
using AquaCraft.API.DTOs;
using AquaCraft.API.Interfaces;
using AquaCraft.API.Models;
using AquaCraft.API.Repositories;

namespace AquaCraft.API.Services;

public class ProductService : IProductService
{
    private readonly ProductRepository _productRepository;

    public ProductService(ProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        var products = await _productRepository.GetAllAsync();
        return products.Select(p => MapToDto(p));
    }

    public async Task<ProductDto?> GetProductByIdAsync(int id)
    {
        var product = await _productRepository.GetByIdAsync(id);
        return product == null ? null : MapToDto(product);
    }

    public async Task<ProductDto> CreateProductAsync(ProductDto productDto)
    {
        var product = MapToEntity(productDto);
        var createdProduct = await _productRepository.AddAsync(product);
        return MapToDto(createdProduct);
    }

    public async Task<ProductDto?> UpdateProductAsync(int id, ProductDto productDto)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null)
            return null;

        product.ProductType = productDto.ProductType;
        product.ProductName = productDto.ProductName;
        product.HSNCode = productDto.HSNCode;

        var updatedProduct = await _productRepository.UpdateAsync(product);
        return MapToDto(updatedProduct);
    }

    public async Task<bool> DeleteProductAsync(int id)
    {
        return await _productRepository.DeleteAsync(id);
    }

    private ProductDto MapToDto(Product product)
    {
        return new ProductDto
        {
            ProductId = product.ProductId,
            ProductType = product.ProductType,
            ProductName = product.ProductName,
            HSNCode = product.HSNCode
        };
    }

    private Product MapToEntity(ProductDto productDto)
    {
        return new Product
        {
            ProductType = productDto.ProductType,
            ProductName = productDto.ProductName,
            HSNCode = productDto.HSNCode
        };
    }
}
