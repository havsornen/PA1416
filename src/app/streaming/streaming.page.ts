import { Component, OnInit } from "@angular/core";
import { isDevMode } from "@angular/core";

@Component({
  selector: "app-streaming",
  templateUrl: "./streaming.page.html",
  styleUrls: ["./streaming.page.scss"]
})
export class StreamingPage implements OnInit {
  constructor() {}

  isApp(): boolean {
    return (
      !document.URL.startsWith("http") ||
      document.URL.startsWith("http://localhost:8080") ||
      isDevMode()
    );
  }

  ngOnInit() {
    const vid = document.querySelector("video");
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        vid.srcObject = stream;
        return vid.play();
      })
      .then(() => {
        const btn = document.querySelector("button");
        btn.disabled = false;
        btn.onclick = e => {
          takeASnap().then(toDataURL);
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
    // function download(blob) {
    //   let a = document.createElement("a");
    //   a.href = URL.createObjectURL(blob);
    //   a.download = "screenshot.jpg";
    //   document.body.appendChild(a);
    //   a.click();
    // }

    function toDataURL(blob) {
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        let base64data = reader.result;
        var count = 0;
        let b64 = chunkSubstr(base64data, 1000);
        console.log(b64);

        webSocket(b64);
      };
    }

    // Possible funktion for webbsocket.

    function chunkSubstr(str, size) {
      const numChunks = Math.ceil(str.length / size);
      const chunks = new Array(numChunks);

      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size);
      }

      return chunks;
    }

    function webSocket(b64) {
      var ws = new WebSocket("ws://193.11.184.212:3000");
      ws.onopen = function() {
        console.log("Connected");
        b64.forEach(element => {
          ws.send(m_imageNr + " " + element);
          console.log(element);
        });
        m_imageNr++;

        ws.onmessage = function(event) {
          console.log("New message...", event);
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
