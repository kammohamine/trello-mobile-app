module.exports = {
  presets: [
    'babel-preset-expo', // Ajout du preset Expo
    '@babel/preset-react', // Ajoutez cette ligne pour inclure @babel/preset-react
    '@babel/preset-typescript', // Transpile le code TypeScript en JavaScript standard
  ],
  plugins: [
    'react-native-reanimated/plugin', // Ajout du plugin obligatoire pour react-native-reanimated
  ],
};