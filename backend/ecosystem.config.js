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
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Cantarella/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp -C ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': `cd ../source/backend && export PATH=$PATH:~/.nvm/versions/node/v20.10.0/bin/ && npm i && npm run start`,
    },
  },
};
