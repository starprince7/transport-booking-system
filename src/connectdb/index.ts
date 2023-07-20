import mongoose from 'mongoose';

export default async function databaseConnection() {
  const databaseOptions = {
    autoIndex: true,
  };

  try {
    await mongoose.connect(process.env.DATABASE_URI!, databaseOptions);
    console.log('Connected To Database!!');
  } catch (e) {
    console.log('Error Connecting to DB!: ', e);
  }
}
