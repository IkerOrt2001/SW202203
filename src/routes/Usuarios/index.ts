import { Router } from 'express';
import { IUsuario, Usuario } from '../../libs/Usuarios.ts';

const usersRouter = Router();
const usersInstance = new Usuario();

usersRouter.get('/', async (_req, res) => {
  try {
    res.json(await usersInstance.getAll());
  } catch (ex) {
    console.error(ex);
    res.status(503).json({ error: ex });
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await usersInstance.getById(+id));
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ msg: 'Error al obtener Registro' });
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const newUser = req.body as unknown as IUsuario;
    const newUserId = await usersInstance.create(newUser);
    res.json({ newUserId });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

usersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body as IUsuario;
    await usersInstance.update(+id, user);
    res.status(200).json({ msg: 'Registro Actualizado' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

usersRouter.delete('/:id',async (req, res) => {
  try {
    const { id } = req.params;
    if (await usersInstance.delete(+id)) {
      res.status(200).json({ msg: 'Registro Eliminado' });
    } else {
      res.status(500).json({ msg: 'Error al eliminar Registro' });
    }
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ msg: 'Error al eliminar Registro' });
  }
});

export default usersRouter;