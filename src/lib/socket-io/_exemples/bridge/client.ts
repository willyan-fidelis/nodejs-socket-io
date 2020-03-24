import {SocketIOClient} from '../../client/socket-io-client'

let [node_file,prj_file,ip,port,user] = process.argv;console.log(ip,Number(port),user);

ip = ip || 'localhost'
port = port || (4000).toString();
user = user || 'Maria';

async function main(){
    let socket:SocketIOClient = new SocketIOClient(ip,Number(port),user);

    await socket.connect((id,user,...data)=>{
        console.log('Broadcast content arrived:',...data,`(From user '${user}' with socket id '${id}')`)
    });

    socket.join('MinhaSalaX',(id,user,...data)=>{
        console.log(...data,`(From user '${user}' with socket id '${id}')`)
    })

    process.stdin.on('data', function (chunk) {
        let data = chunk.toString();
        try {
            socket.send('MinhaSalaX',data)
        } catch (error) {
            
        }
    });
}

main();

