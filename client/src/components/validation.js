export const formValidation = {
    description: [
        { required: true, message: "Please enter the description" },
        { type: "string", message: "Wrong data" },
        { maxLength: 60, message: "Max length is 60" },
        { minLength: 9, message: "Min length is 9" },
    ],
    title: [
        { required: true, message: "Please enter the title" },
        { type: "string", message: "Wrong data" },
        { maxLength: 19, message: "Max length is 19" },
        { minLength: 3, message: "Min length is 3" },
    ],
};
