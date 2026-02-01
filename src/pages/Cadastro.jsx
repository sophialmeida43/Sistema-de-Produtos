import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CadastroProduto() {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estoque, setEstoque] = useState(false);

    const navigate = useNavigate();

    function salvarProduto(e) {
        e.preventDefault();

        const novoProduto = {
            id: Date.now(),
            nome,
            preco,
            descricao,
            estoque
        };

        const produtosSalvos =
            JSON.parse(localStorage.getItem("produtos")) || [];

        produtosSalvos.push(novoProduto);
        localStorage.setItem("produtos", JSON.stringify(produtosSalvos));

        navigate("/");
    }

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Form
                className="p-4 bg-light rounded"
                style={{ width: "400px" }}
                onSubmit={salvarProduto}
            >
                <h2 className="text-success text-center mb-4">
                    Cadastro de Produto
                </h2>

                <Form.Group className="mb-3">
                    <Form.Label>Nome do produto</Form.Label>
                    <Form.Control
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                        type="number"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Produto disponível em estoque"
                        checked={estoque}
                        onChange={(e) => setEstoque(e.target.checked)}
                    />
                </Form.Group>

                <Button type="submit" variant="success" className="w-100">
                    Salvar produto
                </Button>
            </Form>
        </Container>
    );
}

export default CadastroProduto;
