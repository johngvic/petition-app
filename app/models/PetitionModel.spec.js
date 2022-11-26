const PetitionModel = require('./PetitionModel');
const { ObjectId } = require('mongodb');

jest.mock('./PetitionModel');

const mockedPetitionId = 'any-id'

const mockedPetitionInput = {
  title: 'any title',
  description: 'any description',
}

const mockedPetitionOutput = {
  _id: mockedPetitionId,
  title: 'any title',
  description: 'any description',
  user: 'userId',
  signatures: [],
  createdAt: '2022-11-10T21:52:30.192Z'
}

describe('PetitionModel', () => {
  it('should fetch all petitions', async () => {
    const mockedPetitions = [mockedPetitionOutput];
    const mockedGetPetitions = jest.fn().mockReturnValue(mockedPetitions);

    PetitionModel.getPetitions = mockedGetPetitions;

    const response = await PetitionModel.getPetitions();

    expect(response).toBe(mockedPetitions);
  })

  it('should fetch a petition by id', async () => {
    const mockedGetPetitionById = jest.fn().mockReturnValue(mockedPetitionOutput);

    PetitionModel.getPetitionById = mockedGetPetitionById;

    const response = await PetitionModel.getPetitionById(mockedPetitionId);

    expect(response).toBe(mockedPetitionOutput);
    expect(response).toHaveProperty('_id', mockedPetitionId);
  })

  it('should create a new petition', async () => {
    const mockedCreateResponse = {
      acknowledged: true,
      insertedId: new ObjectId('000000000000')
    }
    const mockedAddPetition = jest.fn().mockReturnValue(mockedCreateResponse);

    PetitionModel.addPetition = mockedAddPetition;

    const response = await PetitionModel.addPetition(mockedPetitionInput);

    expect(response).toBe(mockedCreateResponse);
  })

  it('should update an existing petition', async () => {
    const mockedUpdateResponse = {
      acknowledged: true,
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1
    }
    const mockedUpdatePetition = jest.fn().mockReturnValue(mockedUpdateResponse);

    PetitionModel.updatePetition = mockedUpdatePetition;

    const response = await PetitionModel.updatePetition(
      mockedPetitionInput,
      mockedPetitionId
    );

    expect(response).toBe(mockedUpdateResponse);
  })

  it('should delete a petition', async () => {
    const mockedDeleteResponse = { acknowledged: true, deletedCount: 1 };
    const mockedDeletePetition = jest.fn().mockReturnValue(mockedDeleteResponse);

    PetitionModel.deletePetition = mockedDeletePetition;

    const response = await PetitionModel.deletePetition(mockedPetitionId);

    expect(response).toBe(mockedDeleteResponse);
  })
})