import API from '../../../testsConfig';

test('Check if user signed up correctly', () => {
    return API.post('register', {
        name: "John",
        phone: "123 456 789",
        password: "secret123",
        email: "john@doe.com",
        gender: "male",
        birthDate: "1992-12-04",
        purpose: "Friends"
    }).then(item => expect(item.data).toEqual({
        success: true,
        message: "User registered successfully."
    }))
        .catch(err => console.log(err));
});

test('Check if registry validation works correctly', () => {
    return API.post('register', {
        name: "",
        phone: "",
        password: "",
        email: "",
        gender: "",
        birthDate: "",
        purpose: ""
    }).catch(item => expect(item.response.data.success).toEqual(false) && (item.response.data.errors.email.msg).toEqual("E-mail already in use"));
});

test('Check if user email validation works correctly', () => {
    return API.post('register', {
        name: "John",
        phone: "123 456 789",
        password: "secret123",
        email: "john@doe.com",
        gender: "male",
        birthDate: "1992-12-04",
        purpose: "Friends"
    }).catch(item =>  expect(item.response.data.success).toEqual(false));
});