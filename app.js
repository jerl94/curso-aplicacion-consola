require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
    } = require("./helpers/inquirer");

const Tareas = require("./models/tareas");


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ) {
        //Cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do{
        //Imprime el menu
        opt = await inquirerMenu();

        switch ( opt ) {
            case '1':
                //Crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;

            case '2':
                //listar tareas creadas en el opcion 1
                //console.log( tareas.listadoArr );
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas( true );
            break;

            case '4':
                tareas.listarPendientesCompletadas( false );
            break;

            case '5'://Seleciconar completadas
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );

            break;

            case '6': //borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ) {
                    //TODO: PREGUNTAR SI ESTA SEGURO DE BORRAR
                    const ok = await confirmar('¿Estas seguro?');
                    
                    if( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea Borrada');
                    }
                }
                
            break;
        }

        //guarda lista de tareas en un archivo de texto.
        guardarDB( tareas.listadoArr );

        //Pausa el programa para que el ususario lo reanule con enter.
        await pausa();

    } while( opt !== '0' );    

}

main();