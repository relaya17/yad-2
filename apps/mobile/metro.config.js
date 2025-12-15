const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Allow importing workspace packages
config.watchFolders = [path.resolve(workspaceRoot, 'packages')];
config.resolver.nodeModulesPaths = [path.resolve(workspaceRoot, 'node_modules'), path.resolve(projectRoot, 'node_modules')];

module.exports = config;


