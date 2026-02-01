import { Container, Card, Row, Col } from "react-bootstrap";
import { FaCog, FaBuilding, FaClipboardList } from "react-icons/fa";
import "./Sobre.css";

function Sobre() {
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >

            <Row className="g-4">

                <Col md={4}>
                    <Card className="text-center p-4 shadow-sm h-100 card-animado">
                        <FaCog className="mx-auto mb-3 text-primary" size={40} />
                        <h5>Sistema</h5>
                        <p>
                            Este sistema foi desenvolvido para cadastra e organizar produtos de forma simples, rápida e segura. Ele é ideal para empresas que trabalham com vendas sob consulta, atendimento direto ao cliente ou negociação personalizada de preços.
                        </p>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="text-center p-4 shadow-sm h-100 card-animado">
                        <FaClipboardList size={40} className="mx-auto mb-3 text-warning" />
                        <h5>Orçamento</h5>
                        <p>
                            O orçamento funciona como um módulo separado, focado em simulação e negociação. Esse formato é muito usado em lojas físicas, distribuidoras, prestadores de serviço e empresas B2B.

                        </p>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="text-center p-4 shadow-sm h-100 card-animado">
                        <FaBuilding size={40} className="mx-auto mb-3 text-success" />
                        <h5>Empresas</h5>
                        <p>
                            Ideal para: lojas locais, autônomos, MEIs e pequenos comércios. Para empresas que precisam organizar
                            seus produtos e controlar o estoque.
                        </p>
                    </Card>
                </Col>

            </Row>
        </Container>
    );
}

export default Sobre;
