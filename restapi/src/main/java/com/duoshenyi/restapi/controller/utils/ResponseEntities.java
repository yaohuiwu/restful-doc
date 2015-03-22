package com.duoshenyi.restapi.controller.utils;

import com.duoshenyi.restapi.controller.vo.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Utilities for create response entities.
 */
public class ResponseEntities {

    private ResponseEntities() {
    }

    public static ResponseEntity<Object> badRequest(String message){
        return new ResponseEntity<Object>(new ErrorMessage(message), HttpStatus.BAD_REQUEST);
    }
}
