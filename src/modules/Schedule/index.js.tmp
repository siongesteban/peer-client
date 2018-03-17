import React from 'react';

import Schedule from './components/Schedule';
import './styles.css';

const appointments = {
  lunes: [
    { nombre: 'Gustavo', hora_inicio: '08:00', hora_termino: '09:00' },
    { nombre: 'Felipe', hora_inicio: '09:30', hora_termino: '11:00' },
    { nombre: 'Cony', hora_inicio: '18:00', hora_termino: '18:30' }
  ],
  martes: [],
  miercoles: [
  	{ nombre: 'Nicole', hora_inicio: '11:30', hora_termino: '14:00' }
  ],
  jueves: [
  	{ nombre: 'Alejandro', hora_inicio: '00:00', hora_termino: '00:00' }
  ],
  viernes: []
}

const ScheduleContainer = () => {
  return(
    <div style={{ padding: 10, marginTop: 5 }}>
      <Schedule appointments={appointments} />
    </div>
  );
};

export default ScheduleContainer;