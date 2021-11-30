import * as os from 'os';

function getIpAddress() {
  if (process.env.NODE_ENV !== 'production') {
    return 'localhost';
  }

  const interfaces = Object.values(os.networkInterfaces());

  for (const _interface of interfaces) {
    if (!_interface) continue;

    for (const { family, internal, address } of _interface) {
      if ('IPv4' === family && !internal) {
        return address;
      }
    }
  }

  throw Error('Suitable IP address not found.');
}

export default getIpAddress;