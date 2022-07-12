import Ws from "App/Services/Ws";

const puppeteer = require("puppeteer");

const path = require("path");

import {Socket} from "socket.io";

class DownloaderService {
  private tutorials: string[];
  private path: string;
  private socket: Socket;
  private ip: string;

  constructor(email, password, link, ip) {
    this.tutorials = []
    this.path = ""
    this.ip = ip
    Ws.boot()

    Ws.on('download:ready', async (socket: Socket) => {
      this.socket = socket
      await this.webLaunch(email, password, link, true)
    })
  }

  handleEmit = async (status = 0, finished = false, message = "") => {
    console.log(status);
    this.socket.emit('download:status', {
      state: status,
      finished: finished,
      message: message
    })
  }

  async webLaunch(username, password, link, headless = true) {

    this.tutorials = link.split(",")

    const browser = await puppeteer.launch({headless: headless})

    await this.login(browser, username, password);

    console.log("login successful");

    await this.main(browser);

    await browser.close()

  }

  async login(browser, username, password) {

    const page = await browser.newPage()

    await page.goto('https://symfonycasts.com/login')

    await page.waitForSelector('.login form #email')

    await page.type('.login form #email', username)

    await page.type('.login form #password', password)

    await page.click('.login form button')

    await page.waitForSelector('body')

    await page.close()
  }

  async download(list, browser) {
    if (list.length > 0) {
      let trial = 0

      for (let index = 0; index < list.length; index++) {
        let item = list[index]
        let state = index * 100 / list.length
        let lessonPage = await browser.newPage()
        await lessonPage.goto(item, {waitUntil: 'load'})
        await lessonPage.click('#downloadDropdown')
        await lessonPage.click('.dropdown-menu span:nth-of-type(2) a')
        const response = await lessonPage.waitForResponse(response =>
          response
        );

        if (response.status() !== 202 && response.status() !== 200) {
          console.log("An error occurred while downloading with status ", response.status());
          if (trial >= 5) {
            await this.handleEmit(0,
              false,
              "An error occurred while downloading"
            )
            break;
          }
          trial++;
        } else {

          await new Promise(res => {
            setTimeout(res, 3000);
          });

          console.log("start downloading video");

          await this.handleEmit(state, false, "")

          if (index === list.length - 1) {
            await this.handleEmit(
              state, true, ""
            )
          }

        }
        await lessonPage.close()
      }
    }

  }

  async main(browser) {
    let client;
    for (const element of this.tutorials) {

      let tutoPage = await browser.newPage()

      await tutoPage.goto(element, {waitUntil: 'load'})

      let urlArray = element.split("/")

      this.path = path.resolve(`./download/${this.ip}/${urlArray[urlArray.length - 1]}`)

      client = await tutoPage.target().createCDPSession()

      await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: this.path
      });

      await tutoPage.waitForSelector('.chapter-list')

      const list = await tutoPage.evaluate(() => {
        let dataElements = document.querySelectorAll('.chapter-list li a.p-4.d-block')
        let data = []
        dataElements.forEach(el => {
          data.push(el.href)
        })
        return data
      })
      await this.download(list, browser);
      await tutoPage.close()
    }
  }

}

module.exports = DownloaderService
