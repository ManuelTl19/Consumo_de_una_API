
//se inicia desde este numero de pagina
let pagina=1;

// se crea una contsante paar los botones 
const btnAnterior= document.getElementById('btnAnterior');
const btnSiguiente= document.getElementById('btnSiguiente');


//al hacer click en btn siguiente te va a mandar a la pagina siguiente siempre y cuando  sea menor a 1000
btnSiguiente.addEventListener('click', () => {
    if (pagina<1000){
        pagina+=1;
        cargarPeliculas();
    }
})

//al hacer click en btn anterior te va a mandar a la pagina anterior siempre y cuando no sea menor a 1
btnAnterior.addEventListener('click', () => {
    if(pagina>1){
        pagina-=1;
        cargarPeliculas();
    }
})



const cargarPeliculas = async() =>{
    //fetch hace una peticion y se guarda en la variable respuesta y se muestra en consola. 
    // si le agregamos await entonces espera la respuesta antes de hacer otro paso. Nota: La funcion debe de ser asincrona para poder ocupar await
    //se ocupa try catch para atrapar un error
    try{
        const respuesta= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d0ec721b8bc9d48fb82c1f6126824e10&language=es-MX&page=${pagina}`);
        console.log(respuesta);

        //Comprobar los datos
        if(respuesta.status === 200){
        //acceder al la informacio json de la aplicacion y mostrar todos los datos de la pelicula
            const datos= await respuesta.json();

            console.log(datos.results)
            let peliculas="";
            //Ciclo en el cual se muestran los titulos de los resultados de las peliculas
            datos.results.forEach(pelicula => {
                peliculas+= `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `;
            });

            //agrega las imagenes y los titulos en el contenedor
            document.getElementById('contenedor').innerHTML = peliculas;


        } else if(respuesta.status=== 401){
            console.log("Llave API incorrecta");
        } else if(respuesta.status===404){
            console.log("La pelicula que buscas no existe.");
        } else{
            console.log("Error Indefinido");
        }    
    /**
     * Respuestas:
     * 200: todo bien.
     * 401: problema de autenticacion de llave api
     * 404: no se encontro la pelicula.
     */


    } catch(error){
        console.log(error);
    }

}

cargarPeliculas()