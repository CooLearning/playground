/* eslint-disable no-template-curly-in-string */
module.exports = {
  'plugins':
    [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      ['@semantic-release/changelog', {
        changelogFile: 'CHANGELOG.md',
      }],
      ['@semantic-release/npm', {
        npmPublish: false,
      }],
      ['@semantic-release/github', {
        assets: [
          'dist',
        ],
      }],
      ['@qiwi/semantic-release-gh-pages-plugin', {
        src: 'dist',
      }],
      ['@semantic-release/git', {
        assets: [
          'CHANGELOG.md',
          'package.json',
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      }],
    ],
};
