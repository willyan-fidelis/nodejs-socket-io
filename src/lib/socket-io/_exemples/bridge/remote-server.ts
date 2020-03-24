import {SocketIOServer} from '../../server/socket-io-server'

let [node_file,prj_file,port] = process.argv;console.log(Number(port),process.argv);

async function main(){
    let server:SocketIOServer = new SocketIOServer();

    server.listen(Number(port) || 4000,(type,room,id,user,...data)=>{
        //console.log(type,room,id,user,...data)
    })
}

main();