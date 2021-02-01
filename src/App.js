import React,{Fragment,useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

    //Citas en local storege
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(!citasIniciales){
      citasIniciales=[];
    }


  //STATE QUE GUARDARA LAS CITAS
  const [citas,guardarCitas] = useState(citasIniciales);


  //USE EFFECT PARA REALIZAR CIERTAS OPERACIONES CUANDO EL STATE CAMBIE
  //EL ARREGLO BASIO ES PARA QUE SOLO SE EJECUTE UAN VEZ YA QUE SI TENEMOS UNA API SE PUEDE CICLAR []
  //EN ESTE CASO LE PONEMOS CITAS PARA EJECUTAR EL USE EFFECT CUNADO ALGO PASE EN CITAS
  useEffect(()=>{
    if(citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas));
    }else{
      localStorage.setItem('citas',JSON.stringify( [] ));
    }
  },[citas,citasIniciales]); 

  //FUNCION QUE ACTUALIZA LAS CITAS
  const crearCita = cita =>{
    console.log(cita);
    guardarCitas([...citas,cita])
  }


  //FUNCION PARA ELIMINAR UNA CITA CON SU ID
  const eliminarCita = id =>{
        const nuevasCitas = citas.filter(cita => cita.id !== id);
        guardarCitas(nuevasCitas);
  }
  
  const titulo = citas.length === 0 ? 'No hay citas':'Administra tus citas'
  
  return (

    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className='container'>
        <div className='row'>
            <div className='one-half column'>
            <Formulario 
            crearCita={crearCita}
            />
            </div>
            <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map(cita=>(
              <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}

            </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
