import joi from "joi";

export const validateSignup = (userData) =>{
    const Schema = joi.object({
        fullname:joi.string().required().min(3),
        email:joi.string().required().email(),
        password: joi.string().required().min(5),
        address:joi.array().items(joi.object({details:joi.string(),for:joi.string()})),
        phoneNumber:joi.number()
    });
    return Schema.validateAsync(userData);
};

export const ValidateSignIn = (userData) =>{
    const Schema = joi.object({
        email:joi.string().required().email(),
        password: joi.string().required().min(5),
    });
    return Schema.validateAsync(userData);
};

