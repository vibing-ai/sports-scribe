module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Code style changes
        'refactor', // Code refactoring
        'test',     // Tests
        'chore',    // Maintenance
      ],
    ],
  },
}
