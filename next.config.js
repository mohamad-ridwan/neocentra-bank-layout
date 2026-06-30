const NextFederationPlugin = require('@module-federation/nextjs-mf');
const path = require('path');

module.exports = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'layout_remote',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            shared_remote: 'shared_remote@http://localhost:3342/_next/static/chunks/remoteEntry.js',
            auth_remote: 'auth_remote@http://localhost:3343/_next/static/chunks/remoteEntry.js',
            dashboard_remote: 'dashboard_remote@http://localhost:3344/_next/static/chunks/remoteEntry.js',
          },
          exposes: {
            './Layout': './src/components/Layout.tsx',
            './Header': './src/components/Header.tsx',
            './Sidebar': './src/components/Sidebar.tsx',
          },
          shared: {
            react: { singleton: true, requiredVersion: false },
            'react-dom': { singleton: true, requiredVersion: false },
            '@reduxjs/toolkit': { singleton: true },
            'react-redux': { singleton: true },
            '@tanstack/react-query': { singleton: true },
          },
        })
      );
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        'shared_remote/store': path.resolve(__dirname, '../neocentra-bank-shared/src/store/index.ts'),
        'shared_remote/Button': path.resolve(__dirname, '../neocentra-bank-shared/src/components/ui/button.tsx'),
        'shared_remote/Input': path.resolve(__dirname, '../neocentra-bank-shared/src/components/ui/input.tsx'),
        'shared_remote/apiHelper': path.resolve(__dirname, '../neocentra-bank-shared/src/utils/apiHelper.ts'),
        'shared_remote/globalNavigaton': path.resolve(__dirname, '../neocentra-bank-shared/src/utils/global-navigation.ts'),
        'shared_remote/AuthWrapper': path.resolve(__dirname, '../neocentra-bank-shared/src/components/AuthWrapper.tsx'),
        'shared_remote/Tooltip': path.resolve(__dirname, '../neocentra-bank-shared/src/components/ui/tooltip.tsx'),
        'shared_remote/useRemoteCSS': path.resolve(__dirname, '../neocentra-bank-shared/src/hooks/useRemoteCSS.ts'),
        'shared_remote/federatedStats': path.resolve(__dirname, '../neocentra-bank-shared/src/utils/federated-stats.ts'),
        'shared_remote/Skeleton': path.resolve(__dirname, '../neocentra-bank-shared/src/components/ui/skeleton.tsx'),
        'auth_remote/Logout': path.resolve(__dirname, '../neocentra-bank-auth/src/components/LogoutHandler.tsx'),
      };
    }
    return config;
  },
};
