import { MongoClient, ObjectId } from 'mongodb'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { redirect } from "@sveltejs/kit";
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
const app = express();
const uri = "mongodb+srv://Ivan:150600zz@cluster0.ylvijyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET_KEY = 'babys2024'
var loggedUser = false

let Verification = {
  user:'',
  privilege:''
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    // Proteccion de la pagina de administracion
    if (event.route.id?.startsWith("/admin")) {
      const _token = event.cookies.get('jwt')
      if (_token === undefined || _token === null) {
        console.log('Ningun usuario autenticado')
        throw redirect(302, '/login')
      }else{
        try {
          const access = jwt.verify(_token, JWT_SECRET_KEY)
          if (access.admin !== 'admin') {
            throw redirect(302, '/login');
          }
        } catch (error) {
          console.log('token not verified')
          throw redirect(302, '/');
        }
      }
    }

    if (event.route.id?.startsWith("/logout")) {
      event.cookies.delete('jwt', {path:'/'})
      loggedUser = false
    }

    if (event.route.id?.startsWith("/login/verify")) {
      const tokenPayload = {
        email: Verification.user,
        admin: Verification.privilege
      }
      console.log('/verificacion de usuarios')
      const token_ = jwt.sign(tokenPayload, JWT_SECRET_KEY)
      event.cookies.set('jwt', token_, {path: '/'})
      loggedUser = true
      // throw redirect(302, '/')
    }
  const theme = event.cookies.get("siteTheme");

  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('data-theme=""', `data-theme="${theme}"`),
  });
  return response;
};

var databaseName = "babys"
/**
 * @type {import("mongodb").Db}
 */
var database
/**
 * @type {MongoClient}
 */
var client
const PORT = process.env.PORT || 3000;

// Admitir peticiones de todos distinto servidor
app.use(cors())
// Utiliza el middleware express.json() para analizar los cuerpos de las solicitudes con formato JSON
app.use(express.json())

const upload = multer({
  dest: 'src/lib/images/' // Carpeta donde se guardarán los archivos subidos
});

app.post('/api/upload', upload.single('image'), async (req, res) => {
  // `req.file` contiene la información del archivo subido
  const {name,price,table,description} = req.body
  console.log(name)
  console.log(price)
  console.log(table)
  console.log(description)

  // Mover el archivo subido a la carpeta deseada
  const __dirname = 'src/lib/images/'
  const uploadedFile = req.file;
  const baseFilename = path.parse(uploadedFile.originalname).name;

  const data = {
    name: name,
    price: price,
    description: description,
    imgURL: uploadedFile.originalname
  };
  const usersCollection = database.collection(table);
  await usersCollection.insertOne(data);

  if (!req.file) {
    return res.status(400).send('No se proporcionó ningún archivo');
  }
  
  // Definir la ruta donde se guardará el archivo
  const destination = path.join(__dirname, '', uploadedFile.originalname);

  // Mover el archivo subido a la carpeta deseada
  fs.rename(uploadedFile.path, destination, (err) => {
    if (err) {
      console.error('Error al mover el archivo:', err);
      return res.status(500).send('Error al guardar el archivo');
    }

    // El archivo se ha guardado correctamente
    console.log('Archivo subido y guardado:', uploadedFile.originalname);
    res.send('Archivo subido correctamente');
  });
});

app.post('/api/users', async (req, res) => {
  try {
    // Obtencion de los usuarios del formulario
    const {email,password} = req.body;
    const username = email
    // Obtencion de los usuarios de MongoDB
    const usersCollection = database.collection('users');
    // const result = await usersCollection.find().toArray();
    const result = await usersCollection.findOne({ username });
    if (result) {
      const comp = await bcrypt.compare(password, result.password)
      if (comp) {
        console.log("Usuario Correcto")
        Verification.user = username
        Verification.privilege = result.privilege
        res.status(200).json({ message: 'parsecorrect', token: 'BRZ2024', privilege: result.privilege });
        // loggedUser = true
      } else {
        console.log("Contraseña incorrecta incorrecto")
        res.status(200).json({ message: 'parseincorrect', token: 'BRZ2024N' });
      }
    } else {
      console.log("Email incorrecto")
    }
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});
app.get('/find/users', async (req, res) => {
  res.status(200).json({ loggedUser });
});
app.delete('/api/delete', async (req, res) => {
  try {
    const identificador = req.query.id
    const table = req.query.table
    // @ts-ignore
    const id = new ObjectId(identificador);
    // @ts-ignore
    const usersCollection = database.collection(table);
    const response = await usersCollection.deleteOne({_id: id});
    if (response.deletedCount === 1) {
      res.status(200)
    }
  } catch (error) {
    console.error('No se ha podido borrar el objeto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.post('/api/addproduct', async (req, res) => {
  const { name, price, table, description } = req.body;
  
  try {
    // const partes = fileName.split(/\\+/);
    // const ultimoValor = partes.pop();
    // console.log(fileName)
    // console.log(ultimoValor)
    const data = {
      name: name,
      price: price,
      description: description
    };
    const usersCollection = database.collection(table);
    await usersCollection.insertOne(data);
    
    console.log("Nuevo producto añadido")
    res.status(200).json({ message: 'addproductcorrect', token: 'ADD2024' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
app.post('/api/register', async (req, res) => {
  const { email, password, privilege } = req.body;
  const username = email
  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Guardar el usuario en la base de datos
    const user = {
      username: username,
      password: hashedPassword,
      privilege: privilege
    };
    const usersCollection = database.collection('users');
    await usersCollection.insertOne(user);
    console.log("Registro Correcto")
      res.status(200).json({ message: 'registercorrect', token: 'BRZ2024R' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
app.post('/api/product', async (req, res) => {
  try {
    const {id, table} = req.body
    const ident = new ObjectId(id);
    const usersCollection = database.collection(table);
    const result = await usersCollection.findOne({_id: ident});
    res.status(200).send(result)
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});
app.get('/api/newsletter', async (req, res) => {
  try {
    const usersCollection = database.collection('newsletter');
    const result = await usersCollection.find().toArray();
    res.send(result)
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});
app.get('/api/babys', async (req, res) => {
  try {
    const usersCollection = database.collection('bebes');
    const result = await usersCollection.find().toArray();
    // console.log(result)
    res.send(result)
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});
app.get('/api/chico', async (req, res) => {
  try {
    const usersCollection = database.collection('chico');
    const result = await usersCollection.find().toArray();
    res.send(result)
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});
app.get('/api/chica', async (req, res) => {
  try {
    const usersCollection = database.collection('chica');
    const result = await usersCollection.find().toArray();
    res.send(result)
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.listen(PORT, async () => {
  console.log(`Servidor intermedio en ejecución en el puerto ${PORT}`);
  client = new MongoClient(uri);
  client.connect();
  database = client.db(databaseName);
  // const usersCollection = database.collection('users');
  // const result = await usersCollection.find().toArray();
  // console.log(result)
  
  console.log("conection with MongoDB successful")
});
