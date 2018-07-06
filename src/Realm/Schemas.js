export const DeviceSchema = {
  name: 'Device',
  primaryKey: 'pin',
  properties: {
    name: 'string',
    pin: 'int',
    aliases: 'string?[]',
    icon: 'string'
  }
};
