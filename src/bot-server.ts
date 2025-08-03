import dotenv from "dotenv";
dotenv.config();

import { logger } from "./whatsapp-bot/logger";
import { iniciarBot } from "./whatsapp-bot";

logger.info("Iniciando bot de WhatsApp...");
iniciarBot().catch((error) => {
  logger.error("Erro ao iniciar o bot", { error });
  process.exit(1);
});
