const socket = io();

const name = prompt();

const h3 = document.createElement("h3");
h3.innerText += "You joined";
div.appendChild(h3);

socket.emit("user-joined", name);

socket.on("new-user-joined", (data) => {
  const h3 = document.createElement("h3");
  h3.innerText += `${data} joined`;
  div.appendChild(h3);
});

btn.addEventListener("click", () => {
  const h3 = document.createElement("h3");
  h3.innerText += `You: ${input.value}`;
  h3.className = "h3_typing";
  div.appendChild(h3);

  socket.emit("new-messege", { name, messege: input.value });
  input.value = "";
});

socket.on("new-user-messege", (msg) => {
  const h3 = document.createElement("h3");
  h3.className = "h4_typing";
  h3.innerText += `${msg.name}: ${msg.messege}`;
  div.appendChild(h3);
});

input.addEventListener("keyup", (e) => {
  socket.emit("user-typing", { name });
});

const h4_typing = document.createElement("h4");
socket.on("typing", ({ name: username }) => {
  h4_typing.innerText = `${username} typin...`;
  div.appendChild(h4_typing);

  setTimeout(() => {
    h4_typing.remove();
  }, 2000);
});
