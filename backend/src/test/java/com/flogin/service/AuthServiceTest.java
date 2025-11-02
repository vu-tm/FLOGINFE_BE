package com.flogin.service;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.flogin.entity.LoginRequest;
import com.flogin.entity.LoginResponse;
import com.flogin.entity.User;
import com.flogin.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {
    
    //Tạo mock repository người dùng
    @Mock
    private UserRepository userRepository;

    //Chèn mock vào authService
    @InjectMocks
    private AuthService authService;
    
    @BeforeEach
    void setUp()
    { 
        MockitoAnnotations.openMocks(this);
        authService = new AuthService(userRepository);
    }

    @Test
    @DisplayName("TC1: Login thanh cong voi credentials hop le")
    void testLoginSuccess()
    { 
        LoginRequest request = new LoginRequest(
            "testuser", "Test123"
        );
        when(userRepository.findByUsername(request.getUsername())).thenReturn(new User(request.getUsername(), request.getPassword()));

        LoginResponse response = authService.authenticate(request);

        assertTrue(response.isSuccess());
        assertEquals("Dang nhap thanh cong", response.getMessage());
        assertNotNull(response.getToken());
    }

    @Test
    @DisplayName("TC2: Login that bai voi neu khong tim duoc username trong database")
    void testLoginFailure_usernameNotFound()
    {
        LoginRequest request = new LoginRequest(
            "wronguser", "Pass123"
        );
        when(userRepository.findByUsername(request.getUsername())).thenReturn(null);
        
        LoginResponse response = authService.authenticate(request);

        assertFalse(response.isSuccess());
    }

    @Test
    @DisplayName("TC3: Login that bai voi password sai")
    void testLoginFailure_wrongPassword()
    { 
        LoginRequest request = new LoginRequest(
            "username123", "Password123"
        );

        when(userRepository.findByUsername(request.getUsername())).thenReturn(new User("username123", "Password456"));
        LoginResponse reponse = authService.authenticate(request);
        
        assertFalse(reponse.isSuccess());
    }

    @Test
    @DisplayName("TC4: Login bo trong password")
    void testLoginFailure_emptyPassword()
    { 
        LoginRequest request = new LoginRequest(
            "username123", ""
        );
        when(userRepository.findByUsername(request.getUsername())).thenReturn(new User( "username123", "Password123"));

        LoginResponse response = authService.authenticate(request);
        
        assertFalse(response.isSuccess());
    }
}
