const UserModel = require('./UserModel');
const { ObjectId } = require('mongodb');

jest.mock('./UserModel');

const mockedUserEmail = 'any@email.com';

const mockedUser = {
  _id: new ObjectId('000000000000'),
  name: 'Any Name',
  email: mockedUserEmail,
  password: 'any-password'
}

const mockedUserInput = {
  name: 'Any Name',
  email: mockedUserEmail,
  password: 'any-password'
}

describe('UserModel', () => {
  it('should get user', async () => {
    const mockedGetUser = jest.fn().mockReturnValue(mockedUser);

    UserModel.getUser = mockedGetUser;

    const response = await UserModel.getUser(mockedUserEmail);

    expect(response).toBe(mockedUser);
  })

  it('should create a new user', async () => {
    const mockedResponse = {
      acknowledged: true,
      insertedId: new ObjectId('000000000000')
    }
    const mockedRegister = jest.fn().mockReturnValue(mockedResponse);

    UserModel.register = mockedRegister;

    const response = await UserModel.register(mockedUserInput);

    expect(response).toBe(mockedResponse);
  })
})