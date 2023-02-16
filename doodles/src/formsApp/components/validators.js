const validateEmail = (value) => {
    return /^\w+([.\-!#$%&'*+\-/=?^_`{|}~]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value);
};
const validateName = (value) => {
    return !!value.trim();
};

export const nameConfig = {
    type: 'text',
    validate: validateName,
    errorMessage: 'Must not be empty'
}

export const emailConfig = {
    type: 'email',
    validate: validateEmail,
    errorMessage: "Must be a valid email",
    label: 'Email',
    id: 'email'
}