# niceBridge
R-Pi Bridge for niCE-life and UEFIS/ESIM IoT

**1.** Download the approrpiate Raspberry pi .img file from [here](https://drive.google.com/drive/folders/1eWdnLL01POr_hEptyvLRVUqQ3yRnhMRT?usp=sharing)

**2.** Flash the given image onto an SD card (prefferably using [balenaEtcher](https://www.balena.io/etcher/))

**3.** (Optional) Configure Raspberry pi WiFi:

Create a file named **wpa_supplicant.conf** in the root of the flashed SD card with the following content

```
country=SK
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="FILL-YOUR-WIFI-SSID-HERE"
    psk="FILL-YOUR-WIFI-PSWD-HERE"
}
```

**4.** Plug the SD card to the Raspberry Pi

**5.** (Conditional) If you did not configure the R-Pi for wifi connection plug it into you network via an ethernet cable

**6.** Power up the R-Pi by plugging in its power supply

**7.** (Optional) You can check whether the R-Pi is connected succesfully by checking its connection on the router 

<img src="https://i.ibb.co/RNVTdGm/router.png" alt="image0" width="650"/>

or by establishing an ssh connection:

* [SSH on Windows](https://www.raspberrypi.org/documentation/remote-access/ssh/windows10.md)
* [SSH on UNIX](https://www.raspberrypi.org/documentation/remote-access/ssh/unix.md)
