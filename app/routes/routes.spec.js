const request = require('supertest');
const app = require('../../index');

const petition = require('../models/PetitionModel');
jest.mock('../models/PetitionModel');

const mockedPetition = {
  _id: '000000000000000000000000',
  title: 'Any Title',
  description: 'Any Description',
  target: 10,
  user: 'userId',
  signatures: [],
  createdAt: '2022-10-01T00:00:00.000Z'
}

describe('routes', () => {
  it('should GET petitions', async () => {
    petition.getPetitions.mockResolvedValue([mockedPetition]);
    const res = await request(app).get('/api/petitions');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  })

  it('should GET a petition by ID', async () => {
    petition.getPetitionById.mockResolvedValue(mockedPetition);
    const res = await request(app).get('/api/petitions/000000000000000000000000');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual(mockedPetition);
  })

  it('should GET target info from a petition', async () => {
    petition.getPetitionById.mockResolvedValue(mockedPetition);
    const res = await request(app).get('/api/petitions/000000000000000000000000/target');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  })
})