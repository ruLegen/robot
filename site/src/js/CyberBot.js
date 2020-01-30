class Cyberbot {
  constructor(hostname)
  {
    this.Socket= null
    this.Output = []
    this.hostname = hostname
    this.connected=false
    this.onData = function(){}
    this.onConnected =function(){}
    this.onClose =function(){}
    this.WebSocketMessage = function(e) {
      if (this.Socket === null) return;
      //---
      var message = e.data.toString();
      var list = message.split(';');
      try{this.onData(list);} catch(e){console.log(e)}          //Here is could be unexpected behaivor, rewrite as class later
    }.bind(this)

    this.WebSocketOpen = function(e) {
      console.log(this,"WebSocketOpen")
      var socket = this.Socket
      var thisBot = this
      setInterval(function (sockett) {
        if (socket === null) { clearInterval(this); console.log("Trying");thisBot.onClose(e) ;return; }
        //---
        socket.send("GET:0=0");
        thisBot.onConnected(e);
        thisBot.connected = true;
      }, 1000, this);
    }.bind(this)
    this.WebSocketClose = function(e) {
    if (this.Socket === null) return;
    //---
    this.Socket = null;
    this.connected = false;
    this.onClose(e)
    this.WebSocketConnect();
    }.bind(this)
    this.WebSocketConnect = function() {
      console.log("connecting",this,hostname)
    setTimeout(function (url,context) {
      try { 
      context.Socket = new WebSocket('ws://' + context.hostname); 
      context.Socket.onopen = context.WebSocketOpen;
      context.Socket.onmessage = context.WebSocketMessage;
      context.Socket.onclose = context.WebSocketClose;
        } catch (e) { 
          console.log(this);
          context.WebSocketConnect.bind(context)(); 
        }
    }, 500,hostname,this);
    }
    this.Connect= function () {
      console.log("trying connect")
      this.WebSocketConnect();
    }
    this.Transmit = function (from, elem) {
        if (this.Socket === null) return;
        var text = 'SET:' + from + '=';
        for (let i = 1; i < arguments.length; i++) text += arguments[i] + ';';
        this.Socket.send(text);
    }
    this.Recive= function (from, count) {
        if (this.Socket === null)
          return;
      try{
          this.Socket.send('GET:' + from + '=' + count + '');
          }
      catch(e){
        console.log(e)
      }
   }
  }
 
}

export {Cyberbot}