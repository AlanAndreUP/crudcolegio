import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [formValues, setFormValues] = useState({
    id: 0,
    nombre: '',
    apellidos: '',
    género: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://alansanchez12-001-site1.htempurl.com/api/Profesors');
        setData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async () => {
    // Validar los campos del formulario antes de realizar la llamada a la API
    if (!formValues.nombre || !formValues.apellidos || !formValues.género) {
      Swal.fire('Error', 'Por favor, complete todos los campos', 'error');
      return;
    }

    try {
      const response = await axios.post('http://alansanchez12-001-site1.htempurl.com/api/Profesors', formValues);
      if (response.status === 201) {
        setData([...data, response.data]);
        setShowModal(false);
        setFormValues({});
        Swal.fire('Éxito', 'El item ha sido agregado correctamente', 'success');
      } else {
        Swal.fire('Error', 'Hubo un problema al agregar el item', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Hubo un problema al agregar el item', 'error');
    }
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://alansanchez12-001-site1.htempurl.com/api/Profesors/${itemId}`);
      if (response.status === 200) {
        const newData = data.filter((item) => item.id !== itemId);
        setData(newData);
      } else {
        Swal.fire('Error', 'Hubo un problema al eliminar el item', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Hubo un problema al eliminar el item', 'error');
    }
  };
  return (
    <div>
      <h1>Panel de Administración Profesor</h1>
      <Button variant="success" onClick={() => setShowModal(true)}>
        Agregar
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* Encabezados de la tabla */}
            {/* Ajusta los encabezados según las columnas de tu tabla */}
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Filas de la tabla */}
          {/* Itera sobre los datos y muestra cada fila */}
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.apellidos}</td>
              <td>{item.género}</td>
              <td>
                {/* Botones de acciones */}
                <Button variant="primary" onClick={() => handleEditItem(item)}>
                  Editar
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteItem(item.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>



      {/* Modal para agregar/editar item */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem ? 'Agregar' : 'Editar'} Profesor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Campos del formulario */}
            {/* Ajusta los campos según los datos de tus tablas */}
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                value={formValues.nombre || ''}
                onChange={(e) => setFormValues({ ...formValues, nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formApellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese los apellidos"
                value={formValues.apellidos || ''}
                onChange={(e) => setFormValues({ ...formValues, apellidos: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGenero">
              <Form.Label>Género</Form.Label>
              <Form.Select
                value={formValues.género || ''}
                onChange={(e) => setFormValues({ ...formValues, género: e.target.value })}
              >
                <option value="">Seleccione un género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </Form.Select>
            </Form.Group>



            <Button variant="primary mt-2" onClick={handleAddItem}>
              {selectedItem ? 'Guardar cambios' : 'Agregar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminPanel;
