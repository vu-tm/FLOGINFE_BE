package com.flogin.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.flogin.dto.ProductDto;
import com.flogin.entity.Product;
import com.flogin.repository.ProductRepository;

@DisplayName("Product Service Unit Tests")
public class ProductServiceTests {
        @Mock // Tạo mock object
        private ProductRepository productRepository;

        @InjectMocks
        private ProductService productService; // Chèn mock vào ProductService

        @BeforeEach
        void setUp() {
                MockitoAnnotations.openMocks(this);
        }

        @Test
        @DisplayName("TC1: Tạo sản phẩm mới thành công")
        void testCreateProduct() {
                ProductDto productDto = new ProductDto(
                                "Laptop", 15000000, 10, "Electronics");
                Product product = new Product(
                                1L, "Laptop", 15000000, 10, "Electronics");

                when(productRepository.save(any(Product.class)))
                                .thenReturn(product);

                ProductDto result = productService.createProduct(productDto);

                assertNotNull(result);
                assertEquals("Laptop", result.getName());
                verify(productRepository, times(1)).save(any(Product.class));
        }
}