import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = ( token: string ) => {

    const manager = new Manager(process.env.SOCKET_URL,{
        extraHeaders: {
            authentication: token
        }
    });

    socket = manager.socket('/');
    return socket;
}
