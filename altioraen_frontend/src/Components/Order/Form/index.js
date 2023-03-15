import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { Button, FormControl, FormGroup, FormLabel, Modal, Table } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import { toast } from "react-toastify";

const Form = ({ openModal, closeModal, orderForm }) => {

    const [order, setOrder] = useState(orderForm);
    const [article, setArticle] = useState({unitPrice: 0});
    const currency = 'USD';

    const handleChangeTextArticle = (event) => {
        setArticle({ ...article, [event.target.name]: event.target.value });
    }

    const onAddArticle = () => {
        if (!article?.code || article?.code ==='') {
            alert("Es necesario ingresar código");
            return;
        }
        if (!article?.name || article?.name ==='') {
            alert("Es necesario ingresar nombre");
            return;
        }
        if (!article?.unitPrice || article?.unitPrice === 0 || article?.unitPrice === '') {
            alert("Es necesario ingresar precio unitario");
            return;
        }
        let newOrder = { ...order };
        newOrder.articles.push(article);
        newOrder.subtotal += +article.unitPrice ?? 0;
        setOrder(newOrder);
        setArticle({unitPrice: 0, code: '', name: ''});
    }

    const onRemoveArticle = (index) => {
        let newOrder = { ...order };
        newOrder.articles = newOrder.articles.splice(index, 1);
        newOrder.subtotal -= article.unitPrice ?? 0;
        setOrder(newOrder);
        setArticle({});
    }

    const onSave = () => {
        order.date = moment(order.date);
        axios.post(`http://localhost:8080/api/orders/save`, order)
            .then(function (response) {
                let responseApi = response.data;
                if (responseApi.code === 200) {
                    alert("La orden fue creada");
                    closeModal(true);
                    return;
                }
                toast("No se pudo crear la orden");
            })
            .catch(function (error) {
                // handle error
                toast("Hubo inconveniente en el sistema");
            })
            .finally(function () {
                // always executed
            });
    };

    return <Modal
        size="lg"
        show={openModal}
        onHide={() => closeModal()}
        aria-labelledby="example-modal-sizes-title-lg"
    >
        <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                Crear orden
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col-6">
                    <FormGroup style={{ display: 'grid' }}>
                        <FormLabel>Fecha</FormLabel>
                        <DatePicker
                            value={order?.date || ""}
                            onChange={(date) => {
                                setOrder({ ...order, date: date?.isValid ? date : "" });
                            }}
                            format="YYYY/MM/DD"
                            style={{ height: 35 }}
                        />
                    </FormGroup>
                </div>
                <div className="col-6">
                    <FormGroup style={{ display: 'grid', textAlign: 'right' }}>
                        <FormLabel>Subtotal</FormLabel>
                        <h5>{(order?.subtotal ?? 0).toLocaleString('en-US', {
                            style: 'currency',
                            currency: currency,
                        })}</h5>
                    </FormGroup>
                </div>

                {!order?.id && <div className="col-12 mt-3" style={{ display: 'inline' }}>
                    <div className="row">
                        <FormGroup className="mb-3 col-3" controlId="formBasicEmail">
                            <FormLabel>Código</FormLabel>
                            <FormControl type="text" name="code" maxLength={5} value={article.code} defaultValue={article.code} onChange={handleChangeTextArticle.bind(this)} placeholder="Ingrese el código" />
                        </FormGroup>
                        <FormGroup className="mb-3 col-3" controlId="formBasicEmail">
                            <FormLabel>Nombre</FormLabel>
                            <FormControl type="text" name="name" maxLength={200} value={article.name} defaultValue={article.name} onChange={handleChangeTextArticle.bind(this)} placeholder="Ingrese el nombre" />
                        </FormGroup>
                        <FormGroup className="mb-3 col-3" controlId="formBasicEmail">
                            <FormLabel>Precio unitario</FormLabel>
                            <FormControl type="number" name="unitPrice" value={article.unitPrice} defaultValue={article.unitPrice} onChange={handleChangeTextArticle.bind(this)} placeholder="Ingrese el precio" />
                        </FormGroup>
                        <FormGroup className="mb-3 col-3" style={{ textAlign: 'right', marginTop: 24 }} controlId="formBasicEmail">
                            <Button variant="outline-primary" onClick={onAddArticle.bind(this)}>Agregar</Button>
                        </FormGroup>
                    </div>
                </div>}

                <div className="col-12 mt-3">
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                {!order?.id ? <th>ELIMINAR</th> : <th>ID</th>}
                                <th>CÓDIGO</th>
                                <th>NOMBRE</th>
                                <th>PRECIO UNITARIO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order?.articles && order.articles.map((article, index) => (<tr>
                                    <td>
                                        {!order?.id ? <Button variant="outline-secondary" onClick={() => { onRemoveArticle(index) }}>Eliminar</Button> : article.id}
                                    </td>
                                    <td>{article?.code}</td>
                                    <td>{article?.name}</td>
                                    <td>{(article?.unitPrice).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: currency,
                                    })}</td>
                                </tr>))
                            }
                        </tbody>
                    </Table>
                </div>

                <div className="col-12 mt-3" style={{ textAlign: 'center' }}>
                    {!order?.id && <Button variant="success" onClick={onSave.bind(this)}>Guardar</Button> }
                </div>
            </div>
        </Modal.Body>
    </Modal>;
};

export default Form;