const { buildUserData } = require('../../testUtils/mockData');
const { buildManager, buildReply } = require('../../testUtils/mockFunction');
const { getUserPermissionByFeatureName } = require('../getUserPermissionByFeatureName');
const { User } = require('../../entities/User');

describe('getUserPermissionByFeatureName', () => {
  test('Get user permission and send them as respond', async () => {
    const userRecord = buildUserData();
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        if (email === userRecord.email) return userRecord;
        return undefined;
      }),
    });
    const email = 'test@user';
    const query = {
      email,
      featureName: 'Booking'
    }
    const request = { query };
    const reply = buildReply();

    await getUserPermissionByFeatureName(manager).handler(request, reply);

    expect(manager.findOne).toHaveBeenCalledTimes(1);
    expect(manager.findOne).toHaveBeenCalledWith(User, { email });
    expect(manager.findOne(User, { email })).toEqual(userRecord);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith({ canAccess: true });
  })

  test('Respond 404 if email not found', async () => {
    const userRecord = buildUserData();
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        if (email === userRecord.email) return userRecord;
        return undefined;
      }),
      save: jest.fn((data) => data)
    });
    const email = 'test';
    const query = {
      email,
      featureName: 'Booking'
    }
    const request = { query };
    const reply = buildReply();

    await getUserPermissionByFeatureName(manager).handler(request, reply);

    expect(manager.findOne).toHaveBeenCalledTimes(1);
    expect(manager.findOne).toHaveBeenCalledWith(User, { email });
    expect(manager.findOne(User, { email })).toEqual(undefined);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(404);
  })

  test('Respond 500 if email is undefined', async () => {
    const userRecord = buildUserData();
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        if (email === userRecord.email) return userRecord;
        return undefined;
      }),
      save: jest.fn((data) => data)
    });
    const query = {
      featureName: 'Booking'
    }
    const request = { query };
    const reply = buildReply();

    await getUserPermissionByFeatureName(manager).handler(request, reply);

    expect(manager.findOne).not.toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(500);
  })

  test('Respond 500 if featureName is undefined', async () => {
    const userRecord = buildUserData();
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        if (email === userRecord.email) return userRecord;
        return undefined;
      }),
      save: jest.fn((data) => data)
    });
    const query = {
      email: 'test'
    }
    const request = { query };
    const reply = buildReply();

    await getUserPermissionByFeatureName(manager).handler(request, reply);

    expect(manager.findOne).not.toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(500);
  })

  test('Respond 500 if there is an internal server error', async () => {
    const manager = buildManager({
      findOne: jest.fn(() => {
        throw new Error('server failed')
      }),
    });
    const email = 'test@user';
    const query = {
      email,
      featureName: 'Booking'
    }
    const request = { query };
    const reply = buildReply();

    await getUserPermissionByFeatureName(manager).handler(request, reply);

    expect(manager.findOne).toHaveBeenCalledTimes(1);
    expect(manager.findOne).toHaveBeenCalledWith(User, { email });
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(500);
  })
})