package com.flogin.service;

import org.springframework.stereotype.Service;

import com.flogin.dto.ProductDto;
import com.flogin.entity.Product;
import com.flogin.repository.ProductRepository;

@Service
public class ProductService {

    // Không dùng Autowired
    // Dùng constructor -> private final
    private final ProductRepository productRepository;

    // add constructor
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // CREATE - Tạo sản phẩm mới
    public ProductDto createProduct(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setQuantity(productDto.getQuantity());
        product.setCategory(productDto.getCategory());

        Product savedProduct = productRepository.save(product);

        return mapToDto(savedProduct);
    }

    private ProductDto mapToDto(Product product) {
        return new ProductDto(
                product.getName(),
                product.getPrice(),
                product.getQuantity(),
                product.getCategory());
    }
}
