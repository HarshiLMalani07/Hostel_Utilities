const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
// ✅ Enable CORS before your routes
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ✅ Handle preflight requests globally
app.options('*', cors());


const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "Hostel_Utilities",
});

db.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database!");
  }
});

const host = process.env.PORT || 3000;

app.listen(host, () => {
console.log(`Server is listening on http://localhost:${host}`);
});

app.post("/signup", (req, res) => {
  const sql =
    "SELECT * FROM login WHERE username = ? AND password = ? AND role = ?";
  db.query(
    sql,
    [req.body.email, req.body.password, req.body.role],
    (err, data) => {
      if (err) {
        console.error("Error in login query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      const authToken = req.body.role;
      return res.json({ Status: "Success", authToken });
    }
  );
});

app.post("/login", (req, res) => {
  const sql =
    "SELECT * FROM login WHERE username = ? AND password = ? AND role = ?";
  db.query(
    sql,
    [req.body.email, req.body.password, req.body.role],
    (err, data) => {
      if (err) {
        console.error("Error in login query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      const authToken = req.body.role;
      return res.json({ Status: "Success", authToken });
    }
  );
});

app.post("/user/newcomplaint", (req, res) => {
  const complaintSql =
    "INSERT INTO complaint (`type`, `description`, `photo`, `c_time`, `staff_flag`, `stud_flag`) VALUES (?, ?, ?, CURRENT_DATE, 0, 0)";
  const filedBySql = "INSERT INTO filed_by (`roll_no`) VALUES (?)";

  const complaintValues = [req.body.type, req.body.description, req.body.image];

  const filedByValues = [
    req.body.roll_no, // Assuming roll_no is part of req.body
  ];

  try {
    db.query(complaintSql, complaintValues, (complaintErr, complaintData) => {
      if (complaintErr) {
        return res.json(complaintErr);
      } else {
        // If the first query is successful, execute the second query
        db.query(filedBySql, filedByValues, (filedByErr, filedByData) => {
          if (filedByErr) {
            return res.json(filedByErr);
          } else {
            res.json("New complaint registered");
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/user/delcomplaint/:id", (req, res) => {
  const compId = req.params.id;
  const sql = "DELETE FROM complaint WHERE c_id = ?";
  db.query(sql, compId, (err, data) => {
    if (err) return res.json(err);
    return res.json("Complaint deleted successfully");
  });
});

app.get("/user/checkoffcomplaint/:id", (req, res) => {
  const compId = req.params.id;
  const sql = "UPDATE complaint SET stud_flag = '1' WHERE complaint.c_id = ? ";
  db.query(sql, compId, (err, data) => {
    if (err) return res.json(err);
    return res.json("Checked off successfully from user side");
  });
});

app.get("/admin/checkoffcomplaint/:id", (req, res) => {
  const compId = req.params.id;
  const sql1 =
    "UPDATE complaint SET staff_flag = '1' WHERE complaint.c_id = ? ";
  const sql2 = "UPDATE complaint SET r_time = CURRENT_TIME";
  db.query(sql1, compId, (err1, data1) => {
    if (err1) {
      return res.json(err1);
    } else {
      // If the first query is successful, execute the second query
      db.query(sql2, compId, (err2, data2) => {
        if (err2) {
          return res.json(err2);
        } else {
          res.json("Complaint resolved");
        }
      });
    }
  });
});
app.get("/admin/rejectleave/:id", (req, res) => {
  const leaveId = req.params.id;
  const sql =
    "UPDATE grant_leave SET permission = '-1' WHERE grant_leave.leave_id= ? ";
  db.query(sql, leaveId, (err, data) => {
    if (err) return res.json(err);
    return res.json("Rejected leave");
  });
});
app.get("/admin/grantleave/:id", (req, res) => {
  const leaveId = req.params.id;
  const sql =
    "UPDATE grant_leave SET permission = '1' WHERE grant_leave.leave_id= ? ";
  db.query(sql, leaveId, (err, data) => {
    if (err) return res.json(err);
    return res.json("Granted permission successfully");
  });
});

app.get("/user/mycomplaints", (req, res) => {
  const sql = "SELECT * FROM complaint";
  try {
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/user/guestroombook", (req, res) => {
  const sql1 =
    "INSERT INTO guest_room (`room_no`,`g_from`,`g_upto`) VALUES (? ,?,?)";
  const sql2 =
    "INSERT INTO guardian (roll_no, name, relationship, sex, room_no) VALUES (?, ?, ?, ?, ? )";
  const values1 = [req.body.RoomNo, req.body.CheckIn, req.body.CheckOut];
  const values2 = [
    req.body.RollNo,
    req.body.Name,
    req.body.Relationship,
    req.body.Gender,
    req.body.RoomNo,
  ];
  try {
    db.query(sql1, values1, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        // If the first query is successful, execute the second query
        db.query(sql2, values2, (err1, data1) => {
          if (err1) {
            return res.json(err1);
          } else {
            res.json("Room booked");
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/user/leaveapplication", (req, res) => {
  const sql =
    "INSERT INTO grant_leave (`email_id`, `roll_no`, `l_from`, `l_upto`, `reason`, `permission`) VALUES (?, ?, ?, ?, ?, FALSE)";
  const values = [
    req.body.Roll_No + "@iiitdmj.ac.in",
    req.body.Roll_No,
    req.body.From_,
    req.body.Upto_,
    req.body.Reason_for_leave,
  ];

  try {
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error in leave application query:", err);
        return res.json(err);
      } else {
        console.log("Leave application successfully submitted");
        res.json("Application successfully submitted");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/admin/grantleave", (req, res) => {
  const sql = "SELECT * FROM grant_leave";
  db.query(sql, (err, data) => {
    try {
      if (err) return res.json(err);
      return res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
});

app.get("/admin/getcomplaints", (req, res) => {
  const sql = "SELECT * FROM complaint";
  db.query(sql, (err, data) => {
    try {
      if (err) return res.json(err);
      return res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
});

app.get("/admin/getstudents", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    try {
      if (err) return res.json(err);
      return res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
});

app.get("/admin/getrooms", (req, res) => {
  const sql1 =
    "SELECT g.roll_no, g.name, g.room_no, s.par_phone FROM guardian g INNER JOIN student s ON g.roll_no = s.roll_no WHERE g.room_no IN (SELECT r.room_no FROM guest_room r)";
  db.query(sql1, (err, data) => {
    try {
      if (err) return res.json(err);
      return res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
});

app.get("/", (req, res) => {
  res.json("Hello this is backend");
});
