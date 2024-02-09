// Obtener la ciudad y carrera previamenente seleccionadas en anteriores visitas
if (typeof(Storage) !== "undefined") 
{
    let ciudadSeleccionada = sessionStorage.getItem("ciudadSeleccionada")
    if (ciudadSeleccionada != null)
    {
        let listaCiudad = document.getElementById("listaCiudad")
        for (let i = 0; i < listaCiudad.children.length; i++)
        {
            if (listaCiudad.children[i].value == ciudadSeleccionada)
            {
                listaCiudad.children[i].selected = "true"
            }
        }
    }

    let carreraSeleccionada = sessionStorage.getItem("carreraSeleccionada")
    if (carreraSeleccionada != null)
    {
        let listaCarrera = document.getElementById("listaCarrera")
        for (let i = 0; i < listaCarrera.children.length; i++)
        {
            if (listaCarrera.children[i].value == carreraSeleccionada)
            {
                listaCarrera.children[i].selected = "true"
            }
        }
    }
}

// Llamar a la función MostrarEmpresas() cuando se haga click en el botoón de buscar
let form = document.getElementById("myForm")
form.addEventListener("submit", () => MostrarEmpresas())

// Mandar a la página respectiva al hacer click sobre una de las tarjetas
let tarjetas = document.getElementsByName("tarjeta")
for (let i = 0; i < tarjetas.length; i++)
{    
    tarjetas[i].addEventListener("click", () => 
    {
        window.location.href = "Organizaciones/" + tarjetas[i].children[0].textContent + ".html";
    })
}

MostrarEmpresas()

function MostrarEmpresas() {
    tabla = ObtenerTabla()

    let ciudadBuscada = document.getElementById("listaCiudad").value
    let carreraBuscada = document.getElementById("listaCarrera").value

    if (typeof(Storage) !== "undefined") 
    {
        sessionStorage.setItem("ciudadSeleccionada", ciudadBuscada)
        sessionStorage.setItem("carreraSeleccionada", carreraBuscada)
    }

    let empresas = document.getElementsByName("empresa")
    for (let i = 0; i < empresas.length; i++)
    {
        let nombreDeEmpresa = empresas[i].textContent

        let ciudadesDeEmpresa = tabla.get(nombreDeEmpresa).get("Ciudades")
        let ciudadValida = ciudadBuscada == "TODAS" || ciudadesDeEmpresa.search(ciudadBuscada) != -1

        let carrerasDeEmpresa = tabla.get(nombreDeEmpresa).get("Carreras")
        let carreraValida = carreraBuscada == "TODAS" || carrerasDeEmpresa.search(carreraBuscada) != -1

        empresas[i].parentElement.style.display = ciudadValida && carreraValida ? "inline-block" : "none"
    }
}

function ObtenerTabla() {    
    let data
    $.ajax({
        async: false,
        type: 'GET',
        url: 'carrerasTest.csv',
        success: function(CSVdata) {
            data = $.csv.toArrays(CSVdata)
        }
   });

   tabla = new Map()
   for (let i = 1; i < data.length; i++)
   {
        tabla.set(data[i][0], new Map([
            [ data[0][1], data[i][1] ],
            [ data[0][2], data[i][2] ]
        ]))
   }

   return tabla
}
