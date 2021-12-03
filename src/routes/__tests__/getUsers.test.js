const { buildUserData } = require('../../testUtils/mockData');
const { buildManager, buildReply } = require('../../testUtils/mockFunction');
const { getUsers } = require('../getUsers');
const { User } = require('../../entities/User');

describe('getUsers', () => {
  test('Get all users and send them as response', async () => {
    const userRecords = [
      buildUserData(),
      buildUserData()
    ];
    const manager = buildManager({
      find: jest.fn(() => userRecords),
    });
    const request = {};
    const reply = buildReply();

    await getUsers(manager).handler(request,reply);

    expect(manager.find).toHaveBeenCalledTimes(1);
    expect(manager.find).toHaveBeenCalledWith(User, {
      order: {
        name: 'ASC'
      }
    });
    expect(manager.find()).toEqual(userRecords);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith(userRecords);
  })

  test('Respond 500 if there is an internal server error', async () => {
    const manager = buildManager({
      find: jest.fn(() => {
        throw new Error('Failed to get data')
      }),
    });
    const request = {};
    const reply = buildReply();

    await getUsers(manager).handler(request, reply);

    expect(manager.find).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(500);
  })
})