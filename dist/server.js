import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
let anotacoes = [];
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("API de anotações funcionando!");
});
app.get("/anotacoes", (req, res) => {
    res.json(anotacoes);
});
app.post("/anotacoes", (req, res) => {
    const { texto } = req.body;
    if (!texto || texto.trim() === "") {
        return res.status(400).json({ message: "O texto da anotação é obrigatório" });
    }
    const novaAnotacao = {
        id: Date.now(),
        texto
    };
    anotacoes.push(novaAnotacao);
    res.status(201).json(novaAnotacao);
});
app.delete("/anotacoes/:id", (req, res) => {
    const id = Number(req.params.id);
    const anotacaoExistente = anotacoes.some(nota => nota.id === id);
    if (!anotacaoExistente) {
        return res.status(404).json({ message: "Anotação não encontrada." });
    }
    anotacoes = anotacoes.filter(nota => nota.id !== id);
    res.status(200).json({ message: "Anotação deletada com sucesso!" });
});