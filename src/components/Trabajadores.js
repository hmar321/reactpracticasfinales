import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';

export default class Trabajadores extends Component {
    state = {
        trabajadores: [],
        status: false,
        incremento: 0
    }
    loadTrabajadores = () => {
        var arrayIdsHosp = this.props.idhospitales;
        var cadenaIds = "";
        for (var idhospital of arrayIdsHosp) {
            cadenaIds += "&idhospital=" + idhospital;
        }
        cadenaIds = cadenaIds.replace("&", "?");
        var request = "api/trabajadores/trabajadoreshospitales" + cadenaIds;
        var url = Global.urlApiEjemplos + request;
        axios.get(url).then(response => {
            this.setState({
                trabajadores: response.data,
                status: true
            });
        });
    }
    componentDidMount = () => {
        this.loadTrabajadores();
    }
    componentDidUpdate = (oldProps) => {
        if (oldProps.idhospitales != this.props.idhospitales) {
            this.loadTrabajadores();
            this.setState({
                incremento: 0
            });
        }
        if (oldProps.avisoincremento != this.props.avisoincremento) {
            this.loadTrabajadores();
            var salarioAumento = this.props.incremento;
            this.setState({
                incremento: salarioAumento
            });
        }
    }
    render() {
        return (
            <div>
                <h1>Trabajadores {this.props.idhospitales}</h1>
                {
                    this.state.status === true &&
                    (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Apellido</th>
                                    <th>Oficio</th>
                                    <th>Salario Actual</th>
                                    {
                                        this.state.incremento != 0 &&
                                        (<th>Salario Previo</th>)
                                    }
                                    <th>Id Hospital</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.trabajadores.map((trabajador, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{trabajador.apellido}</td>
                                                <td>{trabajador.oficio}</td>
                                                <td>{trabajador.salario}</td>
                                                {
                                                    this.state.incremento != 0 &&
                                                    (<td>{trabajador.salario - this.state.incremento}</td>)
                                                }
                                                <td>{trabajador.idHospital}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        )
    }
}
