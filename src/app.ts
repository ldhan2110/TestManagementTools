import { Route } from 'core/interfaces';
import express from 'express';
import mongoose from 'mongoose';

class App{
    public app: express.Application;
    public port: string | number;
    constructor(routes: Route[]){
        this.app = express();
        this.port = process.env.PORT || 5000;

        this.initializeRoutes(routes);
        this.connectToDatabase();
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is listen on prt ${this.port}`);
        });
    }

    private initializeRoutes(routes: Route[]){
        routes.forEach((route) =>{
            this.app.use('/', route.router)
        });

    }

    private connectToDatabase(){
         try {
             const connectString = 'mongodb+srv://testcontrol:3982158@testweb.cqvf2.mongodb.net/testcontrol?retryWrites=true&w=majority';
            mongoose.connect(connectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
          });  
          console.log('Database connected...');
         } catch (error) {
             console.log('Connect todatabase error')
         }
    }
}

export default App;