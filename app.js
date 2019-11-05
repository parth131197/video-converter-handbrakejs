// sudo apt-get remove --autoremove handbrake-gtk handbrake-cli
// sudo add-apt-repository --remove ppa:stebbins/handbrake-releases
const hbjs = require('handbrake-js')
const Hapi = require("hapi");

const server = new Hapi.server({
   "host":"localhost",
   "port":3000
});

const init = async ()=>{
   await server.start();
   console.log("Listening at:",server.info.uri);
   hbjs.spawn({
    input: './v1.webm',
    output : 'op.mp4',
    preset : 'Universal'
   })
   .on('progress', progress => {
        console.log("Progress:",progress);
    })
    .on('complete', (comp) => {
        console.log("Completed:",comp);
    });
}
process.on('unhandledRejection',(err)=>{
   console.log(err);
   process.exit(1);
});

init();
