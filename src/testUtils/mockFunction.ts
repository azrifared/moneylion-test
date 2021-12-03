export function buildManager<T extends any>(
  overrides: {
    find?: (query?: object) => T[];
    findOne?: (query?: object) => T;
    save?: (data?: T) => T
  } = {}
) {
  return {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    ...overrides,
  };
}

export function buildReply() {
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));

  return { send, status };
}
