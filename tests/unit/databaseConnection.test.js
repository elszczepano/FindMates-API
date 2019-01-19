import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({path: '.env'});

before(done => {
    mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    done();
});
after(done => {
    mongoose.disconnect();
    done();
});