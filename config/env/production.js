module.exports = {
  datastores: {
    default: {
      adapter: process.env.NODE_ADAPTER || 'sails-disk',
      url: process.env.DATABASE_URL || '',
      ssl: true,
    },
  },

  models: {
    migrate: 'safe',
  },
  blueprints: {
    shortcuts: true,
    rest: true,
    actions: true,
  },
  security: {
    cors: {
      allRoutes: true,
      allowOrigins: '*',
      allowCredentials: false,
    },
  },
  session: {
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  },
  sockets: {
    onlyAllowOrigins: ['https://besafe-web.herokuapp.com'],
  },
  log: {
    level: 'verbose',
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000,
  },
  custom: {},

  secrets: {
    jwtSecret: 'cd5d341dcf5a8ecd8506cd5aa819ab36',
    algorithm: 'HS256',
  },
};
