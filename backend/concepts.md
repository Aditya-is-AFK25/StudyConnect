# Backend Concepts — StudyConnect

This file serves as the baseline reference of the concepts covered in our training (June 29 to July 9) that are approved for use in the codebase.

---

## 1. Variables & ES6 Template Literals
Standard declarations using `let`, `const`, and `var`, alongside string interpolation.

```js
const username = "Aditya Pratap Singh";
const location = "JIMS";
console.log(`Your name is ${username} and location is ${location}`);
```

## 2. Loops & Array Methods
Iterating using `for`, `while`, `for...of`, `for...in`, `forEach`, and formatting array data using `.join()`.

```js
const months = ["january", "february", "march", "april"];

for (let i = 0; i < months.length; i++) {
    console.log(months[i]);
}

for (const m of months) {
    console.log(m);
}

months.forEach((m) => {
    console.log(m);
});

console.log(months.join(", "));
```

## 3. Module Imports & Exports
Splitting logic into multiple files and sharing utility functions or variables.

```js
function add(a, b) {
    return a + b;
}

module.exports = { add };
```

```js
const math = require("./mymath");
console.log(math.add(10, 20));
```

## 4. File System Operations
Reading local files synchronously and asynchronously.

```js
const fs = require("fs");

const syncData = fs.readFileSync("data.txt", "utf-8");
console.log(syncData);

fs.readFile("data.txt", "utf-8", (err, asyncData) => {
    if (err) return;
    console.log(asyncData);
});
```

## 5. Node Event System
Using `EventEmitter` to publish and subscribe to custom events.

```js
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("alert", (data) => {
    console.log(data.message);
});

emitter.emit("alert", { message: "System warning" });
```

## 6. Callbacks & Asynchronous Timers
Managing non-blocking execution using `setTimeout` and callback functions.

```js
function processOrder(item, callback) {
    setTimeout(() => {
        callback(`${item} is done`);
    }, 2000);
}

processOrder("Tea", (msg) => {
    console.log(msg);
});
```

## 7. Promises
Wrapping async actions in native Promise wrappers to cleanly catch success or rejection.

```js
const task = new Promise((resolve, reject) => {
    const success = true;
    if (success) {
        resolve("Finished");
    } else {
        reject("Failed");
    }
});

task.then((res) => console.log(res)).catch((err) => console.log(err));
```

## 8. Async/Await
Executing Promises using linear, synchronous-looking control structures.

```js
async function executeTask() {
    try {
        const res = await task;
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}
```

## 9. Basic Mongoose Connection & Schemas
Defining document layout rules, model binding, and database connection.

```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Student = mongoose.model("Student", studentSchema);
```

## 10. Mongoose CRUD Operations
Creating, querying, updating, and deleting documents.

```js
const dbOperations = async () => {
    const newStudent = new Student({ name: "Rohan", age: 22 });
    await newStudent.save();

    const list = await Student.find();
    
    await Student.updateOne({ name: "Rohan" }, { age: 23 });
    
    await Student.deleteOne({ name: "Rohan" });
};
```

## 11. Express Application Setup
Routing requests, parsing payloads, redirecting users, and serving static directories.

```js
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("Home");
});

app.post("/submit", (req, res) => {
    res.redirect("/success");
});
```

## 12. Express Router
Partitioning route patterns into separate files.

```js
const express = require("express");
const router = express.Router();

router.get("/info", (req, res) => {
    res.send("Information");
});

module.exports = router;
```

## 13. Route Parameters & Query Strings
Reading client data sent in paths or query options.

```js
app.get("/search", (req, res) => {
    const queryTerm = req.query.q;
    res.send(queryTerm);
});

app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    res.send(userId);
});
```
