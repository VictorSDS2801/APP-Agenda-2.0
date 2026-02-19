// src/config/db.js
const mongoose = require("mongoose")
const dns = require("dns")

const connectDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI não definido no .env")
    }

    // 🔧 Força resolução DNS confiável (Atlas usa SRV)
    dns.setDefaultResultOrder("ipv4first")
    dns.setServers(["1.1.1.1", "8.8.8.8"]) // Cloudflare + Google

    mongoose.set("strictQuery", true)

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // evita travar indefinidamente
    })

    console.log("✅ MongoDB conectado com sucesso")
  } catch (error) {
    console.error("❌ Erro de conexão com MongoDB:", error.message)
    process.exit(1)
  }
}

module.exports = connectDatabase
