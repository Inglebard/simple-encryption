# simple-encryption
A simple scrypt to encrypt/decrypt cesear code.

### How to use it ?
```
npm install
node app.js --help
```
```
Simple encryption

  Simple encryption script. Mainly create as an example of Ceasar code.

Options

  -t, --text String     Input text to encrypt/decrypt.
  -f, --file String     Input file to encrypt/decrypt.
  -a, --algo string     Algo use to encrypt/decrypt.   
  -o, --offset number   Offset.                        
  -k, --key string      Key use to encrypt/decrypt.    
  -e, --encrypt         Encrypt data.                  
  -d, --decrypt         Decrypt data.                  
  --help                Print this usage guide.
```
### Notes
- This script is just for fun, do not use anywhere for serious purpose.
- Key and data with with "::::"

###Examples :

```
node app.js Hello
FfSHQkTvqL2ENJm5lBWe3gRZKh9zrxYVtAu0yOnjXpsMIPo6Ui4Gd1c8DawC7b::::SW55P
```
```
node app.js SW55P -d -k FfSHQkTvqL2ENJm5lBWe3gRZKh9zrxYVtAu0yOnjXpsMIPo6Ui4Gd1c8DawC7b
FfSHQkTvqL2ENJm5lBWe3gRZKh9zrxYVtAu0yOnjXpsMIPo6Ui4Gd1c8DawC7b::::Hello
```

```
node app.js Hello -a positionEncryption -o 10
oUVyuD72gmAaOYbsr5QeWX1ZnINfPjdiwMJzF3t49RpLBSq6kT0hGxHvECKlc8::::VdmAb
```
```
node app.js VdmAb -a positionEncryption -o 10 -d -k oUVyuD72gmAaOYbsr5QeWX1ZnINfPjdiwMJzF3t49RpLBSq6kT0hGxHvECKlc8
oUVyuD72gmAaOYbsr5QeWX1ZnINfPjdiwMJzF3t49RpLBSq6kT0hGxHvECKlc8::::Hello
```

```
node app.js -f example-enc.txt
8j40hSDXAKLqIbumzoiHErgZ3cwteVdWysOvfBlJNYa5UkT29PMRCFnQ76xG1p::::XBB■WzbE■IYyt■YEt■ItBzFr■wz■by■
8j40hSDXAKLqIbumzoiHErgZ3cwteVdWysOvfBlJNYa5UkT29PMRCFnQ76xG1p::::uW■FYut■oy■uWw0zy■
styhoe .nhaim::::ite.hioeameitsyhm
```

```
node app.js -f example-dec.txt -d
WnKh9pkr8juc0zLROV1iDt567APdC4vlZ2HsGXxEaUSbIBJNfQgFqY3wMoTemy::::All■your■base■are■belong■to■us■
WnKh9pkr8juc0zLROV1iDt567APdC4vlZ2HsGXxEaUSbIBJNfQgFqY3wMoTemy::::my■name■is■mythos■
styhoe .naim::::my name is mythos
```
