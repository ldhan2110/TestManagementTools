import { Route } from '@core/interfaces';
import express from 'express';
import mongoose from 'mongoose';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { Logger } from '@core/utils';
import { errorMiddleware } from '@core/middleware';
import http from 'http';
import socketIo from 'socket.io';
var bodyParser = require('body-parser');

class App{
    public port: string | number;
    public production: boolean;
    public app: express.Application;
    public server: http.Server;
    public io: socketIo.Server;

    constructor(routes: Route[]){
        this.app = express();
        //this.port = process.env.PORT || 5000;
        this.server = http.createServer(this.app);
        this.io = new socketIo.Server(this.server);

        this.port = process.env.PORT || 5000;
        this.production = process.env.NODE_ENV == 'production' ? true : false; 
  
        this.connectToDatabase();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorMiddleware();
        this.initSocketIo();
    }
    private initSocketIo() {
        this.server = http.createServer(this.app);
        this.io = new socketIo.Server(this.server, {
          cors: {
            origin: '*',
          },
        });
        this.app.set('socketio', this.io);

        const users: any = {};
        this.io.on('connection', (socket: socketIo.Socket) => {
            Logger.warn('a user connected : ' + socket.id);
            socket.emit('message', 'Hello ' + socket.id);

            socket.on('login', function (data) {
                Logger.warn('a user ' + data.userId + ' connected');
                //console.log('socket is running');
                // saving userId to object with socket ID
                users[socket.id] = data.userId;
            });

            socket.on('disconnect', function () {
            Logger.warn('user ' + users[socket.id] + ' disconnected');
            // remove saved socket from users object
            delete users[socket.id];
              Logger.warn('socket disconnected : ' + socket.id);
            });
          });
        }

    public listen(){
        this.server.listen(this.port, () => {
            Logger.info(`Server is listening on port ${this.port}`);
          });
    }

    private initializeRoutes(routes: Route[]){
        routes.forEach((route) =>{
            this.app.use('/', route.router)
        });

    }

    private initializeMiddleware(){
        if (this.production) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan('combined'));
            //this.app.use(cors({ origin: 'https://test-control.herokuapp.com', credentials: true}));
            this.app.use(cors({ origin: '*'}));
        } else {
            this.app.use(morgan('dev'));
            //this.app.use(cors({ origin: true, credentials: true}));
            this.app.use(cors({ origin: '*'}));
        }      
        //this.app.use(express.json());
        //this.app.use(express.urlencoded({ extended: true }));
        this.app.use( express.json({limit: '50mb'}) );
        this.app.use(express.urlencoded({
          limit: '50mb',
          extended: true,
          parameterLimit:50000
        }));
    }
    private initializeErrorMiddleware() {
        this.app.use(errorMiddleware);
      }
    private connectToDatabase(){
            const connectString = process.env.MONGODB_URI;
            if (!connectString) {
              //console.log('Connection string is invalid');
              Logger.error('Connection string is invalid');
              return;
            }
            mongoose.connect(connectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
          })
          .catch((reason)=>{
              Logger.error(reason);
          });  
          Logger.info('Database connected...');

    }
}

export default App;