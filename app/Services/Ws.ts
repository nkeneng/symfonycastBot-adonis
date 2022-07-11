import {Server} from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'


class Ws {

  public io: Server
  private booted = false

  public boot() {
    console.log("socket booting");
    if (this.booted) {
      return
    }

    this.booted = true
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: '*',
      },
    })

  }


  public on(event: string, cb) {
    this.io.on('connection', socket => {

      console.log("connection started");

      socket.on(event, data => {
        console.log();
        cb(socket, data)
      })

    })

  }

}


export default new Ws()
