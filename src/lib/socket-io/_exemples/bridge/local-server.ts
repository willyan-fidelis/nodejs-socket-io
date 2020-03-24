import {SocketIOServer} from '../../server/socket-io-server'
import {SocketIOClient,SocketIOClientMsgTypes} from '../../client/socket-io-client'

let [node_file,prj_file,port,room] = process.argv;console.log(Number(port),room);

async function main(){
    let server:SocketIOServer = new SocketIOServer();

    let user:string = 'socket-bridge@gmail.com';
    let room_name:string = room || 'MinhaSalaX';
    let remote_conn_socket:SocketIOClient = new SocketIOClient('localhost',4000,user);

    server.listen(Number(port) || 3000,(type,room,id,from_user,...data)=>{
        //remote_conn_socket.send(room,...data)
        remote_conn_socket.forward(from_user,room,...data)
    })

    remote_conn_socket.join(room_name,(id,user,...data)=>{
        console.log('(LOCAL)',...data,`(From user '${user}' with socket id '${id}')`)
        server.send(room_name,id,user,...data)
    })
}

main();