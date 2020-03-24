//https://www.npmjs.com/package/socket.io
import {Server} from 'socket.io'
const io:Server = require('socket.io')();
import {SocketIOClientMsgTypes} from '../client/socket-io-client'

export class SocketIOServer {

    public listen(port:number,callback: (SocketIOClientMsgTypes:string,room:string,id:string,user:string,...args: any[]) => void){
        io.on('connection', socket => {
            console.log('new connection:',socket.id);
        
            socket.on(SocketIOClientMsgTypes.join_room,(room)=>{
                console.log('Join room:',room)
                socket.join(room)
            })

            socket.on(SocketIOClientMsgTypes.leave_room,(room)=>{
                console.log('Leave room:',room)
                socket.leave(room)
            })

            socket.on(SocketIOClientMsgTypes.send_msg,(room,user,...content)=>{
                console.log('Room:',room,'Content:',content)
                io.to(room).emit(room,socket.id,user,...content)
                callback(SocketIOClientMsgTypes.send_msg,room,socket.id,user,...content)
            })

            socket.on(SocketIOClientMsgTypes.broadcast_msg,(user,...content)=>{
                console.log('Broadcast Content:',content)
                socket.broadcast.emit(SocketIOClientMsgTypes.broadcast_msg,socket.id,user,...content)
                callback(SocketIOClientMsgTypes.broadcast_msg,SocketIOClientMsgTypes.join_root_room,socket.id,user,...content)
            })
         });

        io.listen(port);
    }

    public send(room:string,id:string,user:string,...content:any[]):void{
        io.to(room).emit(room,id,user,...content)
    }
}