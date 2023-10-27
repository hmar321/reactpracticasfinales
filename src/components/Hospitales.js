import React, { Component } from 'react';
import Trabajadores from './Trabajadores';
import Global from '../Global';
import axios from 'axios';
import { each } from 'jquery';

export default class Hospitales extends Component {
  cajaArrayHospitales = React.createRef();
  cajaIncremento = React.createRef();

  state = {
    hospitales: [],
    idhospitales: [],
    statusHosp: false,
    statusIncremento: false,
    incremento: 0
  }

  loadHospitales = () => {
    var request = "api/hospitales";
    var url = Global.urlApiEjemplos + request;
    axios.get(url).then(response => {
      this.setState({
        hospitales: response.data,
        statusHosp: true
      });
    });
  }


  componentDidMount = () => {
    this.loadHospitales();
  }

  incrementarSalario = (e) => {
    e.preventDefault();
    var arrayIdsHosp = getHospitalesSeleccionados();
    var incremento = this.cajaIncremento.current.value;
    var cadenaHospitales = "";
    for (var idhospital of arrayIdsHosp) {
      cadenaHospitales += "&idhospital=" + idhospital;
    }
    var request = "api/trabajadores/updatesalariotrabajadoreshospitales?incremento=" + incremento + cadenaHospitales;
    var url = Global.urlApiEjemplos + request;
    axios.put(url).then(response => {
      var avisoIncremento = !this.state.statusIncremento;
      this.setState({
        statusIncremento: avisoIncremento,
        incremento: incremento
      });

    });
  }

  buscarTrabajadores = (e) => {
    e.preventDefault();
    var arrayIdsHosp = getHospitalesSeleccionados();
    this.setState({
      idhospitales: arrayIdsHosp
    });
  }

  getHospitalesSeleccionados=()=>{
    var arrayIdsHosp = [];
    var options = this.cajaArrayHospitales.current.options;
    for (var option of options) {
      if (option.selected === true) {
        arrayIdsHosp.push(option.value);
      }
    }
    return arrayIdsHosp;
  }

  render() {
    return (
      <div>
        <h1>Hospitales</h1>
        <form>
          <div className='mb-3' style={{ width: "300px" }}>
            <select onChange={this.buscarTrabajadores} ref={this.cajaArrayHospitales} multiple className="form-select" aria-label="Default select example">
              <option hidden defaultValue>Selecciona varios hospitales</option>
              {
                this.state.statusHosp === true &&
                (
                  this.state.hospitales.map((hospital, index) => {
                    return (
                      <option key={index} value={hospital.idHospital}>{hospital.nombre}</option>
                    )
                  })
                )
              }
            </select>
          </div>
          <div className='mb-3' style={{ width: "300px" }}>
            <label className='form-label'>Incrementar salario trabajadores</label>
            <input ref={this.cajaIncremento} type='number' className='form-control' placeholder='Incremento' />
          </div>
          <button onClick={this.incrementarSalario} className='btn btn-secondary'>Incrementar salario</button>
        </form>
        {
          this.state.idhospitales.length > 0 &&
          (
            <Trabajadores idhospitales={this.state.idhospitales} avisoincremento={this.state.statusIncremento} incremento={this.state.incremento} />
          )
        }
      </div>
    )
  }
}
