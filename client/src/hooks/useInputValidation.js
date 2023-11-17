import { useState } from "react";

export const useInputValidation = (validations, value) => {
    const [error, setError] = useState("");
    const [touched, setTouched] = useState(false);

    const validate = () => {
        setError("");
        for (const validation of validations) {
            if (validation.required && value.trim() === "") {
                setError(validation.message);
                return;
            }
            if (validation.type && typeof value !== validation.type) {
                setError(validation.message);
                return;
            }
            if (validation.maxLength && value.length > validation.maxLength) {
                setError(validation.message);
                return;
            }
            if (validation.minLength && value.length < validation.minLength) {
                setError(validation.message);
                return;
            }
        }
    };

    return {
        value,
        error,
        onChange: () => {
            validate();
            if (!touched) {
                setTouched(true);
            }
        },
        onBlur: () => setTouched(true),
        touched,
    };
};
