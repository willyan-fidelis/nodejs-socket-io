import {SocketIOServer} from '../../server/socket-io-server'

async function main(){
    let server:SocketIOServer = new SocketIOServer();

    server.listen(3000,(type,room,id,user,...data)=>{
        //console.log(type,room,id,user,...data)
        return true;
    })
}

main();