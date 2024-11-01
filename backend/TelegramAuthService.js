import { Telegraf } from 'telegraf';

class TelegramAuthService {
    constructor() {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!botToken) {
            throw new Error('TELEGRAM_BOT_TOKEN no está configurado');
        }
        
        this.bot = new Telegraf(botToken);
        this.verificationCodes = new Map();
        this.initializeBot();
    }

    initializeBot() {
        this.bot.command('start', async (ctx) => {
            const message = `¡Bienvenido! 👋\nTu Chat ID es: ${ctx.chat.id}\nGuarda este número para iniciar sesión en la aplicación.`;
            await ctx.reply(message);
        });

        this.bot.launch().catch(error => {
            console.error('Error al iniciar el bot:', error);
        });

        // Manejo de cierre graceful
        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
    }

    async sendAuthenticationMessage(chatId, code) {
        const numericChatId = Number(chatId);
        if (isNaN(numericChatId)) {
            throw new Error('El Chat ID debe ser un número válido');
        }

        try {
            const message = `🔐 Tu código de verificación es: ${code}\n\nEste código expirará en 5 minutos.`;
            await this.bot.telegram.sendMessage(numericChatId, message);
            
            // Guardar el código para verificación
            this.verificationCodes.set(chatId, {
                code,
                timestamp: Date.now()
            });

            // Eliminar el código después de 5 minutos
            setTimeout(() => {
                this.verificationCodes.delete(chatId);
            }, 5 * 60 * 1000);

            return { success: true };
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            throw new Error(`Error al enviar mensaje: ${error.description || error.message}`);
        }
    }
}

export default TelegramAuthService;