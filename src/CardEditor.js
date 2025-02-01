import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Text, Star } from 'react-konva';
import { FiSmile, FiHeart, FiStar, FiCamera } from 'react-icons/fi';
import './CardEditor.css';

const Toolbox = ({ onAddText, onAddIcon }) => {
  const [inputText, setInputText] = useState('');

  const handleAddText = () => {
    if (inputText.trim()) {
      onAddText(inputText);
      setInputText('');
    }
  };

  const icons = [
    { id: 'smile', component: <FiSmile />, label: 'Smile' },
    { id: 'heart', component: <FiHeart />, label: 'Heart' },
    { id: 'star', component: <FiStar />, label: 'Star' },
    { id: 'camera', component: <FiCamera />, label: 'Camera' },
  ];

  return (
    <div className="toolbox">
      <div>
        <input
          type="text"
          className="text-input"
          placeholder="Enter text here"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="toolbox-button" onClick={handleAddText}>
          Add Text
        </button>
      </div>
      <div className="icon-buttons">
        {icons.map((icon) => (
          <button
            key={icon.id}
            className="toolbox-button"
            onClick={() => onAddIcon(icon.id)}
          >
            {icon.component}
          </button>
        ))}
      </div>
    </div>
  );
};

const CardEditor = () => {
  const [elements, setElements] = useState([]);
  const stageRef = useRef(null);

  const addText = (text) => {
    setElements((prevElements) => [
      ...prevElements,
      {
        id: `text${prevElements.length + 1}`,
        type: 'text',
        x: 100,
        y: 100,
        text,
        fontSize: 20,
      },
    ]);
  };

  const addIcon = (iconType) => {
    if (iconType === 'star') {
      const scale = Math.random() * 0.5 + 0.5; // Random scale between 0.5 and 1.0
      setElements((prevElements) => [
        ...prevElements,
        {
          id: `star${prevElements.length + 1}`,
          type: 'star',
          x: Math.random() * stageRef.current.width(),
          y: Math.random() * stageRef.current.height(),
          numPoints: 5,
          innerRadius: 30,
          outerRadius: 50,
          fill: '#89b717',
          opacity: 0.8,
          scale: {
            x: scale,
            y: scale,
          },
          rotation: Math.random() * 180,
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffset: {
            x: 5,
            y: 5,
          },
          shadowOpacity: 0.6,
        },
      ]);
    } else {
      // For other icons like smile, heart, etc.
      const iconTextMap = {
        smile: '😊',
        heart: '❤️',
        camera: '📷',
      };
      const iconText = iconTextMap[iconType];
      setElements((prevElements) => [
        ...prevElements,
        {
          id: `icon${prevElements.length + 1}`,
          type: 'icon',
          iconType,
          x: 100,
          y: 100,
          text: iconText,
          fontSize: 40,
        },
      ]);
    }
  };

  const exportCard = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'greeting-card.png';
    link.href = uri;
    link.click();
  };

  return (
    <div className="editor-container">
      <h2 className="editor-title">Card Editor</h2>
      <Toolbox onAddText={addText} onAddIcon={addIcon} />
      <div className="stage-wrapper">
        <Stage
          ref={stageRef}
          width={600}
          height={400}
          className="editor-stage"
        >
          <Layer>
            <Rect width={600} height={400} fill="#f3f3f3" />
            {elements.map((el) =>
              el.type === 'text' ? (
                <Text
                  key={el.id}
                  x={el.x}
                  y={el.y}
                  text={el.text}
                  fontSize={el.fontSize}
                  draggable
                />
              ) : null
            )}
            {elements.map((el) =>
              el.type === 'star' ? (
                <Star
                  key={el.id}
                  x={el.x}
                  y={el.y}
                  numPoints={el.numPoints}
                  innerRadius={el.innerRadius}
                  outerRadius={el.outerRadius}
                  fill={el.fill}
                  opacity={el.opacity}
                  scale={el.scale}
                  rotation={el.rotation}
                  shadowColor={el.shadowColor}
                  shadowBlur={el.shadowBlur}
                  shadowOffset={el.shadowOffset}
                  shadowOpacity={el.shadowOpacity}
                  draggable
                />
              ) : null
            )}
            {elements.map((el) =>
              el.type === 'icon' ? (
                <Text
                  key={el.id}
                  x={el.x}
                  y={el.y}
                  text={el.text}
                  fontSize={el.fontSize}
                  draggable
                />
              ) : null
            )}
          </Layer>
        </Stage>
      </div>
      <button className="export-button" onClick={exportCard}>
        Download Card
      </button>
    </div>
  );
};

export default CardEditor;
