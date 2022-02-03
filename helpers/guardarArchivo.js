const fs = require( 'fs' );
const { arch } = require('os');


const archivo = './db/data.json';

//Funcion para guardar en un archivo JSON
const guardarDB = ( data ) => {    

    //JSON.stringify(data) <- se utiliza para convertir el arreglo recibido en un string.
    fs.writeFileSync( archivo, JSON.stringify(data) );

}

const leerDB = () => {
    
    if( !fs.existsSync(archivo)) {
        return null;
    }


    const info = fs.readFileSync( archivo, { encoding: 'utf-8' });

    const data = JSON.parse( info );

    //console.log( data );

    return data;
}


module.exports = {
    guardarDB,
    leerDB
}