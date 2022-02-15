package com.tiburcio.bicycles;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.socket.engineio.server.EngineIoServer;

@Configuration
public class AppConfig {
    @Bean
    public EngineIoServer engineIoServer() {
        return new EngineIoServer();
    }
}
