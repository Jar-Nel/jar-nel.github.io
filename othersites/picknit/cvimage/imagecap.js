//const video = document.getElementById('vid');
let videoConstraints = {
    video: {
        width: { exact: 1280 },
        height: { exact: 720 },
        minWidth: 1280,
        minHeight: 720,
        maxWidth: 1920,
        maxHeight: 1080
    },
    audio: false
};

const video = document.getElementById('vid');
const c = document.getElementById('c_vid');
const con = c.getContext('2d');
let inte = undefined;


const onLoad = function () {
    //alert('load');
    if (navigator.getUserMedia) {
        //const video = document.getElementById('vid');
        video.addEventListener('loadedmetadata', function () { initCanvas(video); }, true);
        video.addEventListener('canplaythrough', function () { initCanvas(video); }, true);

        StreamVideo();
    } else {
        alert(`Your browser won't work`);
    }
}


function StreamVideo(deviceID) {

    //navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    if (deviceID) videoConstraints.video.deviceId = { exact: deviceID };
    navigator.mediaDevices.getUserMedia(videoConstraints)
        .then(gotMedia)
        .catch(error => console.error('getUserMedia() error:', error));
}

function gotMedia(mediaStream) {
    pageMediaStream = mediaStream;
    //video = document.getElementById('vid');

    video.srcObject = pageMediaStream;
    video.play();
    inte = setInterval('copyCanvas()', 33);
    /*
    navigator.mediaDevices.enumerateDevices()
        .then(Devices => {
            const ICDevices = document.getElementById("ICDevices");
            VideoDeviceListHTML = `<select id="ICvideoDevice" onchange="ICvideoDeviceChange()">`;
            Devices.forEach(device => {
                if (device.kind === "videoinput")
                    if (videoConstraints.video.deviceId) {
                        if (device.deviceId === videoConstraints.video.deviceId.exact) {
                            VideoDeviceListHTML += `<option value="${device.deviceId}" selected>${device.label}</option>`;
                        } else {
                            VideoDeviceListHTML += `<option value="${device.deviceId}">${device.label}</option>`;
                        }
                    } else {
                        VideoDeviceListHTML += `<option value="${device.deviceId}">${device.label}</option>`;
                    }
            });
            VideoDeviceListHTML += `</select>`;
            if (ICDevices) ICDevices.innerHTML = VideoDeviceListHTML;
        })
        .catch(error => console.error('enumerateDevices() error: ', error));


    imageCapture = new ImageCapture(pageMediaStream.getVideoTracks()[0]);*/

    //const img = document.getElementById("photo");

    //console.log(imageCapture.getPhotoCapabilities());
}

function copyCanvas() {
    con.fillRect(0, 0, c.width, c.height);
    con.drawImage(video, 0, 0, c.width, c.height);
}

function initCanvas(v) {
    //bC = document.createElement('canvas');
    //bCon = bC.getContext('2d');
    ratio = v.videoWidth / v.videoHeight;
    w = (v.videoWidth / 100) * 50;
    h = parseInt(w / ratio, 10);
    c.width = w;
    c.height = h;
    //bC.width = w;
    //bC.height = h;
}
