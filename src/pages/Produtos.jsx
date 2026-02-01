import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button, Form, Badge } from "react-bootstrap";

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [formEdicao, setFormEdicao] = useState({
        nome: "",
        preco: "",
        descricao: "",
        estoque: false,
    });

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem("produtos")) || [];
        setProdutos(dados);
    }, []);

    function excluirProduto(id) {
        const novaLista = produtos.filter((p) => p.id !== id);
        setProdutos(novaLista);
        localStorage.setItem("produtos", JSON.stringify(novaLista));
    }

    function iniciarEdicao(produto) {
        setEditandoId(produto.id);
        setFormEdicao({
            nome: produto.nome,
            preco: produto.preco,
            descricao: produto.descricao,
            estoque: produto.estoque,
        });
    }

    function salvarEdicao(id) {
        const novaLista = produtos.map((p) =>
            p.id === id ? { ...p, ...formEdicao } : p
        );

        setProdutos(novaLista);
        localStorage.setItem("produtos", JSON.stringify(novaLista));
        setEditandoId(null);
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Produtos</h2>

            <div className="text-center mb-4">
                <Link to="/cadastro" className="btn btn-success">
                    Cadastrar novo produto
                </Link>
            </div>

            {produtos.length === 0 && (
                <p className="text-center">Nenhum produto cadastrado</p>
            )}

            {produtos.map((produto) => (
                <Card key={produto.id} className="mb-3 shadow-sm">
                    <Card.Body>
                        {editandoId === produto.id ? (
                            <>
                                <Form.Group className="mb-2">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        value={formEdicao.nome}
                                        onChange={(e) =>
                                            setFormEdicao({ ...formEdicao, nome: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Preço</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formEdicao.preco}
                                        onChange={(e) =>
                                            setFormEdicao({ ...formEdicao, preco: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        value={formEdicao.descricao}
                                        onChange={(e) =>
                                            setFormEdicao({
                                                ...formEdicao,
                                                descricao: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Status do produto</Form.Label>
                                    <Form.Select
                                        value={formEdicao.estoque ? "disponivel" : "indisponivel"}
                                        onChange={(e) =>
                                            setFormEdicao({
                                                ...formEdicao,
                                                estoque: e.target.value === "disponivel",
                                            })
                                        }
                                    >
                                        <option value="disponivel">Disponível</option>
                                        <option value="indisponivel">Indisponível</option>
                                    </Form.Select>
                                </Form.Group>


                                <Button
                                    variant="success"
                                    className="me-2"
                                    onClick={() => salvarEdicao(produto.id)}
                                >
                                    Salvar
                                </Button>

                                <Button
                                    variant="secondary"
                                    onClick={() => setEditandoId(null)}
                                >
                                    Cancelar
                                </Button>
                            </>
                        ) : (
                            <>
                                <Card.Title>{produto.nome}</Card.Title>

                                <Card.Text>
                                    <strong>Preço:</strong> R$ {produto.preco}
                                </Card.Text>

                                <Card.Text>{produto.descricao}</Card.Text>

                                <Card.Text>
                                    <strong>Status:</strong>{" "}
                                    {produto.estoque ? (
                                        <Badge bg="success">Disponível</Badge>
                                    ) : (
                                        <Badge bg="danger">Indisponível</Badge>
                                    )}
                                </Card.Text>

                                <Button
                                    variant="primary"
                                    className="me-2"
                                    onClick={() => iniciarEdicao(produto)}
                                >
                                    Editar
                                </Button>

                                <Button
                                    variant="danger"
                                    className="me-2"
                                    onClick={() => excluirProduto(produto.id)}
                                >
                                    Excluir
                                </Button>

                                <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => adicionarAoOrcamento(produto)}
                                >
                                    Adicionar Orçamento
                                </Button>

                            </>
                        )}
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

function adicionarAoOrcamento(produto) {
    const quantidade = Number(prompt("Quantidade desejada:"));
    if (!quantidade || quantidade <= 0) return;

    const orcamentoAtual = JSON.parse(localStorage.getItem("orcamento")) || [];
    const index = orcamentoAtual.findIndex((item) => item.id === produto.id);

    if (index >= 0) {
        orcamentoAtual[index] = {
            ...orcamentoAtual[index],
            quantidade: orcamentoAtual[index].quantidade + quantidade
        };
    } else {
        orcamentoAtual.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade
        });
    }

    localStorage.setItem("orcamento", JSON.stringify(orcamentoAtual));
    window.dispatchEvent(new Event("storage"));
    alert("Produto adicionado ao orçamento!");
}



export default Produtos;
