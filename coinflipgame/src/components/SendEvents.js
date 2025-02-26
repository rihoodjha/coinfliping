//const socket = socketIO.connect("http://localhost:4000");https://chatserver-mckewtoatq-ww.a.run.app
import ReactGA from "react-ga4";

export function SendCoinEvent(socket, target) {
  socket.emit("sendcoin", [Number(target[0]), Number(target[1]), target[2]]);
  ReactGA.event({
    category: "User",
    action: target + " shipped coin",
  });
}

export function SendPlayerStarted(socket, data) {
  socket.emit("playerstarted", data);
  ReactGA.event({
    category: "User",
    action: "Player " + data[2] + "Started flipping",
  });
}

export function SendStopGameTimer(socket) {
  socket.emit("stoptimer", "stopgametimer");
  ReactGA.event({
    category: "User",
    action: socket.id + " game should be over",
  });
}

export function SendSyncGameTimer(socket, data) {
  if (socket.id === data[0]) {
    socket.emit("syncgametimer", data[1]);
  }
  ReactGA.event({
    category: "User",
    action: socket.id + " sync games",
  });
}

export function SendUpdatePlayerTimes(socket, data) {
  socket.emit("playertimeupdated", data);
  ReactGA.event({
    category: "User",
    action: socket.id + " updated time for shipping",
  });
}
export function SendStartGameTimer(socket, data) {
  if (data[2] === data[0]) {
    socket.emit("starttimer", [true, data[1]]);
  }
  ReactGA.event({
    category: "User",
    action: socket.id + " game should be started",
  });
}

export function SendFirstValue(socket, data) {
  socket.emit("finaltimer", data);

  ReactGA.event({
    category: "User",
    action: data[0] + " tried first value",
  });
}

export function SendUserLoggedIn(socket, data) {
  socket.emit("player", data);
  ReactGA.event({
    category: "User",
    action: "user is logged in",
  });
}

export function SendPlayerStopped(socket, data) {
  socket.emit("playerstopped", data);
  ReactGA.event({
    category: "User",
    action: data + " player is stopped",
  });
}

export function SendGameTypeChanged(socket, data) {
  socket.emit("gametype", data);
  ReactGA.event({
    category: "User",
    action: "game type changed to " + data,
  });
}

export function TryToSendGameTimerMessage(socket, data) {
  SendStartGameTimer(socket, data);

  ReactGA.event({
    category: "User",
    action: "start the game",
  });
}

export function TryAndSendCoinFlipMessage(socket, id) {
  if (id > 0) {
    socket.emit("message", id.toString());
  }
  ReactGA.event({
    category: "User",
    action: id + " Coin flipped",
  });
}
export function SendActionEvent(socket, eventData) {
  if (eventData[0]) {
    socket.emit("action", eventData[1]);
  }
  ReactGA.event({
    category: "User",
    action: eventData[1] + " action event",
  });
}
