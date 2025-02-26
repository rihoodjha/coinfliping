export function SendResetEvents(socket) {
  messagereset(socket);
}

export function messagereset(socket) {
  socket.emit("message", "reset");
}
