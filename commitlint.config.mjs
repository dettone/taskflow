export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [1, 'always', ['api', 'web', 'infra', 'ci', 'docs', 'deps', 'repo']],
  },
};
