package com.openclassrooms.mddapi.controller.advice;

import com.openclassrooms.mddapi.dto.request.ErrorResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.stream.Collectors;

import org.springframework.web.bind.MethodArgumentNotValidException;

import org.springframework.validation.FieldError;

@ControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler(BadRequestException.class)
//    public ResponseEntity<?> handleBadRequestException(BadRequestException ex, WebRequest request) {
//        ErrorDetails errorDetails = new ErrorDetails(new Date(), ex.getMessage(), request.getDescription(false));
//        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleGlobalException(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));
        ErrorResponseDto errorResponseDto = new ErrorResponseDto(errors, String.valueOf(HttpStatus.BAD_REQUEST.value()));
                HttpStatus status = HttpStatus.BAD_REQUEST;
                return ResponseEntity.status(status).body(errorResponseDto);

    }

}
// Faire un Dto pour les errors Response    ErrorDtoResponse
