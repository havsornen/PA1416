import { Component, OnInit } from "@angular/core";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { Platform, Img } from "ionic-angular";
import { range } from "rxjs";
import { map, filter } from "rxjs/operators";
import { resolve } from "path";
@Component({
  selector: "app-streaming",
  templateUrl: "./streaming.page.html",
  styleUrls: ["./streaming.page.scss"]
})
export class StreamingPage implements OnInit {
  vid = document.querySelector("video");
  m_imageNr = 1000000;
  x: boolean = false;

  ngOnInit() {
    const vid = document.querySelector("video");
    let returnData: Array<string> = [];
    let stringData = "";

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
        async function getData() {
          Object.keys(await returnData).forEach(function(item) {
            console.log(item); // key
            console.log(typeof item);
            console.log(item);

            console.log(returnData[item]); // value
          });
          console.log(await returnData);
        }

        btn.onclick = function(e) {
          takeASnap()
            .then(toDataURL)
            .then(webSocket)
            .then(alert);
        };

        // const btn = document.querySelector("button");
        // btn.disabled = false;
        // btn.onclick = function(e) {
        //   // this.x = this.x == false ? true : false;
        //   // var intervalId = setInterval(function() {
        //   // var timoutId = setTimeout(function() {
        //   takeASnap()
        //     .then(toDataURL)
        //     .then(async function() {
        //       Object.keys(await returnData).forEach(function(item) {
        //         console.log(item); // key
        //         console.log(typeof item);
        //         console.log(item);

        //         console.log(returnData[item]); // value
        //       });
        //       console.log(await returnData);
        //     });
        // }, 1000);
        // }, 1000);
        // };
      });

    var m_imageNr = 1000000;
    async function takeASnap() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = vid.videoWidth;
      canvas.height = vid.videoHeight;
      ctx.drawImage(vid, 0, 0);
      return await new Promise((res, rej) => {
        canvas.toBlob(res, "image/jpeg");
      });
    }

    async function toDataURL(blob) {
      let reader = new FileReader();
      let b64;
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        let base64data = reader.result;
        let count = 0;
        let data;
        b64 = chunkSubstr(base64data, 1000);
        console.log("Hllo");
        return b64;
      };
    }

    async function chunkSubstr(str: any, size: any) {
      const numChunks = Math.ceil(str.length / size);
      const chunks = new Array(numChunks);

      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size);
      }

      return await chunks;
    }

    // Possible funktion for webbsocket.

    async function webSocket(b64) {
      console.log(b64);

      const ws = new WebSocket("ws://192.168.1.239:3000");

      ws.onopen = async function() {
        console.log("Connected");

        b64.forEach(element => {
          ws.send(m_imageNr + " " + element);
          console.log(element);
        });

        m_imageNr++;

        ws.onmessage = function(event) {
          console.log(typeof returnData);

          returnData.push(event.data);
        };
      };

      return returnData;
    }
  }
}
