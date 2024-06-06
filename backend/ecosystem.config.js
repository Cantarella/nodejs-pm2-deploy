// eslint-disable-next-line import/no-extraneous-dependencies
require('@dotenvx/dotenvx').config({
  path: `${__dirname}/.env.deploy`
})

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_PATH_ENVIRONMENTS, DEPLOY_REF = 'origin/master',
} = process.env;
console.log(DEPLOY_HOST, DEPLOY_PATH, DEPLOY_USER, DEPLOY_PATH_ENVIRONMENTS);
module.exports = {
  apps: [{
    name: 'api-service',
    script: 'ts-node src/app.ts',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Cantarella/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy': `scp -C ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH_ENVIRONMENTS}`,
      'post-deploy': 'npm i && npm run start',
    },
  },
};
