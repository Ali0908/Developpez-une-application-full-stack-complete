package com.openclassrooms.mddapi.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    private static final String NUMBER_PATTERN = ".*\\d.*";
    private static final String LOWERCASE_PATTERN = ".*[a-z].*";
    private static final String UPPERCASE_PATTERN = ".*[A-Z].*";
    private static final String SPECIAL_CHAR_PATTERN = ".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*";

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) {
            return false; // Null passwords are invalid
        }
        return password.length() >= 8
                && Pattern.matches(NUMBER_PATTERN, password)
                && Pattern.matches(LOWERCASE_PATTERN, password)
                && Pattern.matches(UPPERCASE_PATTERN, password)
                && Pattern.matches(SPECIAL_CHAR_PATTERN, password);
    }
}
