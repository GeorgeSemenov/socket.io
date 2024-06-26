//Чтобы запустить сервер нужно ввести node index.js
import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

//работа socket.io состоит из двух частей - серверной и клиентской
//клиентская часть - описана в файле index.html в тэге script перед закрытием тэга body

//Серверная часть - описана ниже
const app = express(); //Создаём приложение на express
const server = createServer(app); //Монтируем приложение express в сервер( я так понимаю express приложение это и есть сервер или какая-то управляющая оболочка для него)
const io = new Server(server); //Монтируем socket.io сервер на наш сервер

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  //Если мы будем в корне приложения, то отрбаотает колбек указанный вторым аргументом
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/loh", (req, res) => {
  //роутинг настраивается через первый аргумент
  res.send("<h1>You are so loh, it's amusing.</h1>");
});

io.on("connection", (socket) => {
  //при срабат события "connection" будет отрабатываться колбэк
  //Прослушиваем подключение к серверу, при подключении буде отрабатывать калбэк
  console.log("kek puk user tut (user connected)");

  socket.on("chat message", (msg) => {
    //При получении события chat message (его испускает клиент ты можешь это увидеть в index.html) - должен отработать CUMBack
    console.log(`полученно не гейское сообщение: ${msg}`);
    io.emit("chat message", msg); //транслируем полученное сообщение всем, включая отправившего, если хочешь транслировать всем кроме отрпавителя, то используй broadcast.emit
  });

  socket.on("disconnect", () => {
    //При отключении пользователя будет отрабатываться передаваемый CUMback
    console.log("user livaet like a bomj");
  });
});

server.listen(3000, () => {
  console.log(
    `i't a cumblack in server.listen and server is funning in port 3000`
  );
});
