import React, { Fragment,useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

const Formulario = ({crearCita}) => {

    //CREAR STATE DE CITAs
    const [cita,actualizarCita]=useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })
    
    //STATE PARA ACUALIZAR EL ERROR QUE SE GENERA 
    const [error,actualizarError] = useState(false);
    
    
    //FUNCION QUE SE EJECUTA CADA QUE EL USUARIO ESCRIBA EN UN INPUT    
    const actualizarState= evento =>{
        //SABER QUE INPUT ESTAS ESCRIBIENDO
        //console.log(evento.target.name);
        //SABER LO QUE SE ESCRIBE EN LOS INPUT
        //console.log(evento.target.value);
        actualizarCita({
            ...cita,
            [evento.target.name] : evento.target.value
        })
    }

    //EXTRAER VALORES
    const {mascota,propietario,fecha,hora,sintomas}=cita;

    //CUANDO EL USUARIO PRESIONA AGREGAR CITA
     const submitCita = e =>{
        //PARA EVITAR QUE EL PASE DE VALORES SEA POR GET
        e.preventDefault();
        
        //Validad formulario  (trim() para si es igual a basio)
        if(mascota.trim()==='' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
             actualizarError(true);
            return;
        }

        //ELIMINAR EL MENSJAE PREVIO
        actualizarError(false);

        //ASIGNAR UN ID
        cita.id = uuidv4();

        //CREAR LA CITA
        crearCita(cita);

        //REINICIAR EL FORMULARIO
        actualizarCita({

            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''})
     }

    return (

    <Fragment>
        <h1>Crear citas</h1>

        {error?<p className='alerta-error'>Todos los campos son obligatorios</p> :null}
        <form
        onSubmit={submitCita}
        >
            <label>Nombre Mascota</label>
            <input 
                type='text'
                name='mascota'
                className='u-full-width'
                placeholder=' Nombre Mascota'
                onChange={actualizarState}
                value={mascota}
                />

            <label>Nombre Dueño</label>
                <input 
                type='text'
                name='propietario'
                className='u-full-width'
                placeholder=' Nombre Dueño de la mascota'
                onChange={actualizarState}
                value={propietario}
                />
    
            <label>Fecha</label>
                <input 
                type='date'
                    name='fecha'
                className='u-full-width'
                onChange={actualizarState}
                value={fecha}
                />
        
            <label>Hora</label>
                <input 
                type='time'
                name='hora'
                className='u-full-width'
                onChange={actualizarState}
                value={hora}
                />

            <label>Sintomas</label>
            <textarea
                className='u-full-width'
                name='sintomas'
                onChange={actualizarState}
                value={sintomas}
            ></textarea>
            
            <button
                type='submit'
                className='u-full-width button-primary'
            >Agregar Cita</button>

        </form>
    </Fragment>
    );

}
//como hacer una documentacion del codigo 

Formulario.propTypes={
    crearCita: PropTypes.func.isRequired
}


 
export default Formulario;