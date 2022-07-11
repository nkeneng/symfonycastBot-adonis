const {
  workerData
} = require('worker_threads');

const Downloader = require('./app/Services/Downloader/index')

const {
  email,
  password,
  links,
  headLess
} = workerData;

const service = new Downloader()

service.webLaunch(email, password, links, headLess).then(r =>
  process.exit()
)
