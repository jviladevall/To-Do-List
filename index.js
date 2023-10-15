import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let objectDate = new Date();
let day = objectDate.getDate();
let month = objectDate.getMonth();
let year = objectDate.getFullYear();
const date = day + "/" + month + "/" + year;

const data = {
  currentList: "todayList",
  today: [],
  week: [],
  date: date,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  data.today = [];
  data.week = [];
  res.render("index.ejs", data);
});

app.post("/", (req, res) => {
  if (req.body.week === "week") {
    data.currentList = "weekList";
  } else {
    data.currentList = "todayList";
  }
  res.render("index.ejs", data);
  // console.log(data.currentList);
});

app.post("/submit", (req, res) => {
  if (data.currentList === "weekList") {
    data.week.push(req.body["newToDo"]);
  } else {
    data.today.push(req.body["newToDo"]);
  }

  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
