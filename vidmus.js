'use strict'

const request = require("request");
const inquirer = require("inquirer");
const cheerio = require("cheerio");
const chalk = require("chalk");
const fs = require("fs");

const url1 = 'https://downloadlagu321.net/api/search/';
const url2 = "https://www.y2mate.com/mates/analyze/ajax";
const url4 = "https://www.y2mate.com/mates/convert";

const viral = async function (code) {
      let result = await lagu(code);
      let data = result.result;
      let title = data.match(/k_data_vtitle = "(.*?)"/)[1];
      let id = data.match(/k__id = "(.*?)"/)[1];
      let $ = cheerio.load(data);
      let format = [];
      let siz = [];
      $("table.table").find("td").each((i, value) => {
        if ($(value).find("a").attr("href") == "#") format.push($(value).text());
        var poin = $(value).text();
        var cari = poin.substr((poin.length - "MB".length), "MB".length);
        if (cari == "MB") siz.push(poin);
      })
      for (let i=0; i<format.length; i++) {
          console.log(chalk`{green --}{cyan ${format[i]} }{green (}{cyan ${siz[i]}}{green )}`);
      }
      inquirer.prompt(Music)
      .then(async (answers) => {
           if ("720" == answers.tanya) {
                var hasil = await geturl(id, code, "mp4", answers.tanya);
                var getur = hasil.result.match(/href="(.*?)"/)[1];
                console.log(chalk`{cyan (}{green *}{cyan ) }{green Title : }{cyan ${title}}`);
                await video(title, getur, ".mp4");
           } else if ("480" == answers.tanya) {
                var hasil = await geturl(id, code, "mp4", answers.tanya);
                var getur = hasil.result.match(/href="(.*?)"/)[1];
                console.log(chalk`{cyan (}{green *}{cyan ) }{green Title : }{cyan ${title}}`);
                await video(title, getur, ".mp4");
           } else if ("360" == answers.tanya) {
                var hasil = await geturl(id, code, "mp4", answers.tanya);
                var getur = hasil.result.match(/href="(.*?)"/)[1];
                console.log(chalk`{cyan (}{green *}{cyan ) }{green Title : }{cyan ${title}}`);
                await video(title, getur, ".mp4");
           } else if ("240" == answers.tanya) {
                var hasil = await geturl(id, code, "mp4", answers.tanya);
                var getur = hasil.result.match(/href="(.*?)"/)[1];
                console.log(chalk`{cyan (}{green *}{cyan ) }{green Title : }{cyan ${title}}`);
                await video(title, getur, ".mp4");
           } else if ("144" == answers.tanya) {
                var hasil = await geturl(id, code, "3gp", answers.tanya);
                var getur = hasil.result.match(/href="(.*?)"/)[1];
                console.log(chalk`{cyan (}{green *}{cyan ) }{green Title : }{cyan ${title}}`);
                await video(title, getur, ".3gp");
           } else if ("128" == answers.tanya) {
                var hasil = await geturl(id, code, "mp3", answers.tanya);
                var getur = hasil.result.match(/href="(.*?)"/)[1];
                console.log(chalk`{cyan (}{green *}{cyan ) }{green Title : }{cyan ${title}}`);
                await video(title, getur, ".mp3");
           } else if ("1080" == answers.tanya) {
                var hasil = await geturl(id, code, "mp4", answers.tanya);
                var getur = hasil.result.match(/href="(.*?)"/)[1];
                console.log(chalk`{cyan (}{green *}{cyan ) }{green Title : }{cyan ${title}}`);
                await video(title, getur, ".mp4");
           } else {
                console.log(chalk`{green (}{red !}{green ) }{red Contoh input }{green (}{cyan 480}{green ) }{red Tanpa Kurung}`);
           }
      });
}
const Masuk = [
{
   type:"input",
   name:"query",
   message:chalk`{green Query }{cyan >> }`,
   validate: function (value) {
     if (!value) return chalk`{red cant empety}`;
     return true;
   }
}
]
const Music = [
{
    type:"input",
    name:"tanya",
    message:chalk`{cyan (}{green ex}{cyan ) }{green 480 }{cyan >> }`,
    validate: function (value) {
        if (!value) return chalk`{red cant empety}`;
        return true;
    }
}
]
const Pilih = [
{
   type:"input",
   name:"music",
   message:chalk`{green Pilih }{cyan >> }`,
   validate: function (value) {
      value = value.match(/[0-9]/);
      if (value) return true;
      return chalk`{red nomor cok}`;
   }
}
]
const gete = function (quer) {
       try {
            return new Promise((resolve) =>  {
               request(url1+quer, function (err,  response,  body) {
                   if (err && response.statusCode !== 200) throw err;
                   let parse = JSON.parse(body);
                   resolve(parse)
                });
             });
        } catch (err) {
            return Promise.reject(err);
        }
}
const json = async function (quer) {
          let data = await gete(quer);
          let title = [];
          let id = [];
          data.forEach((res) => {
               title.push(res.title)
               id.push(res.id)
          });
          for (let i=0; i<title.length; i++) {
            console.log(chalk`{bold.green (}{cyan ${i}}{bold.green ) }{cyan ${title[i]}}`);
          }
          inquirer.prompt(Pilih)
          .then(answers => { coic(answers.music, id); });
}
const coic = async function (pil, id) {
        for (let i=0; i<id.length; i++) {
              if (i >= pil) {
                   await viral(id[i]);
                   break;
              }
        }
}
const lagu = function (code) {
      try {
           return new Promise((resolve) => {
              request.post({
                            url: url2,
                            json: true,
                            headers: {"user-agent": "Mozilla/5.0 (Linux; Android 6.0; A1601) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Mobile Safari/537.36",},
                            form: {"url":"https://youtu.be/"+code,
                                   "q_auto":1,
                                   "ajax":1}}, function (err, response, body) {
                            if (err && response.statusCode !== 200) throw err;
                            resolve(body)
              });
           });
      } catch (err) {
           return Promise.reject(err);
      }
}
const geturl = function (id, code, typ, fq) {
      try {
           return new Promise((resolve) => {
               request.post({
                             url: url4,
                             json: true,
                             headers: {"user-agent": "Mozilla/5.0 (Linux; Android 6.0; A1601) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Mobile Safari/537.36",},
                             form: {"type":"youtube",
                                    "_id":id,
                                    "v_id":code,
                                    "ajax":1,
                                    "token":"",
                                    "ftype":typ,
                                    "fquality":fq}}, function (err, response, body) {
                             if (err && response.statusCode !== 200) throw err;
                             resolve(body)
                 });
            });
      } catch (err) {
            return Promise.reject(err);
      }
}
const video = async function (title, getur, dot) {
        console.log(chalk`{cyan (}{green +}{cyan ) }{green Sedang Mendownload...}`);
        const file = fs.createWriteStream(title+dot);
        await request
           .get(getur, function () {
               console.log(chalk`{cyan (}{green +}{cyan ) }{green Download Selesai...}`);
               console.log(chalk`{cyan (}{green +}{cyan ) }{green Saved }{cyan : }{green ${title+dot}}`);
           })
           .on("error", function (err) {
               console.log(chalk`{green (}{red !}{green ) }{red Content Error}`)
            })
            .pipe(file);
}
console.clear();
console.log(chalk`{blue
    _   ___    ____  ___}{yellow XiuzCode}{blue
   | | / (_)__/ /  |/  /_ _____
   | |/ / / _  / /|_/ / // (_-<
   |___/_/\_,_/_/  /_/\_,_/___/}
 {green  ::     }{cyan Coded By AsecX     }{green ::
 :: }{cyan Download Video/Music }{green ::}
 {yellow ──────────────────────────────}`)
inquirer.prompt(Masuk)
.then(answers => {
    json(answers.query);
});
