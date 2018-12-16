import API from '../../testsConfig';
import mongoose from 'mongoose';

test('Check if user registered correctly', () => {
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
    }));
});