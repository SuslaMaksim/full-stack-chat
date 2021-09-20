import bodyParser from "body-parser";
import {checkAuth, updateLastSeen} from "../middlewares";
import {
    DialogContrl,
    MessageContrl,
    UserContrl,
    UploadeFileContrl
} from "../Controllers";
import {loginValidator,registerValidator} from "../validation";
import uploader from './uploader';


export default (app: any, io: any) => {

    const UserController = new UserContrl(io);
    const DialogController = new DialogContrl(io);
    const MessageController = new MessageContrl(io);
    const FileController = new UploadeFileContrl();

    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json());
    app.use(checkAuth);
    app.use(updateLastSeen);

    app.get('/user/me', UserController.getMe)
    app.get('/user/verify', UserController.verify);
    app.post('/user/registration', registerValidator, UserController.create);
    app.post('/user/login', loginValidator, UserController.login);
    app.get('/user/find', UserController.findUsers);
    app.get('/user/:id', UserController.show);
    app.delete('/user/delete/:id', UserController.delete);

    app.get('/dialogs', DialogController.show);
    app.post('/dialogs', DialogController.create);
    app.delete('/dialogs/:id', DialogController.delete);

    app.get('/messages', MessageController.show);
    app.post('/messages', MessageController.create);
    app.delete('/messages', MessageController.delete);

    app.post('/files', uploader.single('image'), FileController.create);
    app.delete('/files', FileController.delete);
}