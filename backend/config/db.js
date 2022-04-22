import pkg from 'mongoose';
const { connect } = pkg;

const connectDB = async () => {
  try {
    const conn = await connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Mongo DB Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

export default connectDB;
