import { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";

function Orcamento() {
    const [itens, setItens] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [quantidades, setQuantidades] = useState({});
    const [cliente, setCliente] = useState("");

    // Carrega itens e cliente do localStorage
    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem("orcamento")) || [];
        setItens(dados);

        const dadosCliente = localStorage.getItem("cliente") || "";
        setCliente(dadosCliente);

        // Inicializa quantidades para cada item
        const qts = {};
        dados.forEach(item => qts[item.id] = item.quantidade);
        setQuantidades(qts);
    }, []);

    // Salva cliente no localStorage sempre que muda
    useEffect(() => {
        localStorage.setItem("cliente", cliente);
    }, [cliente]);

    function editarQuantidade(item) {
        setEditandoId(item.id);
    }

    function salvarQuantidade(id) {
        const novaLista = itens.map(item =>
            item.id === id ? { ...item, quantidade: Number(quantidades[id]) } : item
        );
        setItens(novaLista);
        localStorage.setItem("orcamento", JSON.stringify(novaLista));
        setEditandoId(null);
    }

    function removerItem(id) {
        const novaLista = itens.filter(item => item.id !== id);
        setItens(novaLista);
        localStorage.setItem("orcamento", JSON.stringify(novaLista));
    }

    const total = itens.reduce(
        (soma, item) => soma + Number(item.preco) * Number(item.quantidade),
        0
    );

    function finalizarOrcamento() {
        alert("Orçamento gerado com sucesso!");
        localStorage.removeItem("orcamento");
        localStorage.removeItem("cliente");
        setItens([]);
        setCliente("");
        setQuantidades({});
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Simulação de Orçamento</h2>

            {/* Input do cliente sempre visível */}
            <div className="mb-4 no-print">
                <Form.Label>Nome do cliente</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ex: Maria Silva"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                />
            </div>

            {itens.length === 0 ? (
                <p className="text-center">Nenhum item no orçamento</p>
            ) : (
                <>
                    {cliente && (
                        <p className="text-center fw-bold">Cliente: {cliente}</p>
                    )}

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Valor Unitário</th>
                                <th>Subtotal</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itens.map(item => (
                                <tr key={item.id}>
                                    <td>{item.nome}</td>
                                    <td>
                                        {editandoId === item.id ? (
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantidades[item.id]}
                                                onChange={(e) =>
                                                    setQuantidades({
                                                        ...quantidades,
                                                        [item.id]: e.target.value
                                                    })
                                                }
                                                style={{ width: "70px" }}
                                                className="no-print"
                                            />
                                        ) : (
                                            item.quantidade
                                        )}
                                    </td>
                                    <td>R$ {Number(item.preco).toFixed(2)}</td>
                                    <td>R$ {(Number(item.preco) * Number(item.quantidade)).toFixed(2)}</td>
                                    <td className="no-print">
                                        {editandoId === item.id ? (
                                            <Button
                                                variant="success"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => salvarQuantidade(item.id)}
                                            >
                                                Salvar
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => editarQuantidade(item)}
                                            >
                                                Editar
                                            </Button>
                                        )}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => removerItem(item.id)}
                                        >
                                            Remover
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h4 className="text-end">Total: R$ {total.toFixed(2)}</h4>

                    <div className="text-end mt-3 no-print">
                        <Button variant="secondary" onClick={() => window.print()}>
                            Gerar Orçamento
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Orcamento;
