import moduleAlias from 'module-alias';

/**
 * You can add your custom aliases/import statements here.
 * After adding custom aliases here , please add same aliases in tsconfig.json
 * Build the project and run. (Important)
 */
moduleAlias.addAliases({
  '@lib': __dirname + '/lib',
  '@services': __dirname + '/services',
  '@middlewares': __dirname + '/middlewares',
  '@loaders': __dirname + '/loaders',
  '@models': __dirname + '/models',
});
