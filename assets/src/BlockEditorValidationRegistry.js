const validationFunctions = []

export const registerValidation = (blockName, validationFunction) => {
    validationFunctions[blockName] = validationFunction;
};

export const getValidationFunction = (blockName) => {
    return validationFunctions[blockName]
}

export const getValidationResponseObject = (isBlockValid, messages) => {
    return {
        'isBlockValid': isBlockValid,
        'messages': messages
    }
}