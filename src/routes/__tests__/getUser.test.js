const { buildUserData } = require('../../testUtils/mockData');
const { buildManager, buildReply } = require('../../testUtils/mockFunction');
const { getUser } = require('../getUser');
const { User } = require('../../entities/User');

describe('getUser', () => {
  test('Get user by email and send them as response', async () => {
    const userRecord = buildUserData();
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        if (email === userRecord.email) return userRecord;
        return undefined;
      }),
    });
    const params = { email: 'test@user' };
    const request = { params };
    const reply = buildReply();

    await getUser(manager).handler(request, reply);

    expect(manager.findOne).toHaveBeenCalledTimes(1);
    expect(manager.findOne).toHaveBeenCalledWith(User, params);
    expect(manager.findOne(User, params)).toEqual(userRecord);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith(userRecord);
  });

  test('Respond 404 if there is no user', async () => {
    const userRecord = buildUserData();
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        if (email === userRecord.email) return userRecord;
        return undefined;
      }),
    });
    const params = { email: '123' };
    const request = { params };
    const reply = buildReply();

    await getUser(manager).handler(request, reply);

    expect(manager.findOne).toHaveBeenCalledTimes(1);
    expect(manager.findOne).toHaveBeenCalledWith(User, params);
    expect(manager.findOne(User, params)).toEqual(undefined);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(404);
  })

  test('Respond 500 if there is an internal server error', async () => {
    const userRecord = buildUserData();
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        throw new Error('Failed to get data')
      }),
    });
    const params = { email: '123' };
    const request = { params };
    const reply = buildReply();

    await getUser(manager).handler(request, reply);

    expect(manager.findOne).toHaveBeenCalledTimes(1);
    expect(manager.findOne).toHaveBeenCalledWith(User, params);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(500);
  })
});
