const express=require('express')

const sqlite=require("sqlite")
const sqlite3=require("sqlite3")
const cors=require("cors")

const path=require('path')

const {v4}=require("uuid")
const uuidv4=v4

const {open}=sqlite
const app=express()


const allowedOrigins = [
    'https://smoke-trees-assignment-4odb-git-main-ushasree-mangis-projects.vercel.app',
    'https://smoke-trees-assignment-4odb-ushasree-mangis-projects.vercel.app',
    'https://smoke-trees-assignment-4odb.vercel.app'
    
  ];
  

const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies and credentials
  }; 
  
  
  app.use(express.json())
  app.use(cors(corsOptions));
  
  app.options('*', cors(corsOptions));

  
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
