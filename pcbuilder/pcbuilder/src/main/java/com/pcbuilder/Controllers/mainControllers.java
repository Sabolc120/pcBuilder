package com.pcbuilder.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class mainControllers {
    @GetMapping("/pong")
    private String testConnection(){
        return "Connection has been established";
    }
}
