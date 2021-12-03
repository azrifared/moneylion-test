const { buildUserData } = require('../../testUtils/mockData');
const { buildManager, buildReply } = require('../../testUtils/mockFunction');
const { updateUserPermission } = require('../updateUserPemission');
const { User } = require('../../entities/User');

describe('updateUserPermission', () => {
  test('Update user permission and send response 200', async () => {
    const userRecord = buildUserData();
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        if (email === userRecord.email) return userRecord;
        return undefined;
      }),
      save: jest.fn((record) => record),
    });
    const email = 'test@user';
    const body = {
      email,
      featureName: 'Booking',
      enable: false,
    };
    const request = { body };
    const reply = buildReply();

    await updateUserPermission(manager).handler(request, reply);

    expect(manager.findOne).toHaveBeenCalledTimes(1);
    expect(manager.findOne).toHaveBeenCalledWith(User, { email });
    expect(manager.findOne(User, { email })).toEqual(userRecord);
    expect(manager.save).toHaveBeenCalledTimes(1);
    expect(manager.save).toHaveBeenLastCalledWith(userRecord);
    expect(manager.save(userRecord)).toEqual(userRecord);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledTimes(1);
  });

  test('Response 404 if there is no email in the request body', async () => {
    const manager = buildManager();
    const body = {
      featureName: 'Booking',
      enable: false,
    };
    const request = { body };
    const reply = buildReply();

    await updateUserPermission(manager).handler(request, reply);

    expect(manager.findOne).not.toBeCalled();
    expect(manager.save).not.toBeCalled();
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(404);
  });

  test('Response 404 if there is no featureName in the request body', async () => {
    const manager = buildManager();
    const body = {
      email: 'test',
      enable: false,
    };
    const request = { body };
    const reply = buildReply();

    await updateUserPermission(manager).handler(request, reply);

    expect(manager.findOne).not.toBeCalled();
    expect(manager.save).not.toBeCalled();
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(404);
  });

  test('Response 404 if there is no enable permission in the request body', async () => {
    const manager = buildManager();
    const body = {
      email: 'test',
      featureName: 'something',
    };
    const request = { body };
    const reply = buildReply();

    await updateUserPermission(manager).handler(request, reply);

    expect(manager.findOne).not.toBeCalled();
    expect(manager.save).not.toBeCalled();
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(404);
  });

  test('Response 304 when there is not updated record after saving', async () => {
    const userRecord = buildUserData();
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        if (email === userRecord.email) return userRecord;
        return undefined;
      }),
    });
    const email = 'test@user';
    const body = {
      email,
      featureName: 'Booking',
      enable: false,
    };
    const request = { body };
    const reply = buildReply();

    await updateUserPermission(manager).handler(request, reply);

    expect(manager.findOne).toHaveBeenCalledTimes(1);
    expect(manager.findOne).toHaveBeenCalledWith(User, { email });
    expect(manager.findOne(User, { email })).toEqual(userRecord);
    expect(manager.save).toHaveBeenCalledTimes(1);
    expect(manager.save).toHaveBeenLastCalledWith(userRecord);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(304);
    expect(reply.send).toHaveBeenCalledTimes(1);
  });

  test('Response 404 when user is not found', async () => {
    const userRecord = buildUserData();
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        if (email === userRecord.email) return userRecord;
        return undefined;
      }),
    });
    const email = 'test';
    const body = {
      email,
      featureName: 'Booking',
      enable: false,
    };
    const request = { body };
    const reply = buildReply();

    await updateUserPermission(manager).handler(request, reply);

    expect(manager.findOne).toHaveBeenCalledTimes(1);
    expect(manager.findOne).toHaveBeenCalledWith(User, { email });
    expect(manager.findOne(User, { email })).toEqual(undefined);
    expect(manager.save).not.toBeCalled();
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledTimes(1);
  });

  test('Response 500 when failed during search user', async () => {
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        throw new Error('Failed to get user');
      }),
    });
    const email = 'test';
    const body = {
      email,
      featureName: 'Booking',
      enable: false,
    };
    const request = { body };
    const reply = buildReply();

    await updateUserPermission(manager).handler(request, reply);

    expect(manager.findOne).toHaveBeenCalledTimes(1);
    expect(manager.findOne).toHaveBeenCalledWith(User, { email });
    expect(manager.save).not.toBeCalled();
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledTimes(1);
  });

  test('Response 500 when failed during save new records', async () => {
    const userRecord = buildUserData();
    const manager = buildManager({
      findOne: jest.fn((User, { email }) => {
        if (email === userRecord.email) return userRecord;
        return undefined;
      }),
      save: jest.fn(() => {
        throw new Error('Failed to get user');
      }),
    });
    const email = 'test@user';
    const body = {
      email,
      featureName: 'Booking',
      enable: false,
    };
    const request = { body };
    const reply = buildReply();

    await updateUserPermission(manager).handler(request, reply);

    expect(manager.findOne).toHaveBeenCalledTimes(1);
    expect(manager.findOne).toHaveBeenCalledWith(User, { email });
    expect(manager.findOne(User, { email })).toEqual(userRecord);
    expect(manager.save).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledTimes(1);
  });
});
