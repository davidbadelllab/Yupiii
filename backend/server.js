// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import TelegramAuthService from './TelegramAuthService.js';

// Configuración de ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3000;

// Validación inicial de configuración
if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error('ERROR: TELEGRAM_BOT_TOKEN no está configurado en el archivo .env');
    process.exit(1);
}

// Inicializar servicio de Telegram
let telegramAuth;
try {
    telegramAuth = new TelegramAuthService();
} catch (error) {
    console.error('Error al inicializar TelegramAuthService:', error);
    process.exit(1);
}

// Configuración de middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

// Ruta para enviar mensaje de autenticación
app.post('/api/send-auth-message', async (req, res) => {
    const { chatId } = req.body;
    
    if (!chatId) {
        return res.status(400).json({
            success: false,
            error: 'Chat ID es requerido'
        });
    }

    try {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const result = await telegramAuth.sendAuthenticationMessage(chatId, code);
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
    });
});

// Iniciar servidor con manejo de errores
try {
    app.listen(port, () => {
        console.log(`Servidor ejecutándose en http://localhost:${port}`);
        console.log('Endpoints disponibles:');
        console.log('  - GET  /api/test');
        console.log('  - POST /api/send-auth-message');
    });
} catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
}