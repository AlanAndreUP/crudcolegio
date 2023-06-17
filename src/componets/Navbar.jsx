import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <Nav className="flex-column">
      <Nav.Item>
        <Nav.Link as={Link} to="/alumno" active={location.pathname === '/alumno'}>
          Alumno
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/profesor" active={location.pathname === '/profesor'}>
          Profesor
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/grado" active={location.pathname === '/grado'}>
          Grado
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/alumnoGrado" active={location.pathname === '/alumnoGrado'}>
          Alumno Grado
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
