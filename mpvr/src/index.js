import _ from 'lodash';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import modelGltf from '../../assets/mpk_import.gltf';
import background from '../../assets/royal_esplanade_1k.hdr';

let camera, scene, renderer;

init();
render();

function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 70 );
    camera.position.set( - 1.8, 0.6, 2.7 );

    scene = new THREE.Scene();

    new RGBELoader()
        .load( background, function ( texture ) {

            texture.mapping = THREE.EquirectangularReflectionMapping;

            scene.background = texture;
            scene.environment = texture;

            render();

            // model

            const loader = new GLTFLoader()
            loader.load( modelGltf, function ( gltf ) {

                scene.add( gltf.scene );

                render();

            } );

        } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 50;
    controls.target.set( 0, 0, - 0.2 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

//

function render() {

    renderer.render( scene, camera );

}

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// const renderer = new THREE.WebGLRenderer();

// renderer.setSize(window.innerWidth, window.innerHeight, false);
// document.body.appendChild(renderer.domElement);


// const loader = new GLTFLoader()
// loader.load(modelGltf, function ( gltf ) {
//     scene.add( gltf.scene );
//     render()
// })

// window.addEventListener( 'resize', onWindowResize );


// function render() {
//     renderer.render( scene, camera );
// }

// function onWindowResize() {

//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize( window.innerWidth, window.innerHeight );

//     render();

// }

// console.log(loader);
// //// Cube example
// // const geometry = new THREE.BoxGeometry();
// // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// // const cube = new THREE.Mesh(geometry, material);
// // scene.add(cube);

// // camera.position.z = 5;


// //// Line example
// // camera.position.set(0, 0, 100);
// // camera.lookAt(0,0,0);

// // const material = new THREE.LineBasicMaterial( { color : 0x0000ff })
// // const points = [];
// // points.push( new THREE.Vector3( -10, 0, 0));
// // points.push( new THREE.Vector3( 0, 10, 0));
// // points.push( new THREE.Vector3( 10, 0, 0));

// // const geometry = new THREE.BufferGeometry()
// //     .setFromPoints(points);
// // const line = new THREE.Line(geometry, material);
// // scene.add(line)

// //// Creating text


// function animate() {
//     // cube.rotation.x += 0.01;
//     // cube.rotation.y += 0.01;
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate()

// function component() {
//     const element = document.createElement('div');

//     // Lodash, currently included via a script, is required for this line to work
//     element.innerHTML = _.join(['Hello', 'webpack!!'], ' ');

//     return element;
// }

// document.body.appendChild(component());