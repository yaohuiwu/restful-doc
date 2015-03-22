package com.duoshenyi.restapi.controller.vo;

/**
 * Vo that wrap errors from errors from server.
 */
public class ErrorMessage {

    private String message;

    public ErrorMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
