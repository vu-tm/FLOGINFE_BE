package com.flogin.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

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
                // Dữ liệu đầu vào
                ProductDto productDto = new ProductDto(
                                "Laptop", 15000000, 10, "Electronics");
                // Kết quả mong đợi khi lưu vào database
                Product product = new Product(
                                1L, "Laptop", 15000000, 10, "Electronics");

                when(productRepository.save(any(Product.class)))
                                .thenReturn(product);

                ProductDto result = productService.createProduct(productDto);

                assertNotNull(result);
                assertEquals("Laptop", result.getName());
                assertEquals(15000000, result.getPrice());
                assertEquals(10, result.getQuantity());
                assertEquals("Electronics", result.getCategory());

                verify(productRepository, times(1)).save(any(Product.class));
        }

        @Test
        @DisplayName("TC2: Lấy sản phẩm theo ID thành công")
        void testGetProduct() {
                Product product = new Product(
                                1L, "Laptop", 15000000, 10, "Electronics");

                when(productRepository.findById(1L))
                                .thenReturn(Optional.of(product));

                ProductDto result = productService.getProduct(1L);

                assertNotNull(result);
                assertEquals("Laptop", result.getName());
                assertEquals(15000000, result.getPrice());
                assertEquals(10, result.getQuantity());
                assertEquals("Electronics", result.getCategory());

                verify(productRepository, times(1)).findById(1L);
        }

        @Test
        @DisplayName("TC3: Cập nhật sản phẩm thành công")
        void testUpdateProduct() {
                ProductDto productDto = new ProductDto(
                                "Laptop Pro", 20000000, 12, "Electronics");
                Product existingProduct = new Product(
                                1L, "Laptop", 15000000, 10, "Electronics");
                Product updatedProduct = new Product(
                                1L, "Laptop Pro", 20000000, 12, "Electronics");

                when(productRepository.findById(1L))
                                .thenReturn(Optional.of(existingProduct));
                when(productRepository.save(any(Product.class)))
                                .thenReturn(updatedProduct);

                ProductDto result = productService.updateProduct(1L, productDto);

                assertNotNull(result);
                assertEquals("Laptop Pro", result.getName());
                assertEquals(20000000, result.getPrice());
                assertEquals(12, result.getQuantity());
                assertEquals("Electronics", result.getCategory());

                verify(productRepository, times(1)).findById(1L);
                verify(productRepository, times(1)).save(any(Product.class));
        }

        @Test
        @DisplayName("TC4: Xóa sản phẩm thành công")
        void testDeleteProduct() {
                Product product = new Product(
                                1L, "Laptop", 15000000, 10, "Electronics");

                when(productRepository.findById(1L))
                                .thenReturn(Optional.of(product));

                productService.deleteProduct(1L);

                verify(productRepository, times(1)).findById(1L);
                verify(productRepository, times(1)).delete(product);
        }
}