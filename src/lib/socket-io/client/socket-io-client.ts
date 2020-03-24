//https://www.npmjs.com/package/socket.io-client
import {Socket} from 'socket.io';
//import io from 'socket.io-client';

export enum SocketIOClientMsgTypes{
    join_room = 'join-room',
    leave_room = 'leave-room',
    send_msg = 'send-msg',
    broadcast_msg = 'broadcast-msg',
    join_root_room = 'join_root_room',
}
 
/**
 * Allow connect to socket.io Server. Allow subscribe multiples rooms per instance.
 */
export class SocketIOClient{

    private socket:Socket;
    //private user:string;
    
    constructor(ip:string, port:number,private user:string){
        //this.socket = io(`http://${ip}:${port}`);
        this.socket = require('socket.io-client')(`http://${ip}:${port}`);
    }
    /**
     * Connect to the server
     */
    public async connect(broadcastCallback: (id:string,user:string,...args: any[]) => void){
        return new Promise((resolve,reject)=>{
            this.socket.on('connect', ()=>{
                
                this.socket.on(SocketIOClientMsgTypes.broadcast_msg, (socket_id,from_user,...args)=>{
                    //console.log(args)
                    if(this.socket.id === socket_id){return}
                    broadcastCallback(socket_id,from_user,...args)
                });

                resolve();
                //callback();

            });
        })
    }

    /**
     * Join/subscribe specific room
     *
     * @param {string} room - The name of the room to subscribe
     * @param {(data:any) => void} callback - The callback that recive messages from room
     * @returns {void}
     */
    public join(room:string,callback: (id:string,user:string,...args: any[]) => void):void{
        
        this.socket.emit(SocketIOClientMsgTypes.join_room,room);
        this.socket.on(room, (socket_id,from_user,...args)=>{
            //console.log(args)
            if(this.socket.id === socket_id){return}
            callback(socket_id,from_user,...args)
        });
        
        
    }
    /**
     * Leave a room
     *
     * @param {string} room - The room to send a msg
     * @returns {void}
     */
    public leave(room:string):void{
        this.socket.emit(SocketIOClientMsgTypes.leave_room,room);
    }
    /**
     * Send a message
     *
     * @param {string} msg - The msg content
     * @param {string} room - The room to send a msg(optional)
     * @returns {void}
     */
    public send(room:string,...msg:any[]):void{
        this.socket.emit(SocketIOClientMsgTypes.send_msg,room,this.user,...msg);
    }
    /**
     * Forward a message.
     * It is the same efect that send a message, but in this case passing an user.
     * 
     * @param {string} msg - The msg content
     * @param {string} room - The room to send a msg(optional)
     * @returns {void}
     */
    public forward(from_user:string,room:string,...msg:any[]):void{
        this.socket.emit(SocketIOClientMsgTypes.send_msg,room,from_user,...msg);
    }
    /**
     * Send a broadcast message
     *
     * @param {string} msg - The msg content
     * @returns {void}
     */
    public broadcast(...msg:any[]):void{
        this.socket.emit(SocketIOClientMsgTypes.broadcast_msg,this.user,...msg);
    }
}