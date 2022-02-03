const Tarea = require("./tarea");
require('colors');


class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
       
        console.log();
        this.listadoArr.forEach( ( tarea, i )  => {     
            //FORMA EN LA QUE YO LO RESOLVI       
            /*console.log( `${ i }.`.green, `${tarea.desc} :: ${ tarea.completadoEn !== null ? 'Completado'.green : 'Pendiente'.red }` );
            i = i + 1;*/

            //FORMA EN EL QUE EL INSTRUCTOR LO RESUELVE MAS ESTURCTURADO
            const id = `${ i + 1 }`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Completado'.green
                                : 'Pendiente'.red;

            console.log( `${id}. ${desc} :: ${estado}` );                                


        });

    }

    listarPendientesCompletadas( completadas = true ) {

        console.log(); 
        let contador = 0;
        this.listadoArr.forEach( tarea  => {     
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Completado'.green
                                : 'Pendiente'.red;
            
            if ( completadas ) {
            
                if( completadoEn ){
                    contador += 1;
                    console.log( `${ (contador + '.').green } ${desc} :: ${ completadoEn.green }` );
                }

            }else {

                if( !completadoEn ){
                    contador += 1;
                    console.log( `${ (contador + '.').green } ${desc} :: ${ estado }` );
                }

            }

        });

    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        } );

        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }

}

module.exports = Tareas;