import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

function Orcamento() {
    const [itens, setItens] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [novaQuantidade, setNovaQuantidade] = useState(1);
    const [cliente, setCliente] = useState("");

    function editarQuantidade(item) {
        setEditandoId(item.id);
        setNovaQuantidade(item.quantidade);
    }

    function salvarQuantidade(id) {
        const novaLista = itens.map((item) =>
            item.id === id
                ? { ...item, quantidade: Number(novaQuantidade) }
                : item
        );

        setItens(novaLista);
        localStorage.setItem("orcamento", JSON.stringify(novaLista));
        setEditandoId(null);
    }

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem("orcamento")) || [];
        setItens(dados);
    }, []);

    function removerItem(id) {
        const novaLista = itens.filter((item) => item.id !== id);
        setItens(novaLista);
        localStorage.setItem("orcamento", JSON.stringify(novaLista));
    }

    const total = itens.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    function finalizarOrcamento() {
        alert("Orçamento gerado com sucesso!");
        localStorage.removeItem("orcamento");
        setItens([]);
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Simulação de Orçamento</h2>

            {itens.length === 0 ? (
                <p className="text-center">Nenhum item no orçamento</p>
            ) : (
                <>
                    <div className="mb-4 no-print">
                        <label className="form-label">Nome do cliente</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: Maria Silva"
                            value={cliente}
                            onChange={(e) => setCliente(e.target.value)}
                        />
                    </div>

                    {cliente && (
                        <p className="text-center fw-bold">
                            Cliente: {cliente}
                        </p>
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
                            {itens.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.nome}</td>

                                    <td>
                                        {editandoId === item.id ? (
                                            <input
                                                type="number"
                                                min="1"
                                                value={novaQuantidade}
                                                onChange={(e) => setNovaQuantidade(e.target.value)}
                                                style={{ width: "70px" }}
                                                className="no-print"
                                            />
                                        ) : (
                                            item.quantidade
                                        )}
                                    </td>

                                    <td>R$ {Number(item.preco).toFixed(2)}</td>

                                    <td>
                                        R$ {(Number(item.preco) * item.quantidade).toFixed(2)}
                                    </td>

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
                        <Button
                            variant="secondary"
                            onClick={() => window.print()}
                        >
                            Gerar Orçamento
                        </Button>
                    </div>

                </>
            )}
        </Container>
    );
}

export default Orcamento;
