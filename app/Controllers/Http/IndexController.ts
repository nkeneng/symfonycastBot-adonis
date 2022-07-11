import type {
  HttpContextContract
} from '@ioc:Adonis/Core/HttpContext'

const Downloader = require('../../Services/Downloader/index')

export default class IndexController {

  async index({view}: HttpContextContract) {
    return view.render('welcome')
  }

  async download({
                   request
                 }: HttpContextContract) {
    const {email, password, links} = request.all()
    const service = new Downloader(email, password, links)
    console.log(email, password, links, service);
    return 'OK'
  }

}
