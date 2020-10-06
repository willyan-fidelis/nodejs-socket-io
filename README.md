<!-- 
More info about markdown:
https://hackmd.io/
https://guides.github.com/features/mastering-markdown/
 -->
Code in a Minute - SocktIO NodeJS
===

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/SzITWK9nu3M/0.jpg)](https://www.youtube.com/watch?v=SzITWK9nu3M)

###### tags: `Read-me` `Step-by-step` `#CodeInMinutes` `NodeJS` `SocketIO`

> - **Location:** Joinville - SC
> - **Date:** March 24, 2020 10:00 PM (BRA)
> - **Agenda**
> 1. Make a simple SocketIO library and usage examples with NodeJS
> 
> - **Participants:**
>     - Willyan Fidelis(WF)
> - **Contact:** WF <willyan.sergio.fidelis@gmail.com>



:dart: Sprint Goal
---
- Create a simple SocketIO library and usage examples.

:books: Sprint Backlog
---
- Basic: Client and server
- Bridge: Local serverand remote server


:closed_book: Tasks
--

### Development Team:
- [x] SocktIO **Basic Test**
- [x] Create a lib for server side
- [x] Create a lib for client side
- [x] Simple exemples
- [x] Bridge exemples

:books: Steps and usage
---

- Clone and install:
    - git clone 
    - yarn
    
- Configure the package.json script:

```
    "server-test": "nodemon src/lib/socket-io/_exemples/simple/server.ts --exec ts-node",
    "client-test": "nodemon src/lib/socket-io/_exemples/simple/client.ts --exec ts-node",

    "bridge-remote-server": "nodemon src/lib/socket-io/_exemples/bridge/remote-server.ts --exec ts-node",
    "bridge-local-server": "nodemon src/lib/socket-io/_exemples/bridge/local-server.ts --exec ts-node",
    "bridge-client-msg": "nodemon src/lib/socket-io/_exemples/bridge/client.ts --exec ts-node",
```
    
- Basic exemples usage:
    - yarn server-test
    - Start mutiples clients(Parameters passed: port,name,room):
        - yarn client-test 3000 john sala-xyz
        - yarn client-test 3000 edu sala-xyz
        - yarn client-test 3000 maria sala-xyz
        - yarn client-test 3000 tereza sala-xyz
    - Send messages from each client:
        - Open  the 'Jonh 'console and type 'Hello maria, I am Jonh', so enter!
        - Open  the 'Maria 'console and type 'Hi John, I am Maria and like to meet you!', so enter!
- Bridge exemples usage:
    - Start remote server:
        - yarn bridge-remote-server 4000
    - Start local server:
        - yarn bridge-local-server 3000
    - Start mutiples clients(Some local(3000 port) others remote(4000 port)):
        - yarn bridge-client-msg 192.168.15.26 3000 Jonh
        - yarn bridge-client-msg 192.168.15.26 3000 William
        - yarn bridge-client-msg 192.168.15.26 4000 Eduardo
        - yarn bridge-client-msg 192.168.15.26 4000 Maria
    - Send messages from each client:
        - Open  the 'Jonh 'console and type 'Hello maria, I am Jonh', so enter!
        - Open  the 'Maria 'console and type 'Hi John, I am Maria and like to meet you!', so enter!

## Notes 
- Suggestions for next times:
    - Do incomplete steps
