package com.noCountry.library.controller;

import com.noCountry.library.dto.Login;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate")
public class AuthenticateController {

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody @Valid Login login){

        return null;
    }

}
