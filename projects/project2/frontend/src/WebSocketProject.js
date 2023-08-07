import React, { useState, useEffect } from "react";

const WebSocketProject = () => {
  const [ws, setWs] = useState(null);
  const [planeAngle, setPlaneAngle] = useState(-45);
  const [planeSpeed, setPlaneSpeed] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [batteryBlink, setBatteryBlink] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(0);
  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:5175"); // Change the URL if your WebSocket server is running on a different address/port

    newWs.onopen = () => {
      console.log("WebSocket connection opened");
      setWs(newWs);
    };

    newWs.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      console.log(eventData);

      switch (eventData.eventName) {
        case "PLANE_ANGLE":
          setPlaneAngle(eventData.data.angle - 45);
          break;
        case "PLANE_SPEED":
          setPlaneSpeed(eventData.data.speed);
          setArrowRotation((eventData.data.speed / 100) * 270 - 135);
          break;
        case "PLANE_BATTERY":
          setBatteryLevel(eventData.data.battery);
          setBatteryBlink(eventData.data.battery < 20);
          break;
        default:
          break;
      }
    };

    newWs.onclose = () => {
      console.log("WebSocket connection closed");
      setWs(null);
    };

    return () => {
      if (newWs) {
        newWs.close();
      }
    };
  }, []);

  const handleStart = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("START");
    }
  };

  const handleStop = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("STOP");
    }
  };

  const getBatteryColor = () => {
    if (batteryLevel <= 25) {
      return "red";
    } else if (batteryLevel <= 50) {
      return "yellow";
    }
    return "green";
  };

  return (
    <div className="container">
      {/* Render the plane SVG and apply rotation */}
      <svg className="plane" style={{ transform: `rotate(${planeAngle}deg)` }}>
        <svg
          xmlnsDc="http://purl.org/dc/elements/1.1/"
          xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlnsSvg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsSodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlnsInkscape="http://www.inkscape.org/namespaces/inkscape"
          viewBox="0 -256 1792 1792"
          id="svg2"
          version="1.1"
          inkscapeVersion="0.48.3.1 r9886"
          width="100%"
          height="100%"
          sodipodiDocname="plane_font_awesome.svg"
        >
          <metadata id="metadata12">
            <rdfRDF>
              <ccWork rdfAbout="">
                <dcFormat>image/svg+xml</dcFormat>
                <dcType rdfResource="http://purl.org/dc/dcmitype/StillImage" />
              </ccWork>
            </rdfRDF>
          </metadata>
          <defs id="defs10" />
          <sodipodiBamedview
            pagecolor="#ffffff"
            bordercolor="#666666"
            borderopacity="1"
            objecttolerance="10"
            gridtolerance="10"
            guidetolerance="10"
            inkscapePageopacity="0"
            inkscapePageshadow="2"
            inkscapeWindow-width="640"
            inkscapeWindow-height="480"
            id="namedview8"
            showgrid="false"
            inkscapeZoom="0.13169643"
            inkscapeCx="896"
            inkscapeCy="896"
            inkscapeWindow-x="0"
            inkscapeWindow-y="25"
            inkscapeWindow-maximized="0"
            inkscapeCurrent-layer="svg2"
          />
          <g transform="matrix(1,0,0,-1,205.01695,1330.9831)" id="g4">
            <path
              d="m 1397,1324 q 0,-87 -149,-236 l -240,-240 143,-746 1,-6 q 0,-14 -9,-23 L 1079,9 q -9,-9 -23,-9 -21,0 -29,18 L 753,593 508,348 Q 576,110 576,96 576,82 567,73 L 503,9 Q 494,0 480,0 462,0 452,16 L 297,296 17,451 q -17,9 -17,28 0,14 9,23 l 64,65 q 9,9 23,9 14,0 252,-68 L 593,753 18,1027 q -18,8 -18,29 0,14 9,23 l 64,64 q 9,9 23,9 4,0 6,-1 l 746,-143 240,240 q 149,149 236,149 32,0 52.5,-20.5 20.5,-20.5 20.5,-52.5 z"
              id="path6"
              inkscapeConnector-curvature="0"
            />
          </g>
        </svg>
      </svg>
      <div className="battery-container">
        <svg className={`battery ${batteryBlink ? "blink" : ""}`}>
          <svg
            className="battery-svg"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 471.829 471.829"
            xmlSpace="preserve"
          >
            {/* <rect
              className={`battery-rect ${getBatteryColor()}`}
              x="150"
              y={`${100 - batteryLevel * 0.9}%`}
              width="36.5%"
              height={`${batteryLevel}%`}
            /> */}
            <svg className="svg-container">
              <g
                style={{
                  transformOrigin: "center",
                  transform: "scaleY(-1)",
                }}
              >
                <svg
                  className={`battery-rect ${getBatteryColor()}`}
                  height={`${batteryLevel}%`}
                >
                  <rect x="155" y="40" width="160" height="80" />
                  <rect x="155" y="130" width="160" height="80" />
                  <rect x="155" y="220" width="160" height="80" />
                  <rect x="155" y="310" width="160" height="80" />
                </svg>
              </g>
            </svg>

            {batteryLevel < 70 && (
              <text
                x="50%"
                y="25%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="50"
                fill="white"
              >
                {batteryLevel}%
              </text>
            )}

            <path d="M319.089,27.221h-36.475V0h-95.27v27.221h-34.607c-22.517,0-40.829,18.317-40.829,40.832v362.946   c0,22.51,18.317,40.83,40.829,40.83h166.352c22.524,0,40.832-18.32,40.832-40.83V68.052   C359.921,45.538,341.613,27.221,319.089,27.221z M332.705,431.002c0,7.501-6.108,13.607-13.616,13.607H152.737   c-7.501,0-13.608-6.095-13.608-13.607V68.052c0-7.501,6.107-13.611,13.608-13.611h166.352c7.508,0,13.616,6.109,13.616,13.611" />
          </svg>
        </svg>
      </div>
      {/* Render the speedometer SVG and apply rotation */}
      <div className="speedometer">
        <svg
          className="speedometer-circle"
          viewBox="0 0 1100 1000"
          style={{
            display: "block",
            marginRight: "150px",
            width: "400px",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M511.984 36.128C230.016 36.128.639 265.536.639 547.504c0 177.152 89.68 339.185 239.903 433.408 14.944 9.472 34.688 4.88 44.097-10.096s4.88-34.72-10.096-44.095c-54.096-33.952-99.04-78.048-133.424-128.88l33.552-19.376c15.311-8.848 20.56-28.4 11.712-43.711-8.88-15.344-28.464-20.56-43.712-11.712l-33.6 19.391c-24.4-50.511-39.297-105.792-43.281-163.424h35.616c17.68 0 32-14.32 32-32s-14.32-32-32-32H65.95c4.24-58.687 19.776-114.304 44.56-164.592l32.16 18.56a31.745 31.745 0 0 0 15.97 4.288c11.055 0 21.807-5.744 27.743-16 8.847-15.312 3.6-34.88-11.712-43.713l-31.84-18.368c32.112-46.832 72.864-87.296 119.984-119.023l18.016 31.2c5.935 10.288 16.687 16 27.743 16 5.44 0 10.944-1.376 15.969-4.288 15.311-8.848 20.56-28.4 11.712-43.712l-17.953-31.072c49.329-23.792 103.68-38.656 160.976-42.816v39.872c0 17.68 14.32 32 32 32s32-14.32 32-32v-40c58.592 4.08 114.128 19.391 164.384 43.95l-17.36 30.049c-8.848 15.311-3.6 34.88 11.712 43.712a31.745 31.745 0 0 0 15.969 4.288c11.055 0 21.807-5.712 27.743-16l17.28-29.936a451.19 451.19 0 0 1 118.88 118.816l-29.968 17.312c-15.311 8.847-20.56 28.4-11.711 43.71 5.935 10.289 16.687 16 27.743 16 5.44 0 10.944-1.375 15.969-4.287l30.127-17.392C938.638 401.839 954 457.39 958.094 516H922.96c-17.68 0-32 14.32-32 32s14.32 32 32 32h35.12c-4.048 56.88-18.592 111.439-42.496 161.312l-31.68-18.288c-15.28-8.848-34.912-3.568-43.712 11.713-8.848 15.311-3.6 34.88 11.712 43.712l31.776 18.351c-35.103 52.24-81.44 97.393-137.359 131.824-15.055 9.28-19.712 29.008-10.464 44.032 6.065 9.808 16.529 15.216 27.28 15.216a31.896 31.896 0 0 0 16.753-4.752c152.464-93.904 243.472-256.784 243.472-435.632 0-281.952-229.408-511.36-511.376-511.36z" />

          <svg
            className="speedometer-arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 300"
            width="1000"
            height="1000"
            x="-45"
            y="240"
            fill="white"
            style={{
              transform: `rotate(${arrowRotation}deg)`,
            }}
          >
            <g
              transform={`translate(50, 93) rotate(${arrowRotation}) translate(-50, -93)`}
            >
              <polygon points="50,5 43,90 57,90" />
              <circle cx="50" cy="93" r="12" />
            </g>
          </svg>
        </svg>

        <p
          style={{ marginRight: "180px", fontSize: "20px" }}
          className="speedometer-text"
        >
          {planeSpeed} km/h
        </p>
      </div>
      {/* Start/Stop buttons */}
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};

export default WebSocketProject;
