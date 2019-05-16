import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-streaming",
  templateUrl: "./streaming.page.html",
  styleUrls: ["./streaming.page.scss"]
})
export class StreamingPage implements OnInit {
  vid = document.querySelector("video");
  m_imageNr = 1000000;
  x: boolean = false;

  constructor() {}

  ngOnInit() {
    const vid = document.querySelector("video");
    const streamUsers = [];
    // const image = document.createElement("img");
    let eventChar = 0;
    var ws = new WebSocket("ws://192.168.1.115:3000");
    var string = "";
    let imageA = document.getElementById("imageA") as HTMLImageElement;

    // document.getElementById("window").append(image);
    console.log(
      navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 1280 },
          height: { min: 720 }
        }
      })
    );
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: {
            min: 100,
            ideal: 100,
            max: 1280
          },
          height: {
            min: 100,
            ideal: 100,
            max: 100
          },
          facingMode: "user"
        }
      })
      .then(stream => {
        vid.srcObject = stream;
        return vid.play();
      })
      .then(() => {
        const btn = document.querySelector("button");
        btn.disabled = false;
        btn.onclick = e => {
          this.x = this.x == false ? true : false;
          console.log(this.x);
          var intervalId = setInterval(function() {
            var timoutId = setTimeout(function() {
              takeASnap().then(toDataURL);
            }, 150);
          }, 150);
        };
      });

    var m_imageNr = 1000000;
    function takeASnap() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = vid.videoWidth;
      canvas.height = vid.videoHeight;
      ctx.drawImage(vid, 0, 0);
      return new Promise((res, rej) => {
        canvas.toBlob(res, "image/jpeg");
      });
    }

    function toDataURL(blob) {
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        let base64data = reader.result;
        var count = 0;
        let b64 = chunkSubstr(base64data, 1000);
        webSocket(b64);
      };
    }

    function chunkSubstr(str: any, size: any) {
      const numChunks = Math.ceil(str.length / size);
      const chunks = new Array(numChunks);

      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size);
      }

      return chunks;
    }

    // Possible funktion for webbsocket.
    function webSocket(b64) {
      /*
      We send base64 string to the websocket server. 
      */

      b64.forEach(element => {
        ws.send(1 + " " + m_imageNr + " " + element);
        // console.log(element);
      });
      m_imageNr++;

      console.log("NrOfImagesSent " + m_imageNr);
      string = "";

      /*  
      Onmessage we get the message from the server and add it to a string. 
      */
      let eventImageNumber;
      ws.onmessage = async function(event) {
        eventImageNumber = event.data.substring(0, event.data.indexOf("_"));

        if (eventImageNumber > eventChar) {
          eventChar = eventImageNumber;

          string = "";
          // New message
        }
        let ipCheck = event.data.substring(
          event.data.indexOf("_"),
          event.data.indexOf(":")
        );
        console.log(ipCheck);

        ipCheck = ipCheck.replace("_", "");
        if (-1 == streamUsers.indexOf(ipCheck) && ipCheck != "") {
          streamUsers.push(ipCheck);
          streamUsers.forEach(user => {
            let g = document.createElement("img");
            g.setAttribute("id", user);
            g.setAttribute("class", "imgId");

            document.getElementById("window").appendChild(g);
          });
        }

        // if (ipCheck != "193.11.187.234") {
        if (event.data != "undefined" || event.data != undefined) {
          // this line is to try to get the image number of event but not working.

          string += event.data.substring(event.data.indexOf(";"));
          string = string.replace(";", "");
          string = string.replace(" ", ""); //
          string = string.replace("data:image/jpegbase64", ""); //Needed if u wanna get base64 clean string

          if (ipCheck != "") {
            imageA.src = "data:image/jpeg;base64," + string;
          }
        }
      };
    }
  }
}
