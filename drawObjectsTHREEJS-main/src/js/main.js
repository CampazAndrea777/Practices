/* Author(a): Andrea Campaz - Sebastián Rodriguez.
   Fecha inicio: 10 de agosto.
   Ultima modificacion: 2 de Septiembre. 4pm.

   Se crean los objetos de manera satisfactoria, se pueden trasladar y cambia el color del material.
   El unico objeto que no aparece en pantalla, pero si en consola es el Torus, no se añade a la escena. :(
   
 */

// Creando variables iniciales del programa
var scene = null,
    camera = null,
    renderer = null,
    controls = null;

var myObject = null,
    geometry = null,
    material = null,
    allMyFigures = new Array(),
    countFigure = 0,
    myObjectTransform = null;

function start() {
    // Call function to create scene
    initScene();
    // Call function to Animate by Frame
    animate();
}
function redimensionar() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}
function initScene() {
    // Scene, Camera, Renderer
    // Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x28DEFF);
    // Create Camera (3D)
    camera = new THREE.PerspectiveCamera(75, // Fov (campo de vision)
        window.innerWidth / window.innerHeight, // aspect (tamano pantalla)
        0.1, // near (Cercano)
        1000); // far (Lejano)
    // To renderer
    const canvas = document.querySelector('.webgl');
    renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // To Make Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(2, 2.5, 0);
    controls.update();
    // To create Grid
    const size = 50;
    const divisions = 50;
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
    // Axes Helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    // Make Adds
    scene.add(camera);
    camera.position.z = 2;
    window.addEventListener('resize', redimensionar);
}
function getProperties() {
    var datos = document.querySelectorAll('input');
    createObjects('Cube', datos);
    
}
function getProperties_cone() {
    var datos = document.querySelectorAll('.inputCone');
    createObjects('Cone', datos);
    
}
function getProperties_torus() {
    var datos = document.querySelectorAll('.inputTorus');
    createObjects('Torus', datos);
    
}


function createOptions() {
    let mySelect = document.getElementById("objects");
    for (let i = 0; i < allMyFigures.length; i++) {
        var option = document.createElement('option');
        option.setAttribute("value", i);
        option.innerHTML = allMyFigures[i].name;
    }
    mySelect.appendChild(option);
}
function transformations(action) {
    var valuesTrans = document.querySelectorAll('.transF');
    var e = document.getElementById("objects");
    var value = e.value;

    //document.getElementById('objects').appendChild(option);
    objTransform = allMyFigures[value];

    switch (action) {
        case 'Translate':
            myObject.position.set(valuesTrans[0].value, valuesTrans[1].value, valuesTrans[2].value);
            objTransform.position.set(valuesTrans[0].value, valuesTrans[1].value, valuesTrans[2].value);
            break;
        case 'Rotate':
            console.log("rotate");
            break;
    
}
}
function createObjects(objectToCreate, datos) {
    // Cubo, Torus, Cone
    switch (objectToCreate) {
        case 'Cube':
            material = new THREE.MeshBasicMaterial({ color: datos[4].value, wireframe: false });
            geometry = new THREE.BoxGeometry(datos[0].value, datos[1].value, datos[2].value);
            
            break;
        case 'Torus':
            material = new THREE.MeshBasicMaterial({ color: datos[5].value, wireframe: false });
            geometry = new THREE.TorusGeometry(datos[0].value, datos[1].value, datos[2].value, datos[4].value); 
            break;
        case 'Cone':
            material = new THREE.MeshBasicMaterial({ color: datos[4].value, wireframe: false });
            geometry = new THREE.ConeGeometry(datos[0].value, datos[1].value, datos[2].value );
            break;
        case 'Vector':
            const dir = calcularVector(10, 10, 10, 5, 2, 1);
            //normalize the direction vector (convert to vector of length 1)
            dir.normalize();

            const sum = dir.x + dir.y + dir.z;
            const raiz = Math.sqrt(sum);

            const origin = new THREE.Vector3(0, 0, 0);
            const length = raiz;

            const hex = 0xffff00;

            const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
            scene.add(arrowHelper);
            break;
    }
    
    for(let i = 0; i <datos[3].value; i++){
    myObject = new THREE.Mesh(geometry, material);
    allMyFigures.push(myObject);
    console.log(allMyFigures);
    myObject.name = objectToCreate + " " + countFigure + " / " + datos[3].value;
    myObject.position.set(getRndInteger(-20, 20), datos[1].value / 2, getRndInteger(-20, 20));
    scene.add(myObject);
    countFigure++;
    }

    if (countFigure > 0) {
        createOptions();
        document.getElementById('transform').className = "dropdown-item";
        document.getElementById('rotate').className = "dropdown-item";
        document.getElementById('scale').className = "dropdown-item";
    }
}
function ChangeColor() {
    var Color= document.getElementById("Color").value;
    myObject.material.color.set(Color);
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function calcularVector(pfx, pfy, pfz, pix, piy, piz) {
    const vectorx = pfx - pix;
    const vectory = pfy - piy;
    const vectorz = pfz - piz;
    return new THREE.Vector3(vectorx, vectory, vectorz);
}
function animate() {
    requestAnimationFrame(animate);
    //myCube.rotation.x += 0.01;
    //myCube.rotation.y += 0.01;
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render(scene, camera);
}