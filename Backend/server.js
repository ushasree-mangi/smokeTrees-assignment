const express=require('express')

const sqlite=require("sqlite")
const sqlite3=require("sqlite3")
const cors=require("cors")

const path=require('path')

const {v4}=require("uuid")
const uuidv4=v4

const {open}=sqlite
const app=express()

app.use(express.json()) // to data convert into json format
app.use(cors({
    origin: 'https://smoke-trees-assignment-4odb.vercel.app/', // Allow all origins
    methods: ['GET', 'POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type']
}))  

let db=null
const PORT= process.env.PORT || 4000
const dbPath=path.join(__dirname, "myAppDatabase.db")

// database connection and server running method

const initializeDbAndServer=async()=>{
    try{
        db=await open({ filename:dbPath,
            driver:sqlite3.Database
        })

        app.listen(PORT,()=>{console.log(`server is running on port : ${PORT}`) })
    }
    catch(e){
        console.log(`DB error: ${e.message}`)
        process.exit(1)
    }
}

initializeDbAndServer()

app.post("/register",async(request ,response)=>{
    try{ 

        const {name , address}=request.body

        //checking whether the user is already present or not 
        const getUserQuery = `SELECT * FROM user WHERE name = '${name}' `;
        const dbUser = await db.get(getUserQuery);

        if (dbUser === undefined) {

            const userId=uuidv4() // generating unique id 

            //inserting user data in user table

            const createUserQuery=`
            INSERT INTO user(id,name) VALUES( ? , ? )`

            const dbResponse=await db.run(createUserQuery, [userId, name])
            const addressId=uuidv4()

            //inserting address data in address table
            
            const insertAddressQuery=`
            INSERT INTO address(id, address , userId) VALUES( ? , ? , ? )`

            await db.run(insertAddressQuery, [addressId , address , userId ]);

            //returning response
    
            response.status(201).json({ message: 'successfully Created new user' });
        
        } 
        else {
            //response when the user is already exists

            response.status(400).json({ error_msg: "User already exists" });
        }

    }
    catch(e){
        response.status(500).json({error_msg:`An error occurred . The error is ${e.message}`});
    }


})
