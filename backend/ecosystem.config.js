// eslint-disable-next-line import/no-extraneous-dependencies
require('@dotenvx/dotenvx').config({
  path: `${__dirname}/.env.deploy`
})

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_PATH_ENVIRONMENTS, DEPLOY_REF = 'origin/master',
} = process.env;
console.log(DEPLOY_HOST, DEPLOY_PATH, DEPLOY_USER);
module.exports = {
  apps: [{
    name: 'backend',
    script: 'ts-node src/app.ts',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Cantarella/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy': `scp -C ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH} && scp -C ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': `export PATH=$PATH:~/.nvm/versions/node/v21.7.3/bin/ && npm i && npm run start`,
    },
  },
};
