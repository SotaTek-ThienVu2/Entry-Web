// export default () => ({
//     type: 'mysql',
//     host: process.env.DATABASE_HOST,
//     username: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_DBNAME,
//     port: parseInt(process.env.DATABASE_PORT),
//     entities: [__dirname + '/**/*.entity{.ts,.js}'],
//     synchronize: true,
//     xsecond: process.env.X_SECOND,
// });

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    xsecond : process.env.X_SECOND,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
  });