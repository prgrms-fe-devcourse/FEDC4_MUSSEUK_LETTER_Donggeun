export default {
  musseuk: {
    input: '../api-docs/dist/swagger.yaml',
    output: {
      target: './src/apis/orval/orval.ts',
      mode: 'split',
      mock: true
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write'
    }
  }
};
