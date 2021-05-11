import {Router} from 'express';
import {getAll, create, remove} from '../controllers/servers.js'
const router = Router();

router.get('/', (req, res) => {
	res.render('index', {title: 'Main Page', active: 'main'});
});

router.get('/features', (req, res) => {
	res.render('features', {title: 'Features Page', active: 'features'});
});

router.get('/app', (req, res) => {
	res.render('app', {title: 'App Page', active: 'app'});
});

router.get('/api/server', getAll);
router.post('/api/server', create);
router.delete('/api/server/:id', remove);

export default router;