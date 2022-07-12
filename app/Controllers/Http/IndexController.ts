import type {
  HttpContextContract
} from '@ioc:Adonis/Core/HttpContext'

const Downloader = require('../../Services/Downloader/index')
const fs = require('fs');
var archiver = require('archiver');

export default class IndexController {

  async index({view}: HttpContextContract) {
    return view.render('welcome')
  }

  async generate({
                   request
                 }: HttpContextContract) {
    const {email, password, links} = request.all()
    const service = new Downloader(email, password, links, request.ip())
    console.log(email, password, links, service);
    return 'OK'
  }

  async download({
                   request,
                   response
                 }: HttpContextContract) {

    const downloadPath = `./download/${request.ip()}`
    const outputPath = './download/target.zip'
    if (fs.existsSync(downloadPath)) {
      const output = fs.createWriteStream(outputPath);
      const archive = archiver('zip');

      output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');

        fs.readFile(outputPath, (err,data) => {
          if (err) response.status(404).send('Not found')
          response.header('Content-Type', 'application/zip')
          response.append('Content-Length', data.size)
          response.append('Content-Disposition', 'attachment; filename=download')
          response.send(data)
        })

      });

      archive.on('error', function (err) {
        throw err;
      });

      archive.pipe(output);

      archive.directory(downloadPath, false);

      archive.finalize();
    }
    return {data: null}
  }
}
