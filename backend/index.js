import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/reactregister", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.send({ message: "Login Successful", user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.post("/register", (req, res)=> {
    const { name, email, role, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
                role
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 




// Users Route
app.get("/users", async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'Client' } });
        res.send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Client Route
app.get("/clients", async (req, res) => {
    try {
        const users = await User.find({ role: 'Client' });
        res.send(users);
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


// Update user route
app.put("/users/:id", async (req, res) => {
    const userId = req.params.id;
    const { name, email, role } = req.body;

    // Validate request
    if (!userId || !name || !email || !role) {
        return res.status(400).send({ message: "Invalid request parameters." });
    }

    try {
        // Find the user by ID and update the data
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email, role }, { new: true });
        if (!updatedUser) {
            console.error("User not found");
            return res.status(404).send({ message: "User not found" });
        }

        console.log("User updated successfully:", updatedUser);
        res.send({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.delete("/users/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            console.error("User not found");
            return res.status(404).send({ message: "User not found" });
        }

        await User.findByIdAndRemove(userId);

        console.log("User deleted successfully");
        res.send({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({role:'User'}, 'name'); // Fetch only the 'name' field
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});
// Jobs 

const jobSchema = new mongoose.Schema({
    job_id: String,
    words: String,
    allocated_to: String,
    deadline: Date,
    rate:String

});

const Job = new mongoose.model("Job", jobSchema);

app.post("/jobs", async (req, res) => {
    const { job_id, words, allocated_to, deadline, rate } = req.body;

    try {
        const newJob = new Job({
            job_id,
            words,
            allocated_to,
            deadline,
            rate
        });

        await newJob.save();
        res.status(201).send({ message: "Job created successfully", job: newJob });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


app.get("/job_index", async (req, res) => {

    try {
        // const userRole = req.user.role;
        const jobs = await Job.find({});
        res.send(jobs);
    } catch (error) {
        console.error("Error fetching Jobs:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


// Update user route
app.put("/jobs/:id", async (req, res) => {
    const jobId = req.params.id;
    const { job_id, deadline, allocated_to, words, rate } = req.body;

    // Validate request
    if (!jobId || !job_id || !deadline || !allocated_to || !words || !rate) {
        return res.status(400).send({ message: "Invalid request parameters." });
    }

    try {
        // Find the user by ID and update the data
        const updateJob = await Job.findByIdAndUpdate(jobId, { job_id, deadline, allocated_to, words, rate }, { new: true });
        if (!updateJob) {
            console.error("Job not found");
            return res.status(404).send({ message: "Job not found" });
        }

        console.log("Job updated successfully:", updateJob);
        res.send({ message: "Job updated successfully", job: updateJob });
    } catch (error) {
        console.error("Error updating Job:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.delete("/jobs/:id", async (req, res) => {
    const jobId = req.params.id;

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            console.error("Job not found");
            return res.status(404).send({ message: "Job not found" });
        }

        await Job.findByIdAndRemove(jobId);

        console.log("Job deleted successfully");
        res.send({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting Job:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});



app.listen(9002,() => {
    console.log("BE started at port 9002")
})