import {SocketIOClient} from '../../client/socket-io-client'

let [node_file,prj_file,port,user,room] = process.argv;
console.log(`Client at port ${Number(port)} in room ${room} - User: ${user}`);

port = port || (3000).toString();
user = user || 'Maria';
room = room || 'MinhaSalaX';

async function main(){
    let socket:SocketIOClient = new SocketIOClient('localhost',Number(port),user);

    await socket.connect((id,user,...data)=>{console.log('Broadcast content arrived:',...data,`(From user '${user}' with socket id '${id}')`)});

    socket.join(room,(id,user,...data)=>{
        console.log(...data,`(From user '${user}' with socket id '${id}')`)
    })

    // setTimeout(() => {
    //     socket.send(room,'Send a msg for a','specific room!')
    // }, 5000);
    // setTimeout(() => {
    //     socket.broadcast('Send a broadcast msg','for all sockts','in network!')
    // }, 10000);

    process.stdin.on('data', function (chunk) {
        let data = chunk.toString();
        try {
            socket.send(room,data)
        } catch (error) {
            
        }
    });
}

main();