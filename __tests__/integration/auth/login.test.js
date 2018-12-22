import API from '../../testsConfig';

test('Check if user signed in correctly', () => {
    API.post('login', {
        email: "john@doe.com",
        password: "secret123"
    }).then(item => expect(item.response.data.success).toEqual(true))
        .catch(err => console.log(err));
});