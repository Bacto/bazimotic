# bazimotic

WORK IN PROGRESS


## Disable wifi and bluetooth

```
echo -e "blacklist brcmfmac\nblacklist brcmutil" > /etc/modprobe.d/noWifi.conf
echo -e "blacklist btbcm\nblacklist hci_uart" > /etc/modprobe.d/noBluetooth.conf
```



## Installation of Node-red

```
npm install --unsafe-perm -g node-red

wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/nodered.service -O /lib/systemd/system/nodered.service
wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/node-red-start -O /usr/bin/node-red-start
wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/node-red-stop -O /usr/bin/node-red-stop
chmod +x /usr/bin/node-red-st*

# create user
useradd nodered -m
cat /etc/systemd/system/multi-user.target.wants/nodered.service | sed "s/\=pi$/=nodered/" > /tmp/nodered.service
cp /tmp/nodered.service /etc/systemd/system/multi-user.target.wants/nodered.service

systemctl daemon-reload
systemctl enable nodered.service
systemctl start nodered.service
```


## Adding a node-red module

```
cd .node-red/
npm i node-red-contrib-<MODULE>
```


## Installation of wiringPi

```
cd /usr/src/
git clone git://git.drogon.net/wiringPi
cd wiringPi
./build
```


## Installation of Mosquitto

```
echo -e "Defaults rootpw\nbacto ALL=(ALL) ALL" >> /etc/sudoers
su - bacto

cd /tmp
git clone https://aur.archlinux.org/libwebsockets.git/
cd libwebsockets
makepkg -s --noconfirm
sudo pacman --noconfirm -U libwebsockets*.tar.xz

cd /tmp
git clone https://aur.archlinux.org/mosquitto.git/
cd mosquitto
gpg --recv-keys 779B22DFB3E717B7
makepkg -s --noconfirm
sudo pacman --noconfirm -U mosquitto*.tar.xz

sudo systemctl enable mosquitto.service
sudo systemctl start mosquitto.service
```


## Installation of pm2

```
sudo npm install -g pm2
sudo pm2 startup systemd
```


## Installation of bazimotic

```
useradd bazimotic -m
su - bazimotic
git clone https://github.com/Bacto/bazimotic.git
cd bazimotic
npm install
```

todo:
  - pm2
