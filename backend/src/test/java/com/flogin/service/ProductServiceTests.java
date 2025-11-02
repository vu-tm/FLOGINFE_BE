package com.flogin.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

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
}
