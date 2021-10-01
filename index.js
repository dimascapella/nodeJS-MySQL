const express = require('express')
const db = require('./config/db')
const User = require('./models/User')
const app = express()
const port = 4500

db.authenticate().then(() => console.log("Success Connect to MySQL DB"))

app.use(express.urlencoded({extended: true}))
app.listen(port, () => {
    console.log(`Server Running At http://localhost:${port}`)
})

app.post("/crud", async (req, res) => {
    try{
        const { username, email, password } = req.body
        const newUser = new User({
            username, email, password
        })
        await newUser.save()
        res.json(newUser)
    }catch (error){
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

app.get("/crud", async (req, res) => {
    try{
        const getAllUser = await User.findAll({})
        res.json(getAllUser)
    }catch (error){
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

app.get("/crud/:id", async (req, res) => {
    try{
        const id = req.params.id
        const getUser = await User.findOne({where: {id : id}})
        res.json(getUser)
    }catch (error){
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

app.delete("/crud/:id", async (req, res) => {
    try{
        const id = req.params.id
        const deleteUser = await User.destroy({where: {id : id}})
        await deleteUser
        res.json("Berhasil Dihapus")
    }catch (error){
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

app.put("/crud/:id", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const id = req.params.id;
  
      const updateUser = await User.update(
        {
          username,
          email,
          password
        },
        { where: { id: id } }
      );
  
      await updateUser;
  
      res.json("berhasil di update");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  });

app.get('/', (req, res) => res.send("respon nodeJS berhasil"))