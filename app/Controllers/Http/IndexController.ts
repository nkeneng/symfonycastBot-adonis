import type {
  HttpContextContract
} from '@ioc:Adonis/Core/HttpContext'

const {Worker} = require('worker_threads');

import Progression from "App/Models/Progression";

export default class IndexController {

  async index({view}: HttpContextContract) {
    return view.render('welcome')
  }

  async download({
                   view,
                   request
                 }: HttpContextContract) {

    const ip = request.ip()
    let progression = await Progression.findBy('ip', ip)

    // if (progression == null) {
    //   progression = await Progression.create({
    //     finished: false,
    //     progression: 0,
    //     ip: ip
    //   })
    // }

    const {email, password, links} = request.all()

    let headLess = true;

    // Create a worker thread and pass to it the originalArray
    const worker = new Worker('./worker.js', {
      workerData: {email, password, links, headLess}
    });

    worker.once('message', () => {
      console.log('Received the hashedArray from the worker thread!');
    });

    console.log("after pupet launch");
    return view.render('download/index')
  }

}
