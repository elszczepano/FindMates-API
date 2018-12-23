import authController from '../../../src/controllers/authController';
import httpMocks from "node-mocks-http";


test('Check if user signed up correctly', () => {
    const req = httpMocks.createRequest({
        body: {
            name: "Jane",
            phone: "123 456 789",
            password: "secret123",
            email: "jane@doe.com",
            gender: "female",
            birthDate: "1992-12-04",
            purpose: "Friends"
        }
    });
    const res = httpMocks.createResponse();
    authController.register(req, res).then(item => expect(item.data).toEqual({
        success: true,
        message: "User registered successfully."
    }))
        .catch(err => console.log(err));
});