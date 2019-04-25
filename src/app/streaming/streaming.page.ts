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
            min: 1280,
            ideal: 1920,
            max: 2560
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440
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
              console.log("weee");
            }, 1000);
          }, 1000);
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
        console.log(base64data);
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
      var ws = new WebSocket("ws://192.168.0.5:3000");
      ws.onopen = function() {
        // console.log("Connected");
        b64.forEach(element => {
          ws.send(m_imageNr + " " + element);
          // console.log(element);
        });
        m_imageNr++;

        ws.onmessage = function(event) {
          // console.log("New message...", event);
        };

        //ws.close();
      };
      // .then(() => {
      //   ws.onmessage = function() {
      //     console.log("New message...");
      //   };

      //   b64.forEach(element => {
      //     ws.send(element);
      //   });
      //   ws.close();
      // });
    }
  }
}
