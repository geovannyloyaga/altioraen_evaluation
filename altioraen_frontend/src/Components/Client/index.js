/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const Client = () => {

    const [clientsData, setClientsData] = useState({ loading: false, data: [] });
    const [formData, setFormData] = useState({ open: false, data: {} });
    const navigate = useNavigate();
    const mounted = useRef(false);

    function getClients() {
        setClientsData({ ...clientsData, loading: true });
        axios.get('http://localhost:8080/api/clients/getClientList')
            .then(function (response) {
                let responseApi = response.data;
                if (responseApi.code === 200) {
                    setClientsData({ loading: false, data: responseApi.responseList });
                    return;
                }
                setClientsData({ loading: false, data: [] });
                toast("No se encontró guías registradas");
            })
            .catch(function (error) {
                // handle error
                setClientsData({ loading: false, data: [] });
                toast("Hubo inconveniente en el sistema");
            })
            .finally(function () {
                // always executed
            });
    }

    const onShowClient = (client) => {
        navigate('/client/order', {
            state: {
                client
            }
        });
    }

    useEffect(() => {
        if (!mounted.current) {
            getClients();
            mounted.current = true;
        }

        return () => { }
    }, []);

    return <>
        <div className="row mb-2">
            <div className="col-9">
                <h5>Lista de clientes</h5>
            </div>
            <div className="col-3" style={{ textAlign: 'right' }}>
                <Button onClick={() => { getClients() }} variant="outline-secondary" style={{ marginRight: 8 }}>Actualizar</Button>
                <Button variant="outline-primary" onClick={() => setFormData({ open: true, data: {} })}>Crear cliente</Button>
            </div>
        </div>
        <div>
            {
                clientsData.loading ?
                    <div style={{ display: 'flex', justifyContent: 'center', height: 'calc(100vh - 200px)' }}>
                        <Spinner animation="grow" style={{ alignSelf: 'center' }} />
                    </div> :
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>ACCIONES</th>
                                <th>ID CLIENTE</th>
                                <th>DNI</th>
                                <th>NOMBRE</th>
                                <th>APELLIDO</th>
                                <th># ORDENES</th>
                                <th>CREADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientsData.data?.length > 0 && clientsData.data.map(client => (<tr>
                                    <td>
                                        <Button variant="outline-secondary" onClick={onShowClient.bind(this, client)}>Ver</Button>
                                        <Button variant="outline-secondary" onClick={() => setFormData({ open: true, data: client })}>Editar</Button>
                                    </td>
                                    <td>{client?.id}</td>
                                    <td>{client?.dni}</td>
                                    <td>{client?.name}</td>
                                    <td>{client?.lastName}</td>
                                    <td>{client?.orders?.length ?? 0}</td>
                                    <td>{moment(client?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                </tr>))
                            }
                        </tbody>
                    </Table>
            }
        </div>
        {formData.open && <Form openModal={formData.open} clientForm={formData.data} closeModal={(reload = false) => {
            setFormData({ open: false, data: {} });
            if (reload) {
                getClients();
            }
        }} />}
    </>;
};

export default Client;