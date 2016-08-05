# bazimotic

WORK IN PROGRESS


## Installation of npm
```
sudo apt-get update
sudo apt-get install npm
sudo npm install -g npm@2.x
```


## Installation of Node-red

```
sudo apt-get install nodered

sudo systemctl enable nodered.service
sudo systemctl start nodered.service
```

## Adding a node-red module

```
cd .node-red/
npm i node-red-contrib-<MODULE>
```


## Installation of wiringPi

```
sudo apt-get install git-core
git clone git://git.drogon.net/wiringPi
cd wiringPi
./build
```


## Installation of Mosquitto

```
sudo apt-get install mosquitto
sudo systemctl enable mosquitto.service
sudo systemctl start mosquitto.service
```



## Installation of bazimotic

```
git clone
npm install
sudo npm install -g pm2
sudo pm2 startup ubuntu

```

todo:
  - pm2
