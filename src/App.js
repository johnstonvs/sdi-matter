import { useEffect, useState } from 'react';
import Matter from 'matter-js';
import './App.css';

function App() {

  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

  var engine = Engine.create();

  const [gravity, setGravity] = useState(0.0001);

  useEffect(() => {

    const rows = [];

    let yPosition = 30;

    for(let i = 0; i < 13; i++) {
      let spacing = Math.floor(Math.random() * 20) + 20;
      let xPosition = Math.floor(Math.random() * 20) + 5;
      let shapeNum = Math.floor(Math.random() * 5);
      let row;

      if (shapeNum > 1) {
        row = Matter.Composites.stack(xPosition, yPosition, 50, 1, spacing, 20, (x, y) => {
          return Bodies.circle(x, y, 5, { isStatic: true });
        })
      } else {

        row = Matter.Composites.stack(xPosition, yPosition, 50, 1, spacing, 20, (x, y) => {
          return Bodies.rectangle(x, y, 5, 13, { isStatic: true, angle: Math.floor(Math.random() * 2) - 1 ? 0.90 : -0.90 });
        })
      }

      yPosition += 35

      rows.push(row)
    }

    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var sphere = Bodies.circle(400, 0, 10, 10);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    let leftWall = Bodies.rectangle(-20, 400, 60, 810, {isStatic: true});
    let rightWall = Bodies.rectangle(820, 400, 60, 810, {isStatic: true})
    let divides = Matter.Composites.stack(67, 530, 12, 1, 50, 20, (x, y) => {
      return Matter.Bodies.rectangle(x, y, 10, 100, { isStatic: true });
    })

    // create an engine

    // create a renderer
    var render = Render.create({
      element: document.body,
      engine: engine
    });

    engine.world.area = 8000

    engine.world.gravity.scale = 0.001;

    // add all of the bodies to the world

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
    // mouse control
    let mouse = Matter.Mouse.create(render.canvas);
    let mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: { visible: true }
      }
    })
    render.mouse = mouse;
    Composite.add(engine.world, [ground, leftWall, rightWall, divides, mouseConstraint].concat(rows));

    console.log(boxA);
    console.log(engine.world)
  }, [])

  let ballMass = 0.15;

  const makeBall = () => {
    let xAxis = Math.floor(Math.random() * 780) + 20;
    var newBall = Bodies.circle(xAxis, -10, 10, {mass: ballMass});
    Composite.add(engine.world, [newBall])
  }

  const makeManyBall = () => {
    let spacing = Math.floor(Math.random() * 20) + 40;
    let xAxis = Math.floor(Math.random() * 20) + 40;
    var newBalls = Matter.Composites.stack(xAxis, -10, 12, 1, spacing, 20, (x, y) => {
      return Matter.Bodies.circle(x, y, 10);
    })
    Composite.add(engine.world, [newBalls])
  }

  const makeSquare = () => {

    let xAxis = Math.floor(Math.random() * 780) + 20;
    var newBall = Bodies.rectangle(xAxis, -10, 15, 15, {mass: ballMass});
    Composite.add(engine.world, [newBall])
  }

  const makeManySquare = () => {
    let spacing = Math.floor(Math.random() * 20) + 40;
    let xAxis = Math.floor(Math.random() * 20) + 40;
    var newSquares = Matter.Composites.stack(xAxis, -10, 12, 1, spacing, 20, (x, y) => {
      return Matter.Bodies.rectangle(x, y, 15, 15);
    })
    Composite.add(engine.world, [newSquares])
  }


  const gravUp = () => {
    engine.world.gravity.scale += 0.0001;
  }

  const gravDown = () => {
    engine.world.gravity.scale -= 0.0001;
  }

  const massUp = () => {
    ballMass += .01;
  }

  const massDown = () => {
    ballMass -= .01;
  }

  return (
    <div className="App" >
      <script src="matter.js"></script>
      <button onClick={makeBall}>⚽</button><button onClick={makeManyBall}>⚽⚽⚽</button><button onClick={makeSquare}>🟦</button><button onClick={makeManySquare}>🟦🟦🟦</button>
      <div><button onClick={gravUp}>grav up</button><button onClick={gravDown}>grav down</button></div>
      <div><button onClick={massUp}>mass up</button><button onClick={massDown}>mass down</button></div>
    </div>
  );
}

export default App;
